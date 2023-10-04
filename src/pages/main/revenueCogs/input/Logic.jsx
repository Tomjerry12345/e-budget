import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  actionImport,
  resetDataActionImport,
  val,
} from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { fullNewRow, getRows, updateTotalRow } from "./getRows";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "direct/revenue";

  const showNotif = (status, message) => {
    dispatch(
      val({
        status: status,
        message: message,
      })
    );
  };

  const formatingFilter = (filter) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
    } = filter;

    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeProject = code_project.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fPeriode = fPeriode[0];

    return {
      code_company: fCodeCompany,
      code_product: fCodeProduct,
      code_project: fCodeProject,
      code_location: fCodeLocation,
      code_department: fCodeDept,
      code_icp: fCodeIcp,
      year: fPeriode,
    };
  };

  const onSetDataTable = (values) => {
    const formatFilter = formatingFilter(values);

    try {
      getData(formatFilter);
      setCodeFilter(formatFilter);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const getData = async (params) => {
    const url = `${ENDPOINT_URL}/list`;
    try {
      const { data } = await MainServices.get(url, params);
      let r;
      if (data.data.length > 0) {
        r = getRows({
          data: data.data,
        });
      } else {
        r = fullNewRow();
      }
      setRows(r);
    } catch (error) {
      console.error(`Error fetching data for code account`, error);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onChangeTable = async (change) => {
    try {
      const newRows = [...rows];
      let isChange;
      for (const c of change) {
        const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
        if (rowIndex < 0) continue;
        const columnIndex = columns.findIndex((j) => j.columnId === c.columnId);

        const type = newRows[rowIndex].cells[columnIndex].type;
        const length = newRows.length;

        let value;

        if (type === "text") {
          newRows[rowIndex].cells[columnIndex].text = c.newCell.text;
          value = c.newCell.text;
          isChange = true;
        } else {
          newRows[rowIndex].cells[columnIndex].value = c.newCell.value;
          value = c.newCell.value;

          value = c.newCell.value;
          if (!isNaN(value)) {
            newRows[rowIndex].cells[columnIndex].value = value;

            let total1 = 0;
            let total2 = 0;

            const newCell = newRows[rowIndex].cells.map((e, j) => {
              if (j >= 2 && j <= 13) total1 += e.value;
              if (j === 14) e.value = total1;
              if (j >= 15 && j <= 26) total2 += e.value;
              if (j === 27) e.value = total2;
              return e;
            });

            newRows[rowIndex].cells = newCell;

            isChange = true;
          } else {
            isChange = false;
          }
        }

        if (isChange) {
          const id = c.rowId;
          const column_id = c.columnId;
          const isNewRow = newRows[rowIndex].newRow;

          const code_account = newRows[rowIndex].cells[0].text;

          const key = columns[columnIndex].columnId;

          if (isNewRow) {
            const formData = formDataUtils({
              ...codeFilter,
              code_account,
              [key]: value,
            });

            const res = await MainServices.post(
              `${ENDPOINT_URL}/insert`,
              formData
            );

            log({ res });
            const rowId = res.data.data.id;

            newRows[rowIndex].rowId = rowId;
          } else {
            const formData = formDataUtils({
              id,
              column_id,
              value,
            });

            await MainServices.post(`${ENDPOINT_URL}/update`, formData);
          }

          delete newRows[rowIndex].newRow;
          newRows[length - 1] = updateTotalRow(newRows);
        }
      }

      setRows(newRows);

      showNotif(200, "Sukses update data");
    } catch (e) {
      log({ e });
      showNotif(400, e.message);
    }
  };

  const onSuccess = () => {
    dispatch(resetDataActionImport());
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    dispatch(
      actionImport({
        loading: true,
      })
    );

    const type = dataGlobalRedux.typeRevenueImport ?? "actual";

    const date = new Date();

    const year = dataGlobalRedux.year ?? `${date.getFullYear()}`;

    let file;

    acceptedFiles.forEach((f) => {
      file = f;
    });

    const formData = formDataUtils({
      // ...codeFilter,
      file,
      type,
      year,
    });

    try {
      await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      getData(codeFilter);

      showNotif(200, "sukses import data");

      onSuccess();
    } catch (error) {
      showNotif(400, error.message);

      dispatch(
        actionImport({
          loading: false,
        })
      );
    }
  };

  return {
    value: {
      columns,
      rows,
      loading,
      uploadSucces,
      getRootProps,
      getInputProps,
      acceptedFiles,
    },
    func: {
      onFinish,
      onUploadFile,
      setUploadSucces,
      onChangeTable,
    },
  };
};

export default Logic;
