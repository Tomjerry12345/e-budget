import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { getRootHeaderRow, fullNewRow, getRows, updateTotalRow } from "./getRows";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "detail-mpp/pph21";

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

  const onSetDataTable = (values) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
    } = values;

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

    getData(
      fCodeCompany,
      fCodeProduct,
      fCodeLocation,
      fCodeDept,
      fCodeIcp,
      fCodeProject,
      fPeriode
    );

    setCodeFilter({
      code_company: fCodeCompany,
      code_dept: fCodeDept,
      code_location: fCodeLocation,
      code_product: fCodeProduct,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
      periode: fPeriode,
    });
  };

  const getData = async (
    codeCompany,
    codeProduct,
    codeLocation,
    codeDept,
    codeIcp,
    codeProject,
    periode
  ) => {
    const url = `${ENDPOINT_URL}?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}`;
    try {
      const { data } = await MainServices.get(url);
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
      // Tangani error jika ada
      console.error(`Error fetching data for code account`, error);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onChangeTable = async (change) => {
    const newRows = [...rows];
    let isChange;

    for (const c of change) {
      const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
      const columnIndex = parseInt(columns.findIndex((j) => j.columnId === c.columnId));

      const type = c.newCell.type;

      const length = newRows.length;

      let value;

      if (type === "text") {
        newRows[rowIndex].cells[columnIndex].text = c.newCell.text;
        value = c.newCell.text;
        isChange = true;
      } else {
        value = c.newCell.value;
        if (!isNaN(value)) {
          newRows[rowIndex].cells[columnIndex].value = value;

          // let jumlahBulan = 0;
          // let tarif = newRows[rowIndex].cells[16].value;

          // const newCell = newRows[rowIndex].cells.map((e, j) => {
          //   if (j >= 3 && j <= 14) jumlahBulan += e.value;
          //   if (j === 15) e.value = jumlahBulan;
          //   if (j === 17) e.value = jumlahBulan * tarif;
          //   if (j >= 18) e.value = newRows[rowIndex].cells[j - 15].value * tarif;
          //   return e;
          // });

          // newRows[rowIndex].cells = newCell;

          isChange = true;
        } else {
          isChange = false;
        }
      }

      if (isChange) {
        try {
          let formData = new FormData();

          const id = c.rowId;
          const column_id = c.columnId;
          const isNewRow = newRows[rowIndex].newRow;
          const gradeId = newRows[rowIndex].gradeId;
          const subGradeId = newRows[rowIndex].subGradeId;

          if (isNewRow) {
            const {
              code_company,
              code_dept,
              code_location,
              code_product,
              code_project,
              code_icp,
              periode,
            } = codeFilter;

            formData.append("code_company", code_company);
            formData.append("code_department", code_dept);
            formData.append("code_location", code_location);
            formData.append("code_product", code_product);
            formData.append("code_project", code_project);
            formData.append("code_icp", code_icp);
            formData.append("year", periode);
            formData.append("grade_id", gradeId);
            formData.append("sub_grade_id", subGradeId);
            formData.append(column_id, parseInt(value));
            // formData.append("name", value);

            const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

            const rowId = res.data.data.id;

            newRows[rowIndex].rowId = rowId;
            newRows[rowIndex].newRow = false;
          } else {
            formData.append("id", id);
            formData.append("column_id", column_id);
            formData.append("value", value);

            await MainServices.post(`${ENDPOINT_URL}/update`, formData);
          }

          newRows[length - 1] = updateTotalRow(newRows);
        } catch (e) {
          log({ e });
        }
      }
    }

    showNotif(200, "Sukses update data");

    setRows(newRows);
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
