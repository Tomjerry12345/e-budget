import { Button, Pagination, Table } from "antd";
import Logic from "./Logic";
import HeaderComponent from "component/header/HeaderComponent";
import "./style.scss";
import ModalManagementUser from "./modal/ModalManagementUser";
import { Box } from "@mui/material";

const ManagementUserPage = () => {
  const { value, func } = Logic();

  return (
    <div className="style-management-user">
      <HeaderComponent
        type="summary"
        onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onExport={func.downloadFile}
        // disabledImportExport={value.data.length <= 1}
        titleHeader="Management user"
      />
      <div className="custom-root-layout">
        <Button className="btn-tambah-user" onClick={func.onOpenModal} type="primary">
          Tambah User
        </Button>
        <Table
          components={value.components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={value.dataSource}
          columns={value.columns}
          pagination={false}
          rowKey="id"
        />
        <Box display="flex" justifyContent="center">
          <Pagination
            defaultCurrent={1}
            total={value.totalData}
            pageSize={50}
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
