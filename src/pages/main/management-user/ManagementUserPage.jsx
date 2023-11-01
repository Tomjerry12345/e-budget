import { Button, Form, Input, Pagination, Table } from "antd";
import Logic from "./Logic";
import "./style.scss";
import ModalManagementUser from "./modal/ModalManagementUser";
import HeaderManagementUser from "./header/HeaderManagementUser";
import FormItem from "antd/es/form/FormItem";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const ManagementUserPage = () => {
  const { value, func } = Logic();

  useEffect(() => {
    window.addEventListener("resize", func.handleResizeTable, false);
    // eslint-disable-next-line
  }, []);

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
            <Button className="btn-reset-search" type="primary" onClick={func.onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowClassName={() => "editable-row"}
          bordered
          dataSource={value.dataSource}
          columns={value.columns}
          rowKey="id"
          pagination={false}
          loading={value.loading}
          scroll={{y: value.heightTable, x: 1200}}
        />
        <Pagination
          onChange={func.pageChange}
          defaultCurrent={1}
          current={value.page}
          showSizeChanger={false}
          style={{marginTop: "12px", display:'flex', justifyContent: 'end'}}
          total={value.totalData}
          defaultPageSize={25}
          showTotal={(total, range) => `Showing ${range[0]} to ${range[1]} of ${total} items`}
        />
      </div>

      <ModalManagementUser
        open={value.openModal}
        onOk={func.onActionUser}
        onCancel={func.onCloseModal}
        form={value.form}
        isEdit={value.isEdit}
        record={value.record}
        // userGroup={value.userGroup}
        // setUserGroup={func.setUserGroup}
      />
    </div>
  );
};

export default ManagementUserPage;
