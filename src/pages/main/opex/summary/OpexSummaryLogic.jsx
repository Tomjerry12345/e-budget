import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import { val } from "../../../../redux/action/action.reducer";
import MainServices from "../../../../services/MainServices";
import { getSizeScreen } from "../../../../values/Utilitas";

const OpexSummaryLogic = () => {
  let params = useParams();
  const ref = createRef();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const [tableColumn, setTableColumn] = useState(null);
  const [dataColumn, setDataColumn] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
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
      const url = `opex/summary?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_department=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${fPeriode}`;
      const { data } = await MainServices.get(url);
      getData(data.data, fPeriode);
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const getData = (data, periode) => {
    setDataColumn(data.list);
    setTableColumn(columnOutputType1(periode, parseInt(periode) + 1));
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

export default OpexSummaryLogic;
