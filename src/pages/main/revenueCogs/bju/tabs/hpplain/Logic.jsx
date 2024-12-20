/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, log, showNotif } from "values/Utilitas";
import { actionData, resetTypeRevenueImport } from "redux/data-global/data.reducer";
import { keyRevenueTab, urlRevenue } from "values/Constant";
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
  const [dataPenjualan, setDataPenjualan] = useState();

  const columns = getColumns;
  const [rows, setRows] = useState();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);
  const { filterValuesHpplain } = useSelector((state) => state.revenue);
  const importRedux = useSelector((state) => state.import);

  useEffect(() => {
    if (filterValuesHpplain !== undefined) {
      onFinish(filterValuesHpplain);
    }
  }, [filterValuesHpplain]);

  useEffect(() => {
    if (importRedux.file !== null) {
      onUploadFile(importRedux.file);
    }
  }, [importRedux.file]);

  const formatingFilter = (filter) => {
    const {
      code_company,
      code_product,
      code_dept,
      code_location,
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

    fCodeCompany = fCodeCompany[0];
    fCodeProduct = fCodeProduct[0];
    fCodeLocation = fCodeLocation[0];
    fCodeDept = fCodeDept[0];
    fCodeIcp = fCodeIcp[0];
    fCodeProject = fCodeProject[0];
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
    const listRows = [];

    await Promise.allSettled(
      urlRevenue[keyRevenueTab[1]].map(async (p, i) => {
        const desc = p.description;
        const url = `${p.endpoint}/list`;
        try {
          const { data } = await MainServices.get(url, params);
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

    const url = `detailrevenue/project/selling/list`;

    const { data } = await MainServices.get(url, params);
    const fData = data.data.filter((d) => d.project_code === params.code_project);
    dispatch(actionData({ sizeDataRevenue: 1 }));
    setDataPenjualan(fData);
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
        const length = newRows.length;

        let value;

        if (type === "text") {
          newRows[rowIndex].cells[columnIndex].text = c.newCell.text;
          value = c.newCell.text;
          isChange = true;
        } else if (type === "number") {
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
        } else if (type === "percent") {
          value = parseInt(c.newCell.text);
          let total = 0;

          let ind = 2;

          const newCell = newRows[rowIndex].cells.map((e, j) => {
            if (j >= ind && j <= 24) {
              total += e.value;
              ind += 2;
            }
            if (j === 26) {
              e.value = total;
              total = 0;
              ind = 27;
            }
            if (j >= ind && j <= 27 + 24) {
              total += e.value;
              ind += 2;
            }
            return e;
          });

          newRows[rowIndex].cells = newCell;

          newRows[rowIndex].cells[columnIndex].text = `${value}`;

          isChange = true;
        }

        if (isChange) {
          const id = c.rowId;
          const column_id = c.columnId;
          const isNewRow = newRows[rowIndex].newRow;

          const key = columns[item.description][columnIndex].columnId;

          const code_account = newRows[rowIndex].cells[0].text;

          if (isNewRow) {
            const formData = formDataUtils({
              ...codeFilter,
              code_account,
              [key]: value,
            });

            const res = await MainServices.post(`${item.endpoint}/insert`, formData);

            const rowId = res.data.data.id;

            newRows[rowIndex].rowId = rowId;
            newRows[rowIndex].newRow = false;
          } else {
            const formData = formDataUtils({
              id,
              column_id,
              value,
            });

            await MainServices.post(`${item.endpoint}/update`, formData);
          }

          delete newRows[rowIndex].newRow;
          newRows[length - 1] = updateTotalRow(newRows, item.description);

          fullRows[i].data = newRows;

          // hpp variabel
          if (type === "percent") {
            if (i === 1) {
              const lengthHppVariabel = fullRows[1].data.length;

              const sColumnId = c.columnId.split("_");
              const vPenjualan =
                dataPenjualan[0][
                  sColumnId.length > 1 ? `${sColumnId[0]}_${sColumnId[1]}` : `${sColumnId[0]}`
                ];

              fullRows[1].data[rowIndex].cells[columnIndex - 1].value =
                vPenjualan * (value / 100);

              let total = 0;
              let ind = 2;

              const newCellHppVariable = fullRows[1].data[rowIndex].cells.map((e, j) => {
                if (j >= ind && j <= 24) {
                  total += e.value;
                  ind += 2;
                }
                if (j === 26) {
                  e.value = total;
                  total = 0;
                  ind = 27;
                }
                if (j >= ind && j <= 27 + 24) {
                  total += e.value;
                  ind += 2;
                }
                return e;
              });

              fullRows[1].data[rowIndex].cells = newCellHppVariable;

              fullRows[1].data[lengthHppVariabel - 1] = updateTotalRow(
                fullRows[1].data,
                item.description
              );
            }
          }
        }
      }
      setRows(fullRows);
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

    const desc = dataGlobalRedux.indexImport;
    const type = dataGlobalRedux.typeRevenueImport ?? "actual";
    const index = rows.findIndex((item) => item.description === desc);

    const endpoint = rows[index].endpoint;

    const formData = formDataUtils({
      ...codeFilter,
      file,
      type,
    });

    try {
      const res = await MainServices.post(`${endpoint}/import`, formData);

      const url = `${endpoint}/list`;
      const { data } = await MainServices.get(url, codeFilter);

      let r = getRows({
        header: getHeaderRow[desc],
        data: data.data,
        key: desc,
      });

      const newRow = [...rows];

      newRow[index].data = r;

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
