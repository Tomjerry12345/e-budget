import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  actionImport,
  resetDataActionImport,
  val,
} from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { getRootHeaderRow, fullNewRow, getRows } from "./getRows";
import { generateArrayAttributes } from "values/react-grid/helpers";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [currId, setCurrId] = useState(null);
  const [currSubGradeId, setCurrSubGradeId] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);
  const [currData, setCurrData] = useState();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "detail-mpp/uniform-safety";

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
      code_department: fCodeDept,
      code_location: fCodeLocation,
      code_product: fCodeProduct,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
      year: fPeriode,
    });
  };

  const getData = async (
    codeCompany,
    codeProduct,
    codeLocation,
    codeDept,
    codeIcp,
    codeProject,
    year
  ) => {
    const url = `${ENDPOINT_URL}?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${year}`;
    try {
      const { data } = await MainServices.get(url);
      let r, a;
      if (data.data.length > 0) {
        a = await generateArrayAttributes(data.data, ["budget", "forecast"]);
        r = getRows({
          data: a,
        });
        setCurrData(a);
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

  const applyChanges = (changes, prevDetails) => {
    const newRows = [...rows];
    changes.forEach((change, i) => {
      const rowIndex = newRows.findIndex((j) => j.rowId === change.rowId);
      const dataRowId = change.rowId;
      const fieldName = change.columnId;
      const subGradeId = newRows[rowIndex].subGradeId;
      let dataRow = dataRowId
        ? prevDetails.find((d) => d.id === dataRowId)
          ? prevDetails.find((d) => d.id === dataRowId)
          : prevDetails.find((el) => el.sub_grade.id === subGradeId)
        : prevDetails.find((el) => el.sub_grade.id === subGradeId);

      setCurrId(prevDetails.find((d) => d.id === dataRowId)?.id ?? null);
      setCurrSubGradeId(subGradeId);

      if (change.type === "text") {
        dataRow[fieldName] = change.newCell.text;
        onUpdateData({
          id: currId,
          column_id: fieldName,
          value: change.newCell.text,
          subGradeId,
        });
      } else if (change.type === "number") {
        let value = change.newCell.value;
        dataRow[fieldName] = value;
        onUpdateData({
          id: currId,
          column_id: fieldName,
          value,
          subGradeId,
        });
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
        onUpdateData({
          id: currId,
          column_id: fieldName,
          value: change.newCell.checked,
          subGradeId,
        });
      } else if (change.type === "dropdown") {
        let key = `is_${fieldName}`;
        if (
          change.previousCell.selectedValue !== change.newCell.selectedValue
        ) {
          dataRow[fieldName] = change.newCell.selectedValue;

          onUpdateData({
            id: currId,
            column_id: fieldName,
            value: change.newCell.selectedValue,
            subGradeId,
          });
        }

        if (change.newCell.inputValue) {
          dataRow[fieldName] = change.newCell.inputValue;
          onUpdateData({
            id: currId,
            column_id: fieldName,
            value: change.newCell.inputValue,
            subGradeId,
          });
        }

        // CHANGED: set the isOpen property to the value received.
        dataRow[key] = change.newCell.isOpen;
      } else {
        log("ERROR", change.type);
      }
    });

    return [...prevDetails];
  };

  const onChangeTable = (change) => {
    setCurrData((prevState) => applyChanges(change, prevState));
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

  const onSuccess = () => {
    dispatch(resetDataActionImport());
    acceptedFiles.length = 0;
  };

  const onUpdateData = async (cell) => {
    if (Object.keys(cell).length === 4) {
      try {
        const formData = new FormData();
        let res, id;

        if (!currId) {
          for (let item in codeFilter) {
            formData.append(item, codeFilter[item]);
          }
          formData.append(cell.column_id, cell.value);
          formData.append("sub_grade_id", cell.subGradeId);
          res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);
          if (res.data.data.id) {
            id = res.data.data.id;
            setCurrId(id);
          }
        } else {
          formData.append("value", cell["value"]);
          formData.append("column_id", cell["column_id"]);
          formData.append("id", currId ?? cell["id"]);
          res = await MainServices.post(`${ENDPOINT_URL}/update`, formData);
        }

        if (res && res.data.responseCode === 200) {
          showNotif(200, "Sukses update data");
        } else {
          showNotif(500, "Error");
        }
      } catch (e) {
        log({ e });
      }
    }
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
      code_department,
      code_icp,
      code_project,
      year,
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
    // temp disable type ("unknown" type)
    // formData.append("type", "asuransi");
    for (let item in codeFilter) {
      formData.append(item, codeFilter[item]);
    }

    try {
      const res = await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      const url = `${ENDPOINT_URL}/list?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_department=${code_department}&code_icp=${code_icp}&code_project=${code_project}&year=${year}&code_account=${codeAccount}`;
      const { data } = await MainServices.get(url);
      let a = await generateArrayAttributes(data.data, ["budget", "forecast"]);

      const r = getRows({
        header: getRootHeaderRow(),
        data: a,
      });

      // const newRow = [...rows];

      // newRow[index] = r;

      // setRows({
      //   ...rows,
      //   [category]: newRow,
      // });
      setRows(r);
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
    },
  };
};

export default Logic;
