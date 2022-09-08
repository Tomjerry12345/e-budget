import { Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { log } from "../../../../values/Utilitas";
import { constantDataTable } from "./ConstantInput";

const CoaInputLogic = () => {
  let params = useParams();

  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      kode_company: "Edward King 0",
      kode_parent: "32",
      description: "32",
    },
    {
      key: "1",
      kode_company: "Edward King 0",
      kode_parent: "32",
      description: "32",
    },
    {
      key: "2",
      kode_company: "Edward King 0",
      kode_parent: "32",
      description: "32",
    },
  ]);

  const [count, setCount] = useState(2);

  const [tableColumn, setTableColumn] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);

  const constantTableColums = {
    "Kode perusahaan": [
      {
        title: "Kode Company",
        dataIndex: "kode_company",
        editable: true,
        width: "10%",
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "kode_parent",
        editable: true,
        width: "20%",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "operation",
        dataIndex: "operation",
        fixed: "right",
        width: "10%",
        render: (_, record) =>
          dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ],
    "Kode produk": [
      {
        title: "Kode Produk",
        dataIndex: "kode_produk",
        width: "20%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "kode_parent",
        width: "10%",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
        editable: true,
      },
      {
        title: "HSI",
        dataIndex: "hsi",
        width: "5%",
        editable: true,
      },
      {
        title: "HK",
        dataIndex: "hk",
        width: "5%",
        editable: true,
      },
      {
        title: "BSU",
        dataIndex: "bsu",
        width: "5%",
        editable: true,
      },
      {
        title: "KIA",
        dataIndex: "kia",
        width: "5%",
        editable: true,
      },
      {
        title: "BLT",
        dataIndex: "blt",
        width: "5%",
        editable: true,
      },
      {
        title: "BJU",
        dataIndex: "bju",
        width: "5%",
        editable: true,
      },
      {
        title: "BSB",
        dataIndex: "bsb",
        width: "5%",
        editable: true,
      },
      {
        title: "BAD",
        dataIndex: "bad",
        width: "5%",
        editable: true,
      },
      {
        title: "KIK",
        dataIndex: "kik",
        width: "5%",
        editable: true,
      },
      {
        title: "KKI",
        dataIndex: "kki",
        width: "5%",
        editable: true,
      },
      {
        title: "BLU",
        dataIndex: "blu",
        width: "5%",
        editable: true,
      },
      {
        title: "IKP",
        dataIndex: "ikp",
        width: "5%",
        editable: true,
      },
      {
        title: "BK",
        dataIndex: "bk",
        width: "5%",
        editable: true,
      },
      {
        title: "BBU",
        dataIndex: "bbu",
        width: "5%",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        width: "10%",
        fixed: "right",
        render: (_, record) =>
          constantTableColums[params.item].length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ],
    "Kode lokasi": [
      {
        title: "Kode Produk",
        dataIndex: "kode_produk",
        width: "20%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "kode_parent",
        width: "10%",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
        editable: true,
      },
      {
        title: "HSI",
        dataIndex: "hsi",
        width: "5%",
        editable: true,
      },
      {
        title: "HK",
        dataIndex: "hk",
        width: "5%",
        editable: true,
      },
      {
        title: "BSU",
        dataIndex: "bsu",
        width: "5%",
        editable: true,
      },
      {
        title: "KIA",
        dataIndex: "kia",
        width: "5%",
        editable: true,
      },
      {
        title: "BLT",
        dataIndex: "blt",
        width: "5%",
        editable: true,
      },
      {
        title: "BJU",
        dataIndex: "bju",
        width: "5%",
        editable: true,
      },
      {
        title: "BSB",
        dataIndex: "bsb",
        width: "5%",
        editable: true,
      },
      {
        title: "BAD",
        dataIndex: "bad",
        width: "5%",
        editable: true,
      },
      {
        title: "KIK",
        dataIndex: "kik",
        width: "5%",
        editable: true,
      },
      {
        title: "KKI",
        dataIndex: "kki",
        width: "5%",
        editable: true,
      },
      {
        title: "BLU",
        dataIndex: "blu",
        width: "5%",
        editable: true,
      },
      {
        title: "IKP",
        dataIndex: "ikp",
        width: "5%",
        editable: true,
      },
      {
        title: "BK",
        dataIndex: "bk",
        width: "5%",
        editable: true,
      },
      {
        title: "BBU",
        dataIndex: "bbu",
        width: "5%",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        width: "10%",
        fixed: "right",
        render: (_, record) =>
          constantTableColums[params.item].length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ],
    "Kode departemen": [
      {
        title: "Kode Dept",
        dataIndex: "kode_dept",
        width: "30%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        fixed: "right",
        render: (_, record) =>
          dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ],
    "Kode akun": [
      {
        title: "Type Akun",
        dataIndex: "type_akun",
        width: "30%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Akun",
        dataIndex: "kode_akun",
        editable: true,
      },
      {
        title: "Akun Induk",
        dataIndex: "akun_induk",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        editable: true,
      },
    ],
    "Kode projek": [
      {
        title: "Kode Project",
        dataIndex: "kode_project",
        // width: "20%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "kode_parent",
        // width: "5%",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
        editable: true,
      },
      {
        title: "BJU",
        dataIndex: "bju",
        editable: true,
      },
      {
        title: "BSB",
        dataIndex: "bsb",
        editable: true,
      },
      {
        title: "KIK",
        dataIndex: "kik",
        editable: true,
      },
      {
        title: "BARUGA",
        dataIndex: "baruga",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        fixed: "right",
        //   render: (_, record) =>
        //     dataSource.length >= 1 ? (
        //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
        //         <a>Delete</a>
        //       </Popconfirm>
        //     ) : null,
      },
    ],
    "Kode ICP": [
      {
        title: "Kode ICP",
        dataIndex: "kode_icp",
        width: "30%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        fixed: "right",
        //   render: (_, record) =>
        //     dataSource.length >= 1 ? (
        //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
        //         <a>Delete</a>
        //       </Popconfirm>
        //     ) : null,
      },
    ],
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];

    console.log(`item => ${JSON.stringify(item)}`);
    console.log(`key => ${row.key}`);
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  useEffect(() => {
    const itemPage = params.item;
    log(`params => ${itemPage}`);
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

    const dataTable = constantDataTable[itemPage];

    setDataColumn(dataTable);
    setTableColumn(columns);
  }, [params.item]);

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
    },
  };
};

export default CoaInputLogic;
