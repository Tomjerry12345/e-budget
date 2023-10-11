/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, log, showNotif } from "values/Utilitas";
import { actionData, resetTypeRevenueImport } from "redux/data-global/data.reducer";
import { keyRevenueTab } from "values/Constant";
import {
  fullNewRow,
  updateTotalRow,
} from "values/react-grid/rows/input/revenue/template-1/getRows";
import { getHeaderRow } from "values/react-grid/rows/input/revenue/template-1/getHeaderRow";
import { getColumns } from "values/react-grid/rows/input/revenue/template-1/getColumns";
import { tableList } from "../../TableConstant";
import { getRows } from "./getRows";

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
  const { filterValuesPenjualan } = useSelector((state) => state.revenue);
  const importRedux = useSelector((state) => state.import);

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

  const formatingFilter = (filter) => {
    const { code_company, code_dept, code_location, code_project, code_icp, periode } = filter;

    let fCodeCompany = code_company.split(" ");
    let fCodeProject = code_project.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0];
    fCodeProject = fCodeProject[0];
    fCodeLocation = fCodeLocation[0];
    fCodeDept = fCodeDept[0];
    fCodeIcp = fCodeIcp[0];
    fPeriode = fPeriode[0];

    return {
      code_company: fCodeCompany,
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
    const listRows = [];

    await Promise.allSettled(
      tableList[keyRevenueTab[0]].map(async (p, i) => {
        const desc = p.description;
        const key = p.key;

        const url = `${p.endpoint}/list`;
        try {
          const { data } = await MainServices.get(url, params);
          let r, d;

          if (desc === "All data") d = data.data.detail;
          else if (desc === "Penjualan") d = data.data.list;
          else d = data.data;

          r = getRows({
            header: getHeaderRow[desc],
            data: d,
            key: desc,
          });

          listRows[i] = {
            description: desc,
            key: key,
            insert: p.insert,
            endpoint: p.endpoint,
            endpointChange: p.endpointChange,
            data: r,
            // apiData: data.data,
          };
        } catch (error) {
          // Tangani error jika ada
          console.error(`Error fetching data ${desc}`, error);
          listRows[i] = {
            description: desc,
            key: key,
            insert: p.insert,
            endpoint: p.endpoint,
            endpointChange: p.endpointChange,
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

    try {
      for (const c of change) {
        const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
        if (rowIndex < 0) continue;
        const columnIndex = columns[item.description].findIndex(
          (j) => j.columnId === c.columnId
        );

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

        if (isChange) {
          let formData = new FormData();

          const id = c.rowId;
          const column_id = c.columnId;
          const isNewRow = newRows[rowIndex].newRow;

          const codeProduct = newRows[rowIndex].cells[0].text;
          const listNumber = newRows[rowIndex].list_number;

          const key = columns[item.description][columnIndex].columnId;

          if (isNewRow) {
            const formData = formDataUtils({
              ...codeFilter,
              [key]: value,
              code_product: codeProduct,
              list_number: listNumber,
            });

            const res = await MainServices.post(`${item.endpointChange}/insert`, formData);

            log({ res });
          } else {
            formData.append("id", id);
            formData.append("column_id", column_id);
            formData.append("value", value);
            await MainServices.post(`${item.endpointChange}/update`, formData);
          }
        }
      }

      getData(codeFilter);

      showNotif(dispatch, { status: 200, message: "Sukses update data" });
    } catch (e) {
      log({ e });
      showNotif(dispatch, { status: 400, message: e.message });
    }
  };

  const onSuccess = () => {
    dispatch(resetDataActionImport());
    dispatch(actionImport({ loading: false }));
    dispatch(resetTypeRevenueImport());
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
    const type = dataGlobalRedux.typeRevenueImport ?? "actual";
    const index = rows.findIndex((item) => item.description === desc);

    const endpoint = rows[index].endpoint;

    let formData = new FormData();

    formData.append("file", file);

    formData.append("code_company", fCodeCompany);
    formData.append("code_location", fCodeLocation);
    formData.append("code_department", fCodeDept);
    formData.append("code_icp", fCodeIcp);
    formData.append("code_project", fCodeProject);
    formData.append("year", fPeriode);
    formData.append("type", type);

    try {
      const res = await MainServices.post(`${endpoint}/import`, formData);

      getData(fCodeCompany, fCodeLocation, fCodeDept, fCodeIcp, fCodeProject, fPeriode);

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
