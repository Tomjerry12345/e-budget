import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAsync } from "../../../../redux/main/main.thunks";
import { loadStart } from "../../../../redux/response/response";
import { getSizeScreen, log } from "../../../../values/Utilitas";

// const endPoint = {
//   "Opex Direct": "",
// };

const OpexSummaryLogic = () => {
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
      endPoint: "location",
    },
  ];

  const [urlIndex, setUrlIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const [codeCompany, setCodeCompany] = useState(null);

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
    setLoading(true);
    dispatch(getAsync(`opex/summary`, "get-data"));
    // onGetCodeFilter();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    log("response", response);

    if (response !== null) {
      if (nameReducer === "get-data") {
        onGetCodeFilter();
        const { data } = response;
        log("data", data);
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
        onSetColumn(year_1, year_2);
        setLoading(false);
      } else {
        const { data } = response;
        setAllCodeFilter({
          ...allCodeFilter,
          [nameReducer]: data,
        });

        if (codeCompany !== null) {
          let urlComboBox;

          if (urlIndex <= 1) {
            if (urlIndex === 0) {
              urlComboBox = url[urlIndex].endPoint;
            } else {
              urlComboBox = `${url[urlIndex].endPoint}/list-by-com?code_company=${codeCompany}`;
            }
          }

          if (urlComboBox !== undefined) {
            dispatch(getAsync(urlComboBox, url[urlIndex].name));
          }

          setUrlIndex((current) => current + 1);
        }
      }
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = (year_1, year_2) => {
    const constantTableColums = {
      "Summary Budget Opex": [
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
    dispatch(
      getAsync(
        `opex/summary?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`,
        "get-data"
      )
    );
  };

  const onTambahData = () => {
    dispatch(loadStart());
    navigate(`/main/opex/Input/${itemPage}`);
  };

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", JSON.stringify(values));
    onSetDataTable(values);
  };

  const onGetCodeFilter = () => {
    dispatch(getAsync("company/list-master", "code_company"));
  };

  const onChange = (e) => {
    const urlComboBox = `product/list-by-com?code_company=${e}`;
    setCodeCompany(e);
    dispatch(getAsync(urlComboBox, "code_product"));
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
      onChange,
    },
  };
};

export default OpexSummaryLogic;
