import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  actionImport,
  resetDataActionImport,
  val,
} from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log, setLocal } from "values/Utilitas";
import { useLocation, useNavigate } from "react-router-dom";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import {
  getRootHeaderRow,
  fullNewRow,
  getRows,
  reactgridNewRow,
  updateTotalRow,
} from "./getRows";
import {
  generateArrayAttributes,
  generateAttributesByNewValue,
  generateEmptyAttributes,
  generateObjectAttributes,
} from "values/react-grid/helpers";
import { getMonthPrefix } from "values/Constant";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [emptyObj, setEmptyObj] = useState({
    id: "",
    code_account: "",
    code_company: "",
    code_product: "",
    code_location: "",
    code_department: "",
    code_project: "",
    code_icp: "",
    index: 1,
    year: 0,
    name: "",
    activity: null,
    cost_driver: null,
    amount: 0,
    unit: 0,
    rates: 0,
    pay_type: null,
    month_start: 0,
    month_duration: null,
    type: "",
    created_at: "",
    updated_at: "",
    total: 0,
    grand_total: 0,
    jan_rates: 0,
    feb_rates: 0,
    mar_rates: 0,
    apr_rates: 0,
    mei_rates: 0,
    jun_rates: 0,
    jul_rates: 0,
    agu_rates: 0,
    sep_rates: 0,
    okt_rates: 0,
    nov_rates: 0,
    des_rates: 0,
    is_month_duration: false,
    is_month_start: false,
  });

  const [items, setItems] = useState({
    pemasaran: [],
    administrasi: [],
  });
  const columns = getColumns();
  const [rows, setRows] = useState({
    pemasaran: [],
    administrasi: [],
  });
  const [currData, setCurrData] = useState();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "detailopex/template4";

  useEffect(() => {
    getDataAccount();
  }, []);

  const getDataAccount = async () => {
    try {
      const split = location.pathname.split("/");
      const q = split[split.length - 1];
      const res = await MainServices.get(`config/opex/byalias/${q}`);
      log({ res });
      setItems(res.data.data[0]);
    } catch (e) {
      log({ e });
    }
  };

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

  const onUpdateEmpty = async (elm) => {
    let newObj = await generateEmptyAttributes(elm);
    setEmptyObj(newObj);
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
    const listPemasaran = [];
    const listAdministrasi = [];

    const newListPem = [];
    const newListAds = [];

    let pemasaran = items.pemasaran;
    let administrasi = items.administrasi;

    if (pemasaran.length > 0) {
      await Promise.allSettled(
        pemasaran.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `${ENDPOINT_URL}/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
          try {
            const { data } = await MainServices.get(url);
            let r, a;

            a = await generateArrayAttributes(data.data, [
              "month_duration",
              "month_start",
            ]);

            if (data.data.length > 0) {
              r = getRows({
                header: getRootHeaderRow(),
                data: a,
              });
            } else {
              r = fullNewRow(getRootHeaderRow(), i);
            }
            newListPem[i] = a;
            listPemasaran[i] = r;
          } catch (error) {
            // Tangani error jika ada
            console.error(
              `Error fetching data for code account ${codeAccount}`,
              error
            );
            listPemasaran[i] = fullNewRow(getRootHeaderRow(), i);
          }
        })
      );
    }

    if (administrasi.length > 0) {
      await Promise.allSettled(
        administrasi.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `${ENDPOINT_URL}/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
          try {
            const { data } = await MainServices.get(url);
            let r, a;

            a = await generateArrayAttributes(data.data, [
              "month_duration",
              "month_start",
            ]);

            if (data.data.length > 0) {
              r = getRows({
                header: getRootHeaderRow(),
                data: a,
              });
            } else {
              r = fullNewRow(getRootHeaderRow(), i);
            }
            newListAds[i] = a;
            listAdministrasi[i] = r;
          } catch (error) {
            // Tangani error jika ada
            console.error(
              `Error fetching data for code account ${codeAccount}`,
              error
            );
            listAdministrasi[i] = fullNewRow(getRootHeaderRow(), i);
          }
        })
      );
    }

    setCurrData({
      ...currData,
      pemasaran: newListPem,
      administrasi: newListAds,
    });

    // setRows({
    //   ...rows,
    //   pemasaran: listPemasaran,
    //   administrasi: listAdministrasi,
    // });
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onTambahRow = async (i, category) => {
    let lastCurrData = { ...emptyObj };
    const lastArray = { ...currData }[category][i];
    const newArray = [...lastArray, lastCurrData];

    setCurrData((prevState) => {
      return {
        ...prevState,
        [category]: prevState[category].map((a, idx) => {
          if (idx === i) {
            return newArray;
          } else {
            return a;
          }
        }),
      };
    });
    showNotif(200, "Sukses tambah row");
  };

  const onUpdateData = async (cell) => {
    if (Object.keys(cell).length === 4) {
      try {
        const formData = new FormData();
        for (var item in cell) {
          formData.append(item, cell[item]);
        }

        const res = await MainServices.post(`${ENDPOINT_URL}/update`, formData);

        if (res.data.responseCode == 200) {
          showNotif(200, "Sukses update data");
        } else {
          showNotif(500, "Error");
        }
      } catch (e) {
        log({ e });
      }
    }
  };

  const onInsertData = async (value, i, category) => {
    try {
      let formData = new FormData();
      const {
        code_company,
        code_dept,
        code_location,
        code_product,
        code_project,
        code_icp,
        periode,
      } = codeFilter;

      const codeAccount = items[category][i]["code_account"];

      formData.append("code_account", codeAccount);
      formData.append("code_company", code_company);
      formData.append("code_department", code_dept);
      formData.append("code_location", code_location);
      formData.append("code_product", code_product);
      formData.append("code_project", code_project);
      formData.append("code_icp", code_icp);
      formData.append("year", periode);
      formData.append("name", value);
      formData.append("type", "sewa");
      const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

      if (res.data.responseCode == 200) {
        let newObject = await generateAttributesByNewValue(
          emptyObj,
          res.data.data
        );

        setCurrData((prevState) => {
          return {
            ...prevState,
            [category]: prevState[category].map((a, idx) => {
              if (idx === i) {
                return a.map((el) => (!el.id ? { ...newObject } : { ...el }));
              } else {
                return a;
              }
            }),
          };
        });

        showNotif(200, "Sukses insert data");
      }
    } catch (err) {
      log("err onInsertData", err);
    }
  };

  const applyChanges = (changes, prevDetails, i, category) => {
    let arrPosition = [];
    changes.forEach((change, idx) => {
      if (arrPosition.includes(change.rowId + ',' + change.columnId)) {
        return;
      }
      const dataRowId = change.rowId;
      const fieldName = change.columnId;
      arrPosition.push(change.rowId + ',' + change.columnId);

      let dataRow = prevDetails.find((d) => d.id == dataRowId)
        ? prevDetails.find((d) => d.id == dataRowId)
        : prevDetails.find((d) => !d.id);

      if (!dataRow) {
        dataRow = generateObjectAttributes(prevDetails);
        prevDetails.push(dataRow);
      }

      if (change.type === "text") {
        if (typeof dataRowId == "number" && change.newCell.text) {
          // is new row
          dataRow[fieldName] = change.newCell.text;
          onInsertData(change.newCell.text, i, category);
        } else {
          dataRow[fieldName] = change.newCell.text;
          onUpdateData({
            id: dataRow.id,
            column_id: fieldName,
            value: change.newCell.text,
            type: "sewa",
          });
        }
      } else if (change.type === "number") {
        let value = change.newCell.value;
        dataRow[fieldName] = value;

        onUpdateData({
          id: dataRow.id,
          column_id: fieldName,
          value,
          type: "sewa",
        });
      } else if (change.type === "checkbox") {
        dataRow[fieldName] = change.newCell.checked;
        onUpdateData({
          id: dataRow.id,
          column_id: fieldName,
          value: change.newCell.checked,
          type: "sewa",
        });
      } else if (change.type === "dropdown") {
        let key = `is_${fieldName}`;
        if (
          change.newCell.selectedValue && change.previousCell.selectedValue !== change.newCell.selectedValue
        ) {
          dataRow[fieldName] = change.newCell.selectedValue;

          onUpdateData({
            id: dataRow.id,
            column_id: fieldName,
            value: change.newCell.selectedValue,
            type: "sewa",
          });
        }

        if (change.newCell.inputValue) {
          dataRow[fieldName] = change.newCell.inputValue;
          onUpdateData({
            id: dataRow.id,
            column_id: fieldName,
            value: change.newCell.inputValue,
            type: "sewa",
          });
        }

        // CHANGED: set the isOpen property to the value received.
        dataRow[key] = change.newCell.isOpen;
      } else {
        log("ERROR", dataRow[fieldName]);
      }

      let duration = parseInt(dataRow["month_duration"]);
      let start = parseInt(dataRow["month_start"]);

      let total_rent = dataRow["amount"] * dataRow["unit"] * dataRow["rates"];
      dataRow["total"] = total_rent;

      let range;

      // check range from start month with duration of rent
      if (duration == 12) {
        if (start == 1) {
          range = 12;
        } else if (start > 1) {
          range = 12 - start;
        }
      } else {
        if (start > duration) {
          range = 12 - start;
        } else {
          range = duration - start;
        }
      }
      // ===================================================

      
      // const months with prefix to change the key of dataRow
      const allMonths = getMonthPrefix();
      
      // loop for months which is includes in rent's duration
      if (start > 0){
        dataRow["grand_total"] = total_rent * duration;
        for (let i = 0; i < allMonths.length; i++) {
          if (parseInt(allMonths[i].value) >= start) {
            if (parseInt([allMonths[i].value]) < start + duration) {
              dataRow[allMonths[i].key] = total_rent;
            } else {
              dataRow[allMonths[i].key] = 0;
            }
          } else {
            dataRow[allMonths[i].key] = 0;
          }
        }
      }
      // ===================================================
    });

    return [...prevDetails];
  };

  const onChangeTable = (change, i, category) => {
    setCurrData((prevState) => {
      return {
        ...prevState,
        [category]: prevState[category].map((a, idx) => {
          if (idx === i) {
            return applyChanges(
              change,
              a.length ? a : [{ ...emptyObj }],
              i,
              category
            );
          } else {
            return a;
          }
        }),
      };
    });
  };

  const generateNewRows = (arrayData) => {
    return arrayData.map((a) => {
      let newObj = [];
      if (a.find((el) => !el.rowId)) {
        newObj = a.map((elm) =>
          !elm.rowId ? reactgridNewRow(a.length + 1) : { ...elm }
        );
      } else {
        newObj = a;
      }

      return newObj;
    });
  };

  // this func is use to add new default row with description editable
  const generateTables = (arrays) => {
    return arrays.map((a, i) => {
      let r;
      if (a.length) {
        r = getRows({
          header: getRootHeaderRow(),
          data: a,
        });
      } else {
        r = fullNewRow(getRootHeaderRow(), i);
      }

      return [...r];
    });
  };

  useEffect(() => {
    if (currData) {
      const listPemasaran = generateTables([...currData.pemasaran]);
      const listAdministrasi = generateTables([...currData.administrasi]);

      setRows({
        ...rows,
        administrasi: generateNewRows(listAdministrasi),
        pemasaran: generateNewRows(listPemasaran),
      });
    }
  }, [currData]);

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

    const checkItem = (items, cat) => {
      items.forEach((e, i) => {
        if (e.code_account === codeAccount) {
          [index, category] = [i, cat];
        }
      });
    };

    checkItem(items.pemasaran, "pemasaran") ||
      checkItem(items.administrasi, "administrasi");

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
    formData.append("type", "sewa");

    try {
      const res = await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      const url = `${ENDPOINT_URL}/list?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_department=${code_dept}&code_icp=${code_icp}&code_project=${code_project}&year=${periode}&code_account=${codeAccount}`;
      const { data } = await MainServices.get(url);

      let a = await generateArrayAttributes(data.data, [
        "month_duration",
        "month_start",
      ]);

      const r = getRows({
        header: getRootHeaderRow(),
        data: a,
      });

      const newRow = [...rows[category]];

      newRow[index] = r;

      const newestCategory = { ...currData }[category];
      newestCategory[index] = a;

      setCurrData((prevState) => {
        return {
          ...prevState,
          [category]: newestCategory,
        };
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
      items,
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

export default Logic;
