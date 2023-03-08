import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { columnInputType1 } from "../../../../component/table/utils/TypeColumn";
import { val } from "../../../../redux/action/action.reducer";
import MainServices from "../../../../services/MainServices";
import { log, sumYearTotal } from "../../../../values/Utilitas";

const MppInputLogic = () => {
  let params = useParams();

  const [dataColumnInput, setDataColumnInput] = useState([]);

  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [filter, setFilter] = useState(false);
  const [tahun, setTahun] = useState();

  const date = new Date();

  const year = date.getFullYear();

  const columns = columnInputType1(year, year + 1).map((col) => {
    if (!col.editable) {
      return col;
    }

    let newCol = {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };

    if (col.children) {
      newCol.children = col.children.map((t) => {
        return {
          ...t,
          onCell: (record) => ({
            record,
            editable: t.editable,
            dataIndex: t.dataIndex,
            title: t.title,
            handleSave,
          }),
        };
      });
    }

    return newCol;
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const dispatch = useDispatch();

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
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

    // alert("test");

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
    const url = `mpp/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_dept=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&periode=${periode}`;

    const { data } = await MainServices.get(url);

    log("data", data);

    getDataTable(data);

    setLoading(false);
  };

  const getDataTable = (response) => {
    const { data } = response;

    const list = [];

    data.list.forEach((val, i) => {
      list.push({ ...val, key: i });
    });

    setDataColumnInput(list);
  };

  const onFinish = (values) => {
    setFilter(false);
    setLoading(true);
    onSetDataTable(values);
  };

  const handleSave = async (row, keysEdit, valuesEdit) => {
    const newData = [...dataColumnInput];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    const oldValue = item[`${keysEdit}`];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    for (let x = index - 1; x >= 0; x--) {
      if (newData[x].parent === true) {
        const itemparent = newData[x];
        const itemold = newData[x];
        itemparent[`${keysEdit}`] =
          parseInt(itemparent[`${keysEdit}`]) +
          parseInt(valuesEdit) -
          parseInt(oldValue);

        itemparent.year1 = sumYearTotal(itemparent, keysEdit[0]);

        newData.splice(x, 1, {
          ...itemold,
          ...itemparent,
        });
      }
    }

    newData[index].year1 = sumYearTotal(newData[index], keysEdit[0]);

    setDataColumnInput(newData);

    let formData = new FormData();
    const {
      code_company,
      code_product,
      code_location,
      code_dept,
      code_icp,
      code_project,
      periode,
    } = codeFilter;
    const year = periode;
    const month = row[`${keysEdit[0]}-month`];
    const uuid = row[`${keysEdit[0]}-uuid`];

    if (uuid === null) {
      formData.append("code", row.account);
      formData.append("code_company", code_company);
      formData.append("code_product", code_product);
      formData.append("code_location", code_location);
      formData.append("code_dept", code_dept);
      formData.append("code_icp", code_icp);
      formData.append("code_project", code_project);
      formData.append("month", month);
      formData.append("year", year);
    } else {
      formData.append("uuid", uuid);
    }

    formData.append("value", valuesEdit);

    const response = await MainServices.post("mpp/update", formData);

    log("response-update", response);
  };

  const onSuccess = () => {
    setUploadSucces(true);
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    setLoadingUpload(true);

    let file1;
    let tahun1 = tahun === undefined ? new Date().getFullYear() : tahun;
    console.log("tahun", tahun1);

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    let formData = new FormData();

    formData.append("file", file1);
    formData.append("year", tahun1);

    try {
      const res = await MainServices.post("mpp/import", formData);

      log("res", res);

      if (codeFilter !== undefined) {
        const { code_company, code_dept, code_location, code_product } =
          codeFilter;

        getData(code_company, code_product, code_location, code_dept);
      }

      responseShow(res);

      setLoadingUpload(false);

      onSuccess();
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }

    // navigate(0);
  };

  const onChangeTahun = (e) => {
    console.log("tahun", e);
    setTahun(e);
  };

  return {
    value: {
      dataColumnInput,
      columns,
      params,
      loading,
      loadingUpload,
      getRootProps,
      getInputProps,
      acceptedFiles,
      filter,
      uploadSucces,
    },
    func: {
      onFinish,
      onSuccess,
      onUploadFile,
      onChangeTahun,
      setUploadSucces,
    },
  };
};

export default MppInputLogic;
