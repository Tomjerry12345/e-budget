import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import { getAsync } from "../../../../redux/main/main.thunks";
import { loadStart } from "../../../../redux/response/response";
import MainServices from "../../../../services/MainServices";
import { getSizeScreen, log } from "../../../../values/Utilitas";

const menuCapex = {
  "Summary Total Aset": "capexAset",
  "Summary Total Penyusutan": "capexPenyusutan",
  "Summary Total Akumulasi Penyusutan": "capexAkumulasi",
};

const CapexSummaryLogic = () => {
  let params = useParams();

  const ref = createRef();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const itemPage = params.item;

  const [tableColumn, setTableColumn] = useState(null);

  const [dataColumn, setDataColumn] = useState([
    {
      account: "",
      description: "",
      year_1: "",
      year_2: "",
      value_1: 0,
      value_2: 0,
    },
  ]);

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [loading, setLoading] = useState(false);
  const [codeFilter, setCodeFilter] = useState();

  const singleMenuCapex = menuCapex[itemPage];

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
    form.setFieldsValue({
      code_location: null,
      code_dept: null,
      code_product: null,
      code_company: null,
      periode: null,
    });

    setDataColumn({
      account: "",
      description: "",
      year_1: "",
      year_2: "",
      value_1: 0,
      value_2: 0,
    });

    form.setFieldsValue({
      code_location: null,
      code_dept: null,
      code_product: null,
      code_company: null,
    });
  }, [itemPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const onTambahData = () => {
    dispatch(loadStart());
    navigate(`/main/capex/Input/${itemPage}`);
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onSetDataTable = async (values) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_icp,
      code_project,
    } = values;

    let url;

    let fCodeCompany = code_company.replace(/[^0-9]/g, "");
    let fCodeProduct = code_product.replace(/[^0-9]/g, "");
    let fCodeLocation = code_location.replace(/[^0-9]/g, "");
    let fCodeDept = code_dept.replace(/[^0-9]/g, "");
    let fCodeIcp = code_icp.replace(/[^0-9]/g, "");
    let fCodeProject = code_project.replace(/[^0-9]/g, "");

    fCodeProduct = fCodeProduct === "" ? "all" : fCodeProduct;
    fCodeLocation = fCodeLocation === "" ? "all" : fCodeLocation;
    fCodeDept = fCodeDept === "" ? "all" : fCodeDept;
    fCodeIcp = fCodeIcp === "" ? "all" : fCodeIcp;
    fCodeProject = fCodeProject === "" ? "all" : fCodeProject;

    log("fCodeProduct", fCodeProduct);

    url = `${singleMenuCapex}/summary?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}`;

    log("url", url);

    const { data } = await MainServices.get(url);

    log("data", data);

    getData(data.data);

    setCodeFilter({
      code_company: fCodeCompany,
      code_dept: fCodeDept,
      code_location: fCodeLocation,
      code_product: fCodeProduct,
      code_product: fCodeProduct,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
    });
  };

  const getData = (data) => {
    let list = [];
    let year_1 = "";
    let year_2 = "";

    data?.list?.forEach((val) => {
      year_1 = val.detail[0].year;
      year_2 = val.detail[1].year;
      const v1 = parseInt(val.detail[0].value).format(0, 3, ".", ",");
      const v2 = parseInt(val.detail[1].value).format(0, 3, ".", ",");
      list.push({
        account: val.account,
        description: val.description,
        value_1: v1,
        value_2: v2,
      });
    });
    setDataColumn(list);
    setTableColumn(columnOutputType1(year_1, year_2));
    setLoading(false);
  };

  const downloadFile = () => {
    const { code_company, code_dept, code_location, code_product } = codeFilter;
    const urlFile = `https://apikalla.binaries.id/ebudget/report/tablereport?code_company=${code_company}&code_location=${code_location}&code_dept=${code_dept}&code_product=${code_product}`;
    window.location.href = urlFile;
  };

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
      size,
      ref,
      form,
      loading,
    },
    func: {
      onTambahData,
      onFinish,
      downloadFile,
    },
  };
};

export default CapexSummaryLogic;
