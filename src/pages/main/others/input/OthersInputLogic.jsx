import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { columnInputType1 } from "../../../../component/table/utils/TypeColumn";
import { val } from "../../../../redux/action/action.reducer";
import MainServices from "../../../../services/MainServices";
import { getLocal, log, sumYearTotal } from "../../../../values/Utilitas";

const endPoint = {
  "Input Direct Pendapatan Non Operasional": "othersPNO",
  "Input Direct Biaya Non Operasional": "othersBNO",
};

const eFile = {
  "Input Direct Pendapatan Non Operasional": "file/pno.xlsx",
  "Input Direct Biaya Non Operasional": "file/bno.xlsx",
};

const OthersInputLogic = () => {
  const date = new Date();
  let params = useParams();
  const itemPage = params.item;

  const [form] = Form.useForm();
  const ref = createRef();

  const [dataColumnInput, setDataColumnInput] = useState([]);
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [filter, setFilter] = useState(false);
  const [tahun, setTahun] = useState();
  const [yearFilter, setYearFilter] = useState(date.getFullYear());

  const columns = columnInputType1(yearFilter, parseInt(yearFilter) + 1).map(
    (col) => {
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
    }
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const endPFile = eFile[itemPage];

  const dispatch = useDispatch();

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
  };

  useEffect(() => {
    const company = getLocal("code_company");
    const company_names = getLocal("company_names");

    form.setFieldsValue({
      code_location: null,
      code_dept: null,
      code_product: null,
      code_company: company === "" ? null : `${company} - ${company_names}`,
      code_icp: null,
      code_project: null,
      periode: null,
    });
  }, [itemPage]); // eslint-disable-line react-hooks/exhaustive-deps

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

    setYearFilter(fPeriode);

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
    const url = `${endPoint[itemPage]}/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&periode=${periode}`;
    const { data } = await MainServices.get(url);
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

        const { sum, i } = sumYearTotal(itemparent, keysEdit[0]);

        if (i == 1) {
          itemparent.year1 = sum;
        } else {
          itemparent.year2 = sum;
        }

        newData.splice(x, 1, {
          ...itemold,
          ...itemparent,
        });
      }
    }

    const { sum, i } = sumYearTotal(newData[index], keysEdit[0]);

    if (i == 1) {
      newData[index].year1 = sum;
    } else {
      newData[index].year2 = sum;
    }

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

    const year = i == 1 ? periode : parseInt(periode) + 1;
    const month = row[`${keysEdit}-month`];
    const uuid = row[`${keysEdit}-uuid`];

    if (uuid === null) {
      formData.append("code", row.account);
      formData.append("code_company", code_company);
      formData.append("code_product", code_product);
      formData.append("code_location", code_location);
      formData.append("code_department", code_dept);
      formData.append("code_icp", code_icp);
      formData.append("code_project", code_project);
      formData.append("month", month);
      formData.append("year", year);
    } else {
      formData.append("id", uuid);
    }

    formData.append("value", valuesEdit);

    await MainServices.post(`${endPoint[itemPage]}/update`, formData);
  };

  const onSuccess = () => {
    setUploadSucces(true);
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    let tahun1 = tahun === undefined ? new Date().getFullYear() : tahun;
    console.log("tahun", tahun1);

    setLoadingUpload(true);

    let file1;

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    let formData = new FormData();

    formData.append("file", file1);
    formData.append("year", tahun1);

    try {
      const res = await MainServices.post("others/import", formData);

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
  };

  const onChangeTahun = (e) => {
    setTahun(e);
  };

  return {
    value: {
      dataColumnInput,
      columns,
      params,
      form,
      ref,
      loading,
      getRootProps,
      getInputProps,
      acceptedFiles,
      endPFile,
      filter,
      uploadSucces,
      loadingUpload,
    },
    func: {
      onFinish,
      onUploadFile,
      onChangeTahun,
      setUploadSucces,
    },
  };
};

export default OthersInputLogic;
