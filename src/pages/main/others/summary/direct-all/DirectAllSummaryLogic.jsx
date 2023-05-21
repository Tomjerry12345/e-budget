import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLocal, logO } from "../../../../../values/Utilitas";
import MainServices from "../../../../../services/MainServices";
import { columnOutputType1 } from "../../../../../component/table/utils/TypeColumn";
import { val } from "../../../../../redux/action/action.reducer";
import { getColumns } from "./getColumns";
import { getRows, getRows1 } from "./getRows";
import { data as emptyData } from "./rawData";

const DirectAllSummaryLogic = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const columns = getColumns();
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);

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
      const url = `directall/list?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_department=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${fPeriode}`;
      const { data } = await MainServices.get(url);
      getData(data.data.list, fPeriode);
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const getData = (data, periode) => {
    const newRows = getRows({ data });
    // const slices = newRows.slice(0, 100);
    // logO({ slices });
    setRows(newRows);
    // setLoading(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  return {
    value: {
      form,
      loading,
      columns,
      rows,
    },
    func: {
      onFinish,
    },
  };
};

export default DirectAllSummaryLogic;
