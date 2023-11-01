import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  actionImport,
  resetDataActionImport,
  val,
} from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, generateUID, log, showNotif } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import {
  getRootHeaderRow,
  fullNewRow,
  getRows,
  reactgridNewRow,
} from "./getRows";
import {
  generateArrayAttributes,
  generateAttributesByNewValue,
  generateObjectAttributes,
} from "values/react-grid/helpers";

const LoginNew = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);
  const [currData, setCurrData] = useState();
  const [categories, setCategories] = useState();
  const [emptyObj, setEmptyObj] = useState({
    id: "",
    code_company: "",
    code_product: "",
    code_location: "",
    code_department: "",
    code_project: "",
    code_icp: "",
    year: 0,
    description: "",
    quantity: 0,
    price: null,
    asset_category_id: "",
    purchase_month: null,
    purchase_year: null,
    depreciation_month: null,
    depreciation_year: null,
    asset_life: null,
    salvage_value: null,
    created_at: "",
    updated_at: "",
    total: 0,
    depreciation_amount_monthly: 0,
    depreciation_amount_yearly: 0,
    asset_account: "",
    accumulated_account: "",
    depreciation_account: "",
    is_asset_category_id: false,
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
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
              asset_life_in_year: category.asset_life_in_year,
              asset_account: category.asset_account,
              accumulated_account: category.accumulated_account,
              depreciation_account: category.depreciation_account,
            };
          })
        : [];
      setCategories(allAssetsCategory);
      let a;

      let r;
      if (data.data.length > 0) {
        a = await generateArrayAttributes(data.data, ["asset_category_id"]);
        a = a.map((x) => {
          return {
            ...x,
            purchase_year: x.purchase_year !== null ? '' + x.purchase_year : '',
            depreciation_year: x.depreciation_year !== null ? '' + x.depreciation_year : '',
          }
        })
        r = getRows({
          data: a,
          categories: allAssetsCategory,
        });
      } else {
        a = [{ ...reactgridNewRow() }];
        r = fullNewRow();
      }

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
    let lastCurrData = { ...emptyObj };
    const newArray = [...currData, lastCurrData];
    // const headerRow = newRows.slice(0, 2);
    // const dataRow = newRows.slice(2, newRows.length);

    // dataRow.unshift(reactgridNewRow());
    // setRows([...headerRow, ...dataRow]);
    setCurrData(newArray);
    showNotif(200, "Sukses tambah row");
  };

  const insertData = async (cell) => {
    const formData = formDataUtils(codeFilter);
    if (cell.column_id === "description") {
      formData.append("description", cell.value);
    }
    const res = await MainServices.post(`detailcapex/insert`, formData);
    if (res.data.responseCode === 200) {
      let newObject = await generateAttributesByNewValue(
        emptyObj,
        res.data.data
      );
      let newData = [...currData].map((el) => (!el.id ? { ...newObject } : el));
      setCurrData(newData);
      showNotif(200, "Sukses update data");
    } else {
      showNotif(500, "Error");
    }
  };

  const updateData = async (cell) => {
    if (Object.keys(cell).length === 3) {
      try {
        const formData = formDataUtils(cell);
        const res = await MainServices.post(`detailcapex/update`, formData);
        if (res.data.responseCode === 200) {
          showNotif(200, "Sukses update data");
        } else {
          showNotif(500, "Error");
        }
      } catch (e) {
        log({ e });
      }
    }
  };

  useEffect(() => {
    if (currData) {
      if (currData.length) {
        setRows(
          getRows({
            data: currData,
            categories,
          })
        );
      } else {
        setRows(fullNewRow());
      }
    }
  }, [currData]);

  const applyChanges = (changes, prevDetails) => {
    let newRows = [...rows];

    changes.forEach(async (change, i) => {
      const dataRowId = change.rowId;
      const fieldName = change.columnId;

      let dataRow = prevDetails.find((d) => d.id == dataRowId)
        ? prevDetails.find((d) => d.id == dataRowId)
        : prevDetails.find((d) => !d.id);

      const rowIndex = newRows.findIndex((j) => j.rowId === change.rowId);
      const columnIndex = parseInt(
        columns.findIndex((j) => j.columnId === change.columnId)
      );

      const id = newRows[rowIndex].rowId;
      const column_id = columns[columnIndex].columnId;
      const rowData = newRows[rowIndex];
      let valuesOfDropdown, selected;

      if (!dataRowId) {
        dataRow[fieldName] = change.newCell.text;

        insertData({
          column_id: fieldName,
          value: change.newCell.text,
        });
      } else {
        if (change.type === "text") {
          dataRow[fieldName] = change.newCell.text;
          updateData({
            id: dataRow.id,
            column_id: fieldName,
            value: change.newCell.text,
          });
        } else if (change.type === "number") {
          let value = change.newCell.value;
          dataRow[fieldName] = value;

          updateData({
            id,
            column_id,
            value,
          });
          if (!isNaN(value)) {
            value = dataRow["quantity"] * dataRow["price"];

            dataRow["total"] = value;
          }
        } else if (change.type === "checkbox") {
          dataRow[fieldName] = change.newCell.checked;
          updateData({
            id,
            column_id,
            value: change.newCell.checked,
          });
        } else if (change.type === "dropdown") {
          let key = `is_${fieldName}`;

          if (
            change.newCell.selectedValue &&
            change.previousCell.selectedValue !== change.newCell.selectedValue
          ) {
            dataRow[fieldName] = change.newCell.selectedValue;
            selected = change.newCell.selectedValue;

            updateData({
              id: dataRow.id,
              column_id: fieldName,
              value: change.newCell.selectedValue,
            });
          }

          if (change.newCell.inputValue) {
            dataRow[fieldName] = change.newCell.inputValue;

            updateData({
              id: dataRow.id,
              column_id: fieldName,
              value: change.newCell.inputValue,
            });
          }

          // CHANGED: set the isOpen property to the value received.
          dataRow[key] = change.newCell.isOpen;
        } else {
          log("ERROR", change.type);
        }
      }

      if (selected) {
        valuesOfDropdown = change.previousCell.values.find(
          (e) => e.value === selected
        );
      }

      if (valuesOfDropdown) {
        // find a selected category to set asset_account, accumulate_account, and depreciation_account

        dataRow["asset_life"] = valuesOfDropdown["asset_life_in_year"];
        dataRow['depreciation_amount_monthly'] = valuesOfDropdown["asset_life_in_year"] === 0 ? 0 : dataRow['price'] / (valuesOfDropdown["asset_life_in_year"] * 12);
        dataRow['depreciation_amount_yearly'] = (12 - dataRow['depreciation_month'] + 1) * dataRow['depreciation_amount_monthly'];
        dataRow["asset_account"] = valuesOfDropdown["asset_account"];
        dataRow["accumulated_account"] =
          valuesOfDropdown["accumulated_account"];
        dataRow["depreciation_account"] =
          valuesOfDropdown["depreciation_account"];

        // =============
      }

      // if (!dataRow) {
      //   dataRow = generateObjectAttributes(prevDetails);
      //   prevDetails.push(dataRow);
      // }
    });

    return [...prevDetails];
  };

  const onChangeTable = (change) => {
    setCurrData((prevState) => {
      return applyChanges(
        change,
        prevState.length ? prevState : [{ ...emptyObj }]
      );
    });
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
