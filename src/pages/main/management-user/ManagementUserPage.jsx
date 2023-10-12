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
        <Form
          layout="horizontal"
          onFinish={func.onSearch}
          // form={form}
        >
          <FormItem
            label="Cari berdasarkan nik / nama"
            name="search"
            children={<Input prefix={<SearchOutlined />} />}
          />
          <Form.Item className="footer-custom">
            <Button className="btn-cari" type="primary" htmlType="submit">
              Cari
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowClassName={() => "editable-row"}
          bordered
          dataSource={value.dataSource}
          columns={value.columns}
          pagination={false}
          rowKey="id"
        />
        <Box className="pagination" display="flex" justifyContent="center">
          <Pagination
            defaultCurrent={1}
            total={value.totalData}
            pageSize={25}
            showSizeChanger={false}
            onChange={func.onChangePagination}
          />
        </Box>
      </div>

      <ModalManagementUser
        open={value.openModal}
        onOk={func.onActionUser}
        onCancel={func.onCloseModal}
        form={value.form}
        isEdit={value.isEdit}
      />
    </div>
  );
};

export default ManagementUserPage;
