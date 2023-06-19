import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";
import { useSearchParams } from "react-router-dom";
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
  let [searchParams] = useSearchParams();

  const dataGlobalRedux = useSelector((state) => state.data);
  const { clicked } = useSelector((state) => state.revenue);
  const importRedux = useSelector((state) => state.import);

  useEffect(() => {
    if (searchParams.size > 0) {
      log("searchParams", searchParams);
      const currentParams = Object.fromEntries([...searchParams]);
      log("currentParams", currentParams);
      onFinish(currentParams);
    }
  }, [clicked]);

  useEffect(() => {
    if (importRedux.file !== null) {
      onUploadFile(importRedux.file);
    }
  }, [importRedux.file]);

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
    const { code_company, code_dept, code_location, code_project, code_icp, periode } = values;

    let fCodeCompany = code_company;
    let fCodeLocation = code_location;
    let fCodeDept = code_dept;
    let fCodeIcp = code_icp;
    let fCodeProject = code_project;
    let fPeriode = periode;

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
          if (data.data.length > 0) {
            r = getRows({
              header: getHeaderRow[desc],
              data: data.data,
              key: desc,
            });
          }

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
    log({ listRows });
    dispatch(actionData({ sizeDataRevenue: 1 }));
    setRows(listRows);
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const stokAkhir = () => {};

  const penjualan = () => {};

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

          log({ key });

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

          newRows[i][length - 1] = updateTotalRow(newRows);
        } catch (e) {
          log({ e });
        }
      }
    }

    showNotif(200, "Sukses update data");

    fullRows[i].data = newRows;

    setRows(fullRows);
  };

  const onSuccess = () => {
    dispatch(resetDataActionImport());
  };

  const onUploadFile = async (file) => {
    dispatch(
      actionImport({
        loading: true,
      })
    );

    const { code_company, code_location, code_dept, code_icp, code_project, periode } =
      codeFilter;

    const desc = dataGlobalRedux.indexImport;
    const index = rows.findIndex((item) => item.description === desc);
    const endpoint = rows[index].endpoint;

    log({ file });
    log({ desc });
    log({ rows });
    log({ index });
    log({ endpoint });

    let formData = new FormData();

    formData.append("file", file);

    formData.append("code_company", code_company);
    formData.append("code_department", code_dept);
    formData.append("code_location", code_location);
    formData.append("code_project", code_project);
    formData.append("code_icp", code_icp);
    formData.append("year", periode);

    try {
      const res = await MainServices.post(`${endpoint}/import`, formData);

      const url = `${endpoint}/list?code_company=${code_company}&code_location=${code_location}&code_department=${code_dept}&code_icp=${code_icp}&code_project=${code_project}&year=${periode}`;
      const { data } = await MainServices.get(url);

      const r = getRows({
        header: getHeaderRow[desc],
        data: data.data,
        key: desc,
      });

      const newRow = [...rows];

      newRow[index].data = r;

      setRows(newRow);

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
