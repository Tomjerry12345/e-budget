/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log, showNotif } from "values/Utilitas";
import { actionData } from "redux/data-global/data.reducer";
import { urlRevenue } from "values/Constant";
import {
  fullNewRow,
  getRows,
  updateTotalRow,
} from "values/react-grid/rows/input/revenue/template-1/getRows";
import { getHeaderRow } from "values/react-grid/rows/input/revenue/template-1/getHeaderRow";
import { getColumns } from "values/react-grid/rows/input/revenue/template-1/getColumns";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const columns = getColumns;
  const [rows, setRows] = useState();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);
  const { filterValues } = useSelector((state) => state.revenue);
  const importRedux = useSelector((state) => state.import);

  useEffect(() => {
    if (filterValues !== null) {
      onFinish(filterValues);
    }
  }, [filterValues]);

  useEffect(() => {
    if (importRedux.file !== null) {
      onUploadFile(importRedux.file);
    }
  }, [importRedux.file]);

  const onSetDataTable = (values) => {
    const { code_company, code_dept, code_location, code_project, code_icp, periode } = values;

    let fCodeCompany = code_company.split(" ");
    // let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0];
    fCodeLocation = fCodeLocation[0];
    fCodeDept = fCodeDept[0];
    fCodeIcp = fCodeIcp[0];
    fCodeProject = fCodeProject[0];
    fPeriode = fPeriode[0];

    getData(fCodeCompany, fCodeLocation, fCodeDept, fCodeIcp, fCodeProject, fPeriode);

    setCodeFilter(values);
  };

  const getData = async (
    codeCompany,
    codeLocation,
    codeDept,
    codeIcp,
    codeProject,
    periode
  ) => {
    const listRows = [];

    await Promise.allSettled(
      urlRevenue.map(async (p, i) => {
        const desc = p.description;
        const url = `${p.endpoint}/list?code_company=${codeCompany}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}`;
        try {
          const { data } = await MainServices.get(url);
          let r;
          r = getRows({
            header: getHeaderRow[desc],
            data: data.data,
            key: desc,
          });
          listRows[i] = {
            description: desc,
            insert: p.insert,
            endpoint: p.endpoint,
            data: r,
            // apiData: data.data,
          };
        } catch (error) {
          // Tangani error jika ada
          console.error(`Error fetching data ${desc}`, error);
          listRows[i] = {
            description: desc,
            insert: p.insert,
            endpoint: p.endpoint,
            data: fullNewRow(getHeaderRow[desc], i, desc),
            // apiData: [],
          };
        }
      })
    );
    dispatch(actionData({ sizeDataRevenue: 1 }));

    log({ listRows });
    setRows(listRows);
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onChangeTable = async (change, i, item) => {
    const fullRows = [...rows];
    const newRows = [...rows[i].data];
    let isChange;

    for (const c of change) {
      const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
      const columnIndex = columns[item.description].findIndex((j) => j.columnId === c.columnId);

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
            if (j >= 15 && j <= 27) total2 += e.value;
            if (j === 28) e.value = total2;
            return e;
          });

          newRows[rowIndex].cells = newCell;

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

          const codeProduct = newRows[rowIndex].cells[0].text;

          const key = columns[item.description][columnIndex].columnId;

          if (isNewRow) {
            const { code_company, code_dept, code_location, code_project, code_icp, periode } =
              codeFilter;

            formData.append("code_company", code_company);
            formData.append("code_department", code_dept);
            formData.append("code_location", code_location);
            formData.append("code_product", codeProduct);
            formData.append("code_project", code_project);
            formData.append("code_icp", code_icp);
            formData.append("year", periode);
            formData.append(key, value);

            const res = await MainServices.post(`${item.endpoint}/insert`, formData);

            log({ res });
            const rowId = res.data.data.id;

            newRows[rowIndex].rowId = rowId;
          } else {
            formData.append("id", id);
            formData.append("column_id", column_id);
            formData.append("value", value);

            await MainServices.post(`${item.endpoint}/update`, formData);
          }

          newRows[length - 1] = updateTotalRow(newRows, item.description);
          log("newRows", newRows);

          // stok akhir
          if (type === "number") {
            if (i === 0 || i === 1 || i === 4) {
              const lengthStockAkhir = fullRows[3].data.length;
              const stockAwal = fullRows[0].data[rowIndex].cells[columnIndex].value;
              const asumsiUnitBeli = fullRows[1].data[rowIndex].cells[columnIndex].value;
              const asumsiUnitJual = fullRows[4].data[rowIndex].cells[columnIndex].value;

              log({ lengthStockAkhir });
              log("item.description", item.description);
              log("fullRows[3].data[lengthStockAkhir - 1]", fullRows[3].data);

              fullRows[3].data[rowIndex].cells[columnIndex].value =
                stockAwal + asumsiUnitBeli - asumsiUnitJual;

              let total1 = 0;
              let total2 = 0;

              const newCellStockAkhir = fullRows[3].data[rowIndex].cells.map((e, j) => {
                if (j >= 2 && j <= 13) total1 += e.value;
                if (j === 14) e.value = total1;
                if (j >= 15 && j <= 27) total2 += e.value;
                if (j === 28) e.value = total2;
                return e;
              });

              fullRows[3].data[rowIndex].cells = newCellStockAkhir;

              fullRows[3].data[lengthStockAkhir - 1] = updateTotalRow(
                fullRows[3].data,
                item.description
              );
            }
          }
        } catch (e) {
          log({ e });
        }
      }
    }

    showNotif(dispatch, { status: 200, message: "Sukses update data" });

    fullRows[i].data = newRows;

    setRows(fullRows);
  };

  const onSuccess = () => {
    dispatch(resetDataActionImport());
    dispatch(actionData({ loading: false }));
  };

  const onUploadFile = async (file) => {
    dispatch(
      actionImport({
        loading: true,
      })
    );

    const { code_company, code_location, code_dept, code_icp, code_project, periode } =
      codeFilter;

    let fCodeCompany = code_company.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fPeriode = fPeriode[0];

    const desc = dataGlobalRedux.indexImport;
    const index = rows.findIndex((item) => item.description === desc);
    log("row[index]", rows[index]);
    const endpoint = rows[index].endpoint;

    let formData = new FormData();

    formData.append("file", file);

    formData.append("code_company", fCodeCompany);
    formData.append("code_location", fCodeLocation);
    formData.append("code_department", fCodeDept);
    formData.append("code_icp", fCodeIcp);
    formData.append("code_project", fCodeProject);
    formData.append("year", fPeriode);

    try {
      const res = await MainServices.post(`${endpoint}/import`, formData);

      const url = `${endpoint}/list?code_company=${fCodeCompany}&code_location=${fCodeLocation}&code_department=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&year=${fPeriode}`;
      const { data } = await MainServices.get(url);
      console.log("first stock : ", data);

      let r = getRows({
        header: getHeaderRow[desc],
        data: data.data,
        key: desc,
      });

      const newRow = [...rows];

      newRow[index].data = r;

      if (index === 0 || index === 1 || index === 4) {
        const epLastStock = rows[3].endpoint;
        const urlLastStock = `${epLastStock}/list?code_company=${fCodeCompany}&code_location=${fCodeLocation}&code_department=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&year=${fPeriode}`;
        const { data } = await MainServices.get(urlLastStock);

        console.log("last stock : ", data);
        r = getRows({
          header: getHeaderRow[desc],
          data: data.data,
          key: desc,
        });

        newRow[3].data = r;
      }

      setRows(newRow);

      // responseShow(res);
      showNotif(dispatch, { res: res });

      onSuccess();
    } catch (error) {
      const err = error.response;

      showNotif(dispatch, { res: err });

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
