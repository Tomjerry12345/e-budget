import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, generateUID, log, showNotif } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { getRootHeaderRow, fullNewRow, getRows, reactgridNewRow } from "./getRows";
import { generateArrayAttributes, generateObjectAttributes } from "values/react-grid/helpers";

const LoginNew = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);
  const [currData, setCurrData] = useState();
  const [categories, setCategories] = useState();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "detailcapex/new-asset";

  const idRef = useRef(null);

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
    const url = `${ENDPOINT_URL}`;
    try {
      const { data } = await MainServices.get(url, params);

      const response = await MainServices.get("detailcapex/asset-categories");
      const allAssetsCategory = response
        ? response.data.data.map((category) => {
            return {
              label: category.name,
              value: category.id,
              asset_account: category.asset_account,
              accumulated_account: category.accumulated_account,
              depreciation_account: category.depreciation_account,
            };
          })
        : [];
      setCategories(allAssetsCategory);
      let a = await generateArrayAttributes(data.data, ["asset_category_id"]);

      log("data.data", a);
      let r;
      if (a.length > 0) {
        r = getRows({
          data: a,
          categories: allAssetsCategory,
        });
      } else {
        r = fullNewRow({ id: generateUID() });
      }
      setRows(r);
      setCurrData(a);
    } catch (error) {
      // Tangani error jika ada
      console.error(`Error fetching data`, error);
    }
  };

  const onFinish = (values) => {
    setLoading(true);

    onSetDataTable(values);
  };

  const onTambahRow = () => {
    const newRows = [...rows];
    const headerRow = newRows.slice(0, 2);
    const dataRow = newRows.slice(2, newRows.length);
    log({ headerRow });
    log({ dataRow });
    dataRow.unshift(reactgridNewRow());
    setRows([...headerRow, ...dataRow]);

    showNotif(200, "Sukses tambah row");
  };

  const updateData = async (cell, rowData) => {
    if (Object.keys(cell).length === 3) {
      try {
        const isNewRow = rowData["isNewRow"];

        if (isNewRow) {
          const formData = formDataUtils(codeFilter);

          if (cell.column_id === "description") {
            formData.append("description", cell.value);
            formData.append("description", cell.value);
          }
          const res = await MainServices.post(`detailcapex/insert`, formData);
          if (res.data.responseCode === 200) {
            showNotif(200, "Sukses update data");
            getData(codeFilter);
          } else {
            showNotif(500, "Error");
          }
        } else {
          const formData = formDataUtils(cell);
          const res = await MainServices.post(`detailcapex/update`, formData);
          if (res.data.responseCode === 200) {
            showNotif(200, "Sukses update data");
          } else {
            showNotif(500, "Error");
          }
        }
      } catch (e) {
        log({ e });
      }
    }
  };

  // temp: onChange old version
  // const onChangeTable = async (change) => {
  //   let newRows = [...rows];

  //   for (const c of change) {
  //     const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
  //     const columnIndex = parseInt(columns.findIndex((j) => j.columnId === c.columnId));
  //     const type = c.newCell.type;

  //     const id = newRows[rowIndex].rowId;
  //     const column_id = columns[columnIndex].columnId;

  //     const rowData = newRows[rowIndex];

  //     log({ rowData });

  //     if (type === "text") {
  //       newRows[rowIndex].cells[columnIndex].text = c.newCell.text;
  //       updateData(
  //         {
  //           id,
  //           column_id,
  //           value: c.newCell.value,
  //         },
  //         rowData
  //       );
  //     } else if (type === "number") {
  //       newRows[rowIndex].cells[columnIndex].value = c.newCell.value;
  //       updateData(
  //         {
  //           id,
  //           column_id,
  //           value: c.newCell.value,
  //         },
  //         rowData
  //       );
  //     } else if (type === "dropdown") {
  //       if (c.previousCell.selectedValue !== c.newCell.selectedValue) {
  //         newRows[rowIndex].cells[columnIndex].selectedValue = c.newCell.selectedValue;

  //         updateData(
  //           {
  //             id,
  //             column_id,
  //             value: c.newCell.selectedValue,
  //           },
  //           rowData
  //         );
  //       }

  //       if (c.newCell.inputValue) {
  //         newRows[rowIndex].cells[columnIndex].selectedValue = c.newCell.inputValue;

  //         updateData(
  //           {
  //             id,
  //             column_id,
  //             value: c.newCell.inputValue,
  //           },
  //           rowData
  //         );
  //       }

  //       // CHANGED: set the isOpen property to the value received.
  //       newRows[rowIndex].cells[columnIndex].isOpen = c.newCell.isOpen;
  //     } else {
  //       log({ error: `Error on cell column ${columnIndex} & row ${rowIndex}` });
  //     }
  //   }

  //   setRows(newRows);
  // };

  useEffect(() => {
    if (currData) {
      setRows(
        getRows({
          data: currData,
          categories,
        })
      );
    }
  }, [currData]);

  const applyChanges = (changes, prevDetails) => {
    let newRows = [...rows];

    changes.forEach(async (change, i) => {
      const dataRowId = change.rowId;
      const fieldName = change.columnId;
      let dataRow = prevDetails.find((d) => d.id === dataRowId);

      const rowIndex = newRows.findIndex((j) => j.rowId === change.rowId);
      const columnIndex = parseInt(columns.findIndex((j) => j.columnId === change.columnId));

      const id = newRows[rowIndex].rowId;
      const column_id = columns[columnIndex].columnId;
      const rowData = newRows[rowIndex];
      let valuesOfDropdown, selected;

      if (!dataRow) {
        dataRow = generateObjectAttributes(prevDetails);
        prevDetails.push(dataRow);
      }

      if (change.type === "text") {
        log({ prevDetails });
        dataRow[fieldName] = change.newCell.text;
        updateData(
          {
            id,
            column_id,
            value: change.newCell.text,
          },
          rowData
        );
      } else if (change.type === "number") {
        let value = change.newCell.value;
        dataRow[fieldName] = value;

        updateData(
          {
            id,
            column_id,
            value,
          },
          rowData
        );
        if (!isNaN(value)) {
          value =
            dataRow["rate_gray_shirt"] * dataRow["qty_gray_shirt"] +
            dataRow["rate_batik"] * dataRow["qty_batik"] +
            dataRow["rate_polo"] * dataRow["qty_polo"] +
            dataRow["rate_ic_card"] * dataRow["qty_ic_card"] +
            dataRow["rate_other"] * dataRow["qty_other"];

          dataRow["total"] = value;
        }
      } else if (change.type === "checkbox") {
        dataRow[fieldName] = change.newCell.checked;
        updateData(
          {
            id,
            column_id,
            value: change.newCell.checked,
          },
          rowData
        );
      } else if (change.type === "dropdown") {
        if (fieldName === "asset_category_id") {
          let key = `is_${fieldName}`;
          if (change.previousCell.selectedValue !== change.newCell.selectedValue) {
            dataRow[fieldName] = change.newCell.selectedValue;
            selected = change.newCell.selectedValue;

            updateData(
              {
                id,
                column_id,
                value: change.newCell.selectedValue,
              },
              rowData
            );
          }

          if (change.newCell.inputValue) {
            dataRow[fieldName] = change.newCell.inputValue;
            updateData(
              {
                id,
                column_id,
                value: change.newCell.inputValue,
              },
              rowData
            );
          }

          if (selected) {
            valuesOfDropdown = change.previousCell.values.find((e) => e.value === selected);
          }

          // CHANGED: set the isOpen property to the value received.
          dataRow[key] = change.newCell.isOpen;
        } else {
          if (change.previousCell.selectedValue !== change.newCell.selectedValue) {
            newRows[rowIndex].cells[columnIndex].selectedValue = change.newCell.selectedValue;

            updateData(
              {
                id,
                column_id,
                value: change.newCell.selectedValue,
              },
              rowData
            );
          }

          if (change.newCell.inputValue) {
            newRows[rowIndex].cells[columnIndex].selectedValue = change.newCell.inputValue;

            updateData(
              {
                id,
                column_id,
                value: change.newCell.inputValue,
              },
              rowData
            );
          }

          // CHANGED: set the isOpen property to the value received.
          newRows[rowIndex].cells[columnIndex].isOpen = change.newCell.isOpen;
        }

        if (valuesOfDropdown) {
          // find a selected category to set asset_account, accumulate_account, and depreciation_account

          dataRow["asset_account"] = valuesOfDropdown["asset_account"];
          dataRow["accumulated_account"] = valuesOfDropdown["accumulated_account"];
          dataRow["depreciation_account"] = valuesOfDropdown["depreciation_account"];

          log("valueSelected", valuesOfDropdown);

          // =============
        }
      } else {
        log("ERROR", change.type);
      }
    });

    return [...prevDetails];
  };

  const onChangeTable = (change) => {
    setCurrData((prevState) => applyChanges(change, prevState));
  };

  const onSuccess = () => {
    dispatch(resetDataActionImport());
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    // let tahun1 = tahun === undefined ? new Date().getFullYear() : tahun;
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

    // let formData = new FormData();

    // setLoadingUpload(true);

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    // formData.append("file", file1);
    // formData.append("code_account", codeAccount);
    // formData.append("code_company", code_company);
    // formData.append("code_department", code_dept);
    // formData.append("code_location", code_location);
    // formData.append("code_product", code_product);
    // formData.append("code_project", code_project);
    // formData.append("code_icp", code_icp);
    // formData.append("year", periode);
    // formData.append("type", "asuransi");

    const formData = formDataUtils({
      ...codeFilter,
      type: "asuransi",
    });

    try {
      const res = await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      const url = `${ENDPOINT_URL}/list?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_department=${code_dept}&code_icp=${code_icp}&code_project=${code_project}&year=${periode}&code_account=${codeAccount}`;
      const { data } = await MainServices.get(url);
      let a = await generateArrayAttributes(data.data, ["asset_category_id"]);

      setCurrData(a);
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
      onTambahRow,
    },
  };
};

export default LoginNew;
