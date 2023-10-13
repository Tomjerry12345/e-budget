/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { fullNewRow, getRows, updateTotalRow } from "./getRows";
import { actionData } from "redux/data-global/data.reducer";

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
  const { filterValuesPenjualan } = useSelector((state) => state.revenue);
  const importRedux = useSelector((state) => state.import);

  const refSumChange = 0;

  const ENDPOINT_URL = "detailrevenue/bk";

  useEffect(() => {
    if (filterValuesPenjualan !== undefined) {
      onFinish(filterValuesPenjualan);
    }
  }, [filterValuesPenjualan]);

  useEffect(() => {
    if (importRedux.file !== null) {
      onUploadFile(importRedux.file);
    }
  }, [importRedux.file]);

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
      // code_product,
      // code_project,
      code_icp,
      periode,
    } = filter;

    let fCodeCompany = code_company.split(" ");
    // let fCodeProduct = code_product.split(" ");
    // let fCodeProject = code_project.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    // fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    // fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fPeriode = fPeriode[0];

    return {
      code_company: fCodeCompany,
      // code_product: fCodeProduct,
      // code_project: fCodeProject,
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
      dispatch(actionData({ sizeDataRevenue: 1 }));
      setRows(r);
    } catch (error) {
      console.error(`Error fetching data for code account`, error);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  // eslint-disable-next-line no-unused-vars
  const onChangeTableBackup = async (change) => {
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
          let indexParent, first, last;

          for (let i = rowIndex; i > 0; i--) {
            if (newRows[i].parent === true) {
              indexParent = i;
              first = i + 1;

              break;
            }
          }

          for (let i = rowIndex; i < newRows.length - 1; i++) {
            if (newRows[i].parent === true) {
              last = i;
              break;
            }
          }

          last = last ?? newRows.length - 1;

          const code_product = newRows[indexParent].cells[0].text;

          const dataByParent = newRows.slice(first, last);

          let sumParent = 0;

          if (dataByParent.length > 0) {
            dataByParent.forEach((e) => {
              sumParent += e.cells[columnIndex].value;
            });
          } else {
            sumParent = newRows[first].cells[columnIndex].value;
          }

          newRows[indexParent].cells[columnIndex].value = sumParent;

          const id = c.rowId;
          const column_id = c.columnId;
          const isNewRow = newRows[rowIndex].newRow;

          const code_project = newRows[rowIndex].cells[0].text;

          const key = columns[columnIndex].columnId;

          if (isNewRow) {
            const formData = formDataUtils({
              ...codeFilter,
              code_project,
              code_product,
              [key]: value,
            });

            const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

            log({ res });
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

  const onChangeTable = async (change) => {
    const newRows = [...rows];
    let isChange = false;
    log({ change });
    try {
      for (const c of change) {
        const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
        if (rowIndex < 0) continue;
        const columnIndex = columns.findIndex((j) => j.columnId === c.columnId);
        const type = newRows[rowIndex].cells[columnIndex].type;
        let value;

        if (type === "text") {
          value = c.newCell.text;
          isChange = true;
        } else {
          value = c.newCell.value;

          if (!isNaN(value)) {
            isChange = true;
          } else {
            isChange = false;
          }
        }

        log({ value });

        if (isChange) {
          let indexParent;

          for (let i = rowIndex; i > 0; i--) {
            if (newRows[i].parent === true) {
              indexParent = i;
              break;
            }
          }

          const code_product = newRows[indexParent].cells[0].text;

          const id = c.rowId;
          const column_id = c.columnId;
          const isNewRow = newRows[rowIndex].newRow;

          const code_project = newRows[rowIndex].cells[0].text;

          const key = columns[columnIndex].columnId;

          if (isNewRow) {
            const formData = formDataUtils({
              ...codeFilter,
              code_project,
              code_product,
              [key]: value,
            });

            const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

            log({ res });
          } else {
            const formData = formDataUtils({
              id,
              column_id,
              value,
            });

            await MainServices.post(`${ENDPOINT_URL}/update`, formData);
          }
        }
      }

      getData(codeFilter);

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

  const onUploadFile = async (file) => {
    dispatch(
      actionImport({
        loading: true,
      })
    );

    const type = dataGlobalRedux.typeRevenueImport ?? "actual";

    const formData = formDataUtils({
      ...codeFilter,
      type,
      file,
    });

    try {
      await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      getData(codeFilter);

      showNotif(200, "Sukses import");

      onSuccess();
    } catch (error) {
      const err = error.response;

      showNotif(400, err);

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
