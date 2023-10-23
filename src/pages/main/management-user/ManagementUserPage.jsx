import { Button, Form, Input, Pagination, Table } from "antd";
import Logic from "./Logic";
import "./style.scss";
import ModalManagementUser from "./modal/ModalManagementUser";
import { Box } from "@mui/material";
import HeaderManagementUser from "./header/HeaderManagementUser";
import FormItem from "antd/es/form/FormItem";
import { SearchOutlined } from "@ant-design/icons";

const ManagementUserPage = () => {
  const { value, func } = Logic();

  return (
    <div className="style-management-user">
      <HeaderManagementUser titleHeader="Management user" onOpenModal={func.onOpenModal} />
      <div className="custom-root-layout">
        {/* <Button className="btn-tambah-user" onClick={func.onOpenModal} type="primary">
          Tambah User
        </Button> */}
        <Form layout="horizontal" onFinish={func.onSearch} form={value.form}>
          <FormItem
            className="form-search"
            name="search"
            children={
              <Input
                allowClear
                placeholder="Cari berdasarkan nik / nama"
                prefix={<SearchOutlined />}
              />
            }
          />
          <Form.Item>
            <Button className="btn-search" type="primary" htmlType="submit">
              Cari
            </Button>
          </Form.Item>

          <Form.Item>
            <Button className="btn-reset" type="primary" onClick={func.onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowClassName={() => "editable-row"}
          bordered
          dataSource={value.dataSource}
          columns={value.columns}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 13,
          }}
          rowKey="id"
        />
      </div>

      <ModalManagementUser
        open={value.openModal}
        onOk={func.onActionUser}
        onCancel={func.onCloseModal}
        form={value.form}
        isEdit={value.isEdit}
        record={value.record}
      />
    </div>
  );
};

export default ManagementUserPage;
