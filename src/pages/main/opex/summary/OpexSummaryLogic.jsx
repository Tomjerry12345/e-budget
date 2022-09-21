import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAsync } from "../../../../redux/main/main.thunks";
import { loadStart } from "../../../../redux/response/response";
import { getSizeScreen } from "../../../../values/Utilitas";

// const endPoint = {
//   "Opex Direct": "",
// };

const constantDataTable = {
  "Opex Direct": [
    {
      key: 0,
      code_company: "001",
      code_parent: "32",
      description: "lorem ipsum 0",
    },
    {
      key: 1,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 2,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 3,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 4,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 5,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 6,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 7,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 8,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 9,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
    {
      key: 10,
      code_company: "002",
      code_parent: "32",
      description: "lorem ipsum 1",
    },
  ],
};

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

  // const updateSize = () =>
  //   setSize({
  //     x: window.innerWidth,
  //     y: window.innerHeight,
  //   });

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);

    // onSetDataTable();
  }, [params.item, dataColumn]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(`dataColumn => ${JSON.stringify(dataColumn)}`);

  useEffect(() => {
    // console.log(`response => ${JSON.stringify(response)}`);
    if (response !== null) {
      const { data } = response;
      let list = [];
      let year_1 = "";
      let year_2 = "";

      data.list?.map((val) => {
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
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = (year_1, year_2) => {
    console.log(`year_1 => ${year_1}`);
    const constantTableColums = {
      "Opex Direct": [
        {
          title: "Account",
          dataIndex: "account",
          width: "3%",
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
          width: "2%",
          fixed: "right",
        },
        {
          title: `Year ${year_2}`,
          dataIndex: "value_2",
          width: "2%",
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
        `opex/summary?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`
      )
    );
  };

  const handleSave = (row) => {
    const newData = [...dataColumn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataColumn(newData);
  };

  const onTambahData = () => {
    dispatch(loadStart());
    navigate(`/main/opex/Input/${itemPage}`);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    onSetDataTable(values);
    // let formData = new FormData();
    // formData.append("username", values.username);
    // formData.append("password", values.password);
  };

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
      size,
      ref,
      form,
    },
    func: {
      onTambahData,
      onFinish,
    },
  };
};

export default OpexSummaryLogic;
