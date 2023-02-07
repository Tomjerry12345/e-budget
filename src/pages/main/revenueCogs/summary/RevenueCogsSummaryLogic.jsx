import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import { getAsync } from "../../../../redux/main/main.thunks";
import { loadStart } from "../../../../redux/response/response";
import MainServices from "../../../../services/MainServices";
import { getSizeScreen, log, logObj } from "../../../../values/Utilitas";

// const endPoint = {
//   "revenueandcogs Direct": "",
// };

const RevenueCogsSummaryLogic = () => {
  let params = useParams();

  const ref = createRef();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const { isLoading, response, errorMessage, nameReducer } = useSelector(
    (state) => state.reducer
  );

  const navigate = useNavigate();

  const itemPage = params.item;

  const [tableColumn, setTableColumn] = useState(null);

  const [dataColumn, setDataColumn] = useState([]);

  const [codeFilter, setCodeFilter] = useState();

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    logObj("response", response);
    if (response !== null) {
      if (nameReducer === "get-data") {
        const { data } = response;
        // let list = [];
        // let year_1 = "";
        // let year_2 = "";

        // data?.list?.forEach((val) => {
        //   year_1 = val.detail[0].year;
        //   year_2 = val.detail[1].year;
        //   const v1 = parseInt(val.detail[0].value).format(0, 3, ".", ",");
        //   const v2 = parseInt(val.detail[1].value).format(0, 3, ".", ",");
        //   list.push({
        //     account: val.account,
        //     description: val.description,
        //     value_1: v1,
        //     value_2: v2,
        //   });
        // });
        setDataColumn(data.list);
        onSetColumn();
        setLoading(false);
      }
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = () => {
    // const constantTableColums = [
    //   {
    //     title: "Account",
    //     dataIndex: "account",
    //     width: "4%",
    //     fixed: "left",
    //   },
    //   {
    //     title: "Description",
    //     dataIndex: "description",
    //     width: "30%",
    //   },
    //   {
    //     title: `Year ${year_1}`,
    //     dataIndex: "value_1",
    //     width: "4%",
    //     fixed: "right",
    //   },
    //   {
    //     title: `Year ${year_2}`,
    //     dataIndex: "value_2",
    //     width: "4%",
    //     fixed: "right",
    //   },
    //   // {
    //   //   dataIndex: "operation",
    //   //   fixed: "right",
    //   //   width: "5%",
    //   //   render: (_, record) =>
    //   //     dataColumn.length >= 1 ? (
    //   //       <Dropdown overlay={menu} placement="bottom">
    //   //         <Button icon={<MoreVertIcon />}></Button>
    //   //       </Dropdown>
    //   //     ) : null,
    //   // },
    // ];

    const dt = new Date()

    const columns = columnOutputType1(dt.getFullYear(), dt.getFullYear() + 1);

    setTableColumn(columns);
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
    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    let periode = "2023"

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];

    url = `revenueandcogs/summary?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${periode}`;

    log("url", url);

    // dispatch(getAsync(url, "get-data"));

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
      periode: periode
    });

  };

  const getData = (data) => {
    setDataColumn(data.list);

    const dt = new Date()

    setTableColumn(columnOutputType1(dt.getFullYear(), dt.getFullYear() + 1));
    setLoading(false);
  };

  const onTambahData = () => {
    dispatch(loadStart());
    navigate(`/main/revenue-cogs/Input/${itemPage}`);
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
      onTambahData,
      onFinish,
    },
  };
};

export default RevenueCogsSummaryLogic;
