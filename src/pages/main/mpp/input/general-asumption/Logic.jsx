import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { getRootHeaderRow, getRows } from "./getRows";
import { generateObjectAttributes } from "values/react-grid/helpers";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);
  const [currData, setCurrData] = useState();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "detail-mpp/general-assumption";

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
      let r, a;
      a = await generateObjectAttributes(data.data, [
        "thr_period",
        "thr_period_p",
        "bonus_period",
        "bonus_period_p",
      ]);

      r = getRows({
        data: a,
      });
      setRows(r);
      setCurrData(a);
    } catch (error) {
      // Tangani error jika ada
      console.error(`Error fetching data for code account`, error);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  // REFACTOR: func fetch api when using the dropdown cell and fetch api per type
  const onUpdateData = async (cell) => {
    if (Object.keys(cell).length === 3) {
      try {
        const formData = new FormData();
        for (var item in cell) {
          formData.append(item, cell[item]);
        }
        const res = await MainServices.post(`${ENDPOINT_URL}/update`, formData);

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

  const applyChanges = (changes, prevDetails) => {
    let newRows = [...rows];
    changes.forEach((change) => {
      const rowIndex = newRows.findIndex((j) => j.rowId === change.rowId);
      const columnIndex = parseInt(columns.findIndex((j) => j.columnId === change.columnId));

      const id = newRows[rowIndex].id;
      const key = columnIndex === 1 ? "forecast" : "budget";
      const column_id = newRows[rowIndex][key];

      if (change.type === "text") {
        prevDetails[column_id] = change.newCell.text;
        onUpdateData({
          id,
          column_id,
          value: change.newCell.text,
        });
      } else if (change.type === "number") {
        prevDetails[column_id] = change.newCell.value;
        onUpdateData({
          id,
          column_id,
          value: change.newCell.value,
        });
      } else if (change.type === "checkbox") {
        prevDetails[column_id] = change.newCell.checked;
        onUpdateData({
          id,
          column_id,
          value: change.newCell.checked,
        });
      } else if (change.type === "dropdown") {
        let key = `is_${column_id}`;
        if (change.previousCell.selectedValue !== change.newCell.selectedValue) {
          prevDetails[column_id] = change.newCell.selectedValue;

          onUpdateData({
            id,
            column_id,
            value: change.newCell.selectedValue,
          });
        }

        if (change.newCell.inputValue) {
          prevDetails[column_id] = change.newCell.inputValue;
          onUpdateData({
            id,
            column_id,
            value: change.newCell.inputValue,
          });
        }

        // CHANGED: set the isOpen property to the value received.
        prevDetails[key] = change.newCell.isOpen;
      } else {
        console.log("ERROR", change.type);
      }
    });

    return { ...prevDetails };
  };

  useEffect(() => {
    if (currData) {
      setRows(
        getRows({
          data: currData,
        })
      );
    }
  }, [currData]);

  const onChangeTable = (change) => {
    setCurrData((prevState) => applyChanges(change, prevState));
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
