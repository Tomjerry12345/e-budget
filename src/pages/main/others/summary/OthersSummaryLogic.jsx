import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import { getAsync } from "../../../../redux/main/main.thunks";
import { loadStart } from "../../../../redux/response/response";
import MainServices from "../../../../services/MainServices";
import { getSizeScreen, log } from "../../../../values/Utilitas";

const endPoint = {
  "Summary Pendapatan Non Operasional": "othersPNO",
  "Summary Biaya Non Operasional": "othersBNO",
};

const OthersSummaryLogic = () => {
  let params = useParams();

  const ref = createRef();

  const [form] = Form.useForm();

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

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
    form.setFieldsValue({
      code_location: null,
      code_dept: null,
      code_product: null,
      code_company: null,
      code_icp: null,
      code_project: null,
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
  }, [itemPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetDataTable = async (values) => {
    // setDataColumn(constantDataTable[itemPage]);
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_icp,
      code_project,
    } = values;

    let url;
    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];

    url = `${endPoint[itemPage]}/summary?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}`;

    log("url", url);

    const { data } = await MainServices.get(url);

    log("data", data);

    getData(data.data);
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

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
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
    },
  };
};

export default OthersSummaryLogic;
