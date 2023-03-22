import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import { val } from "../../../../redux/action/action.reducer";
import MainServices from "../../../../services/MainServices";
import { getLocal, getSizeScreen } from "../../../../values/Utilitas";

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
  const itemPage = params.item;
  const singleMenuCapex = menuCapex[itemPage];

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const [tableColumn, setTableColumn] = useState(null);
  const [dataColumn, setDataColumn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [codeFilter, setCodeFilter] = useState();

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);

    const company = getLocal("code_company");
    const company_names = getLocal("company_names");

    form.setFieldsValue({
      code_location: null,
      code_dept: null,
      code_product: null,
      code_company: company === "" ? null : `${company} - ${company_names}`,
      code_icp: null,
      code_project: null,
    });
  }, [itemPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
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

    try {
      const url = `${singleMenuCapex}/summary?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_department=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${fPeriode}`;
      const { data } = await MainServices.get(url);
      getData(data.data, fPeriode);
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }

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

  const getData = (data, periode) => {
    setDataColumn(data.list);
    setTableColumn(columnOutputType1(periode, parseInt(periode) + 1));
    setLoading(false);
  };

  const downloadFile = () => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_icp,
      code_project,
      periode,
    } = codeFilter;
    const urlFile = `https://apikalla.binaries.id/ebudget/report/tablereport?code_company=${code_company}&code_location=${code_location}&code_department=${code_dept}&code_product=${code_product}`;
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
      onFinish,
      downloadFile,
    },
  };
};

export default CapexSummaryLogic;
