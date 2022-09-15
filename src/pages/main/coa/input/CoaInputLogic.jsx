import { Button, Dropdown, Menu, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { constantDataTable } from "./ConstantInput";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "edit",
      },
      {
        key: "2",
        label: "hapus",
      },
    ]}
  />
);

const CoaInputLogic = () => {
  let params = useParams();
  const itemPage = params.item;

  const [count, setCount] = useState(2);

  const [tableColumn, setTableColumn] = useState([]);

  const dataTable = constantDataTable[itemPage];
  const [dataColumn, setDataColumn] = useState(dataTable);

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
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
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
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
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
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
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
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
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
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
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
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
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
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
  };

  useEffect(() => {
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
    setDataColumn(dataTable);
  }, [params.item]);

  const handleDelete = (key) => {
    const newData = dataColumn.filter((item) => item.key !== key);
    setDataColumn(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataColumn([...dataColumn, newData]);
    setCount(count + 1);
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
  };
};

export default CoaInputLogic;
