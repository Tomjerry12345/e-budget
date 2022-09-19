import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  ],
};

const OpexSummaryLogic = () => {
  let params = useParams();

  const itemPage = params.item;

  const [tableColumn, setTableColumn] = useState([]);

  const [dataColumn, setDataColumn] = useState([]);

  const constantTableColums = {
    "Opex Direct": [
      {
        title: "Kode Company",
        dataIndex: "code_company",
        editable: true,
        width: "10%",
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "code_parent",
        editable: true,
        width: "10%",
      },
      {
        title: "Description",
        dataIndex: "description",
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

  useEffect(() => {
    console.log(`paramsItem => ${itemPage}`);
    onSetColumn();
    onSetDataTable();
  }, [params.item]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = () => {
    const columns = constantTableColums[itemPage].map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    });

    setTableColumn(columns);
  };

  const onSetDataTable = () => {
    setDataColumn(constantDataTable[itemPage]);
  };

  const handleSave = (row) => {
    const newData = [...dataColumn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataColumn(newData);
  };

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
    },
    func: {},
  };
};

export default OpexSummaryLogic;
