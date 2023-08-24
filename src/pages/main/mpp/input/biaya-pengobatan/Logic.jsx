import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, log, logS } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { getRootHeaderRow, fullNewRow, getRows, updateTotalRow } from "./getRows";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);
  const [dataAssumption, setAssumption] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "detail-mpp/treatment-cost";

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
    dispatch(actionData({ loading: false }));
  };

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
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");
    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fPeriode = fPeriode[0];

    return {
      code_company: fCodeCompany,
      code_product: fCodeProduct,
      code_location: fCodeLocation,
      code_department: fCodeDept,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
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
    const url = `${ENDPOINT_URL}`;
    try {
      const { data } = await MainServices.get(url, params);
      const resGeneralAssumption = await MainServices.get(
        "detail-mpp/headcount-assumption",
        params
      );
      let r;
      if (data.data.length > 0) {
        r = getRows({
          data: data.data,
        });
      } else {
        r = fullNewRow();
      }
      setAssumption(resGeneralAssumption.data.data);
      setRows(r);
    } catch (error) {
      // Tangani error jika ada
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
        const columnIndex = parseInt(columns.findIndex((j) => j.columnId === c.columnId));

        const type = c.newCell.type;

        const length = newRows.length;

        let value;

        const column_id = c.columnId;

        if (type === "text") {
          newRows[rowIndex].cells[columnIndex].text = c.newCell.text;
          value = c.newCell.text;
          isChange = true;
        } else {
          value = c.newCell.value;
          if (!isNaN(value)) {
            newRows[rowIndex].cells[columnIndex].value = value;

            const sColumnId = column_id.split("_");
            const typeColumn = sColumnId[sColumnId.length - 1] !== "p" ? "forecast" : "budget";
            const dAsumption = dataAssumption[rowIndex - 2];
            const vAsumption = dAsumption[typeColumn];

            const i = typeColumn === "forecast" ? 4 : 7;

            const premi_inhealth = newRows[rowIndex].cells[i - 2].value;
            const jumlah_anggota = newRows[rowIndex].cells[i - 1].value;

            const sum = premi_inhealth * (jumlah_anggota + vAsumption);

            newRows[rowIndex].cells[i].value = sum;

            isChange = true;
          } else {
            isChange = false;
          }
        }

        if (isChange) {
          const id = c.rowId;

          const isNewRow = newRows[rowIndex].newRow;
          const gradeId = newRows[rowIndex].gradeId;
          const subGradeId = newRows[rowIndex].subGradeId;

          if (isNewRow) {
            const formData = formDataUtils({
              ...codeFilter,
              grade_id: gradeId,
              sub_grade_id: subGradeId,
              column_id: parseInt(value),
            });

            const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

            const rowId = res.data.data.id;

            newRows[rowIndex].rowId = rowId;
            newRows[rowIndex].newRow = false;
          } else {
            const formData = formDataUtils({
              id,
              column_id,
              value,
            });

            await MainServices.post(`${ENDPOINT_URL}/update`, formData);
          }

          // newRows[length - 1] = updateTotalRow(newRows);
        }
      }
      showNotif(200, "Sukses update data");

      setRows(newRows);
    } catch (e) {
      log({ e });
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

    const {
      code_company,
      code_product,
      code_location,
      code_dept,
      code_icp,
      code_project,
      periode,
    } = codeFilter;

    let file1;

    const codeAccount = dataGlobalRedux.indexImport;
    let index, category;

    let formData = new FormData();

    // setLoadingUpload(true);

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    formData.append("file", file1);
    formData.append("code_account", codeAccount);
    formData.append("code_company", code_company);
    formData.append("code_department", code_dept);
    formData.append("code_location", code_location);
    formData.append("code_product", code_product);
    formData.append("code_project", code_project);
    formData.append("code_icp", code_icp);
    formData.append("year", periode);
    formData.append("type", "asuransi");

    try {
      const res = await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      const url = `${ENDPOINT_URL}/list?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_department=${code_dept}&code_icp=${code_icp}&code_project=${code_project}&year=${periode}&code_account=${codeAccount}`;
      const { data } = await MainServices.get(url);

      const r = getRows({
        header: getRootHeaderRow(),
        data: data.data,
      });

      const newRow = [...rows];

      newRow[index] = r;

      setRows({
        ...rows,
        [category]: newRow,
      });

      responseShow(res);

      onSuccess();
    } catch (error) {
      const err = error.response;
      responseShow(err);
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
