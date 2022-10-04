import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAsync } from "../../../../redux/main/main.thunks";
import { loadStart } from "../../../../redux/response/response";
import { getSizeScreen, log } from "../../../../values/Utilitas";

const endPoint = {
  "Pendapatan Non Operasional": "othersPNO",
};

const OthersSummaryLogic = () => {
  let params = useParams();

  const ref = createRef();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const { isLoading, response, errorMessage, nameReducer } = useSelector((state) => state.reducer);

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

  const [allCodeFilter, setAllCodeFilter] = useState({
    code_company: [],
    code_dept: [],
    code_location: [],
    code_product: [],
    code_account: [],
  });

  const url = [
    {
      name: "code_dept",
      endPoint: "dept/list",
    },
    {
      name: "code_location",
      endPoint: "location/list",
    },
    {
      name: "code_product",
      endPoint: "product/list",
    },
  ];

  const [urlIndex, setUrlIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
    setLoading(true);
    dispatch(getAsync(`${endPoint[itemPage]}/summary`, "get-data"));
    // onGetCodeFilter();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (response !== null) {
      if (nameReducer === "get-data") {
        onGetCodeFilter();
        const { data } = response;
        log("response", response);
        log("data", data);
        let list = [];
        let year_1 = "";
        let year_2 = "";

        data?.list?.forEach((val) => {
          year_1 = val.detail[0].year;
          year_2 = val.detail[1].year;
          list.push({
            account: val.account,
            description: val.description,
            value_1: val.detail[0].value,
            value_2: val.detail[1].value,
          });
        });
        setDataColumn(list);
        onSetColumn(year_1, year_2);
        setLoading(false);
      } else {
        const { data } = response;
        setAllCodeFilter({
          ...allCodeFilter,
          [nameReducer]: data,
        });

        if (urlIndex <= 2) {
          dispatch(getAsync(url[urlIndex].endPoint, url[urlIndex].name));
        }

        setUrlIndex((current) => current + 1);
      }
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = (year_1, year_2) => {
    const constantTableColums = {
      "Pendapatan Non Operasional": [
        {
          title: "Account",
          dataIndex: "account",
          width: "4%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
        },
        {
          title: `Year ${year_1}`,
          dataIndex: "value_1",
          width: "4%",
          fixed: "right",
        },
        {
          title: `Year ${year_2}`,
          dataIndex: "value_2",
          width: "4%",
          fixed: "right",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
    };

    const columns = constantTableColums[itemPage];

    setTableColumn(columns);
  };

  const onSetDataTable = (values) => {
    // setDataColumn(constantDataTable[itemPage]);
    const { code_company, code_dept, code_location, code_product } = values;
    dispatch(getAsync(`${endPoint[itemPage]}/summary?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`, "get-data"));
  };

  const onTambahData = () => {
    dispatch(loadStart());
    navigate(`/main/others/Input/${itemPage}`);
  };

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", JSON.stringify(values));
    onSetDataTable(values);
  };

  const onGetCodeFilter = () => {
    dispatch(getAsync("company/list", "code_company"));
  };

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
      size,
      ref,
      form,
      allCodeFilter,
      loading,
    },
    func: {
      onTambahData,
      onFinish,
    },
  };
};

export default OthersSummaryLogic;
