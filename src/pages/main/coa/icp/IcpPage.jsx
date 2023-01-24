import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import "../CoaStyle.scss";
import PopupModal from "../../../../component/modal/popup/PopupModal";
import { log } from "../../../../values/Utilitas";
import DepartementLogic from "./IcpLogic";

const IcpPage = () => {
  const { value, func } = DepartementLogic();
  return (
    <>
      <HeaderComponent
        type="coa"
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onChangeLoadingUpload={(set, setImport) => {
          set(value.loadingUpload);

          if (value.uploadSucces === true) {
            setImport(false);
            func.setUploadSucces(null);
          }
        }}
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile="file/perusahaan.xlsx"
        inputSearch={{
          title: "input kode / nama perusahaan",
          onChange: func.onSearch,
        }}
        onTambahData={func.onTambahData}
        onChangeTambahData={(set) => {
          log("value.isTambah", value.isTambah);
          if (value.isTambah) {
            set(false);
            func.setIsTambah(null);
          }
        }}
      />
      <div className="custom-root-layout custom-root-coa">
        {/* <div className="top-content">
          <Form className="form-cari" layout="vertical">
            <Form.Item>
              <Input placeholder="Cari data di sini..." />
            </Form.Item>
            <Button className="btn-cari" type="primary">
              Cari
            </Button>
          </Form>

          <div className="layout-btn-action">
            <Button
              className="btn-update"
              type="primary"
              icon={<UploadOutlined className="custom-icon" />}
              onClick={func.onOpenUploadModal}
            >
              Update
            </Button>
          </div>
        </div> */}
        <TableComponent
          variant="input"
          type="coa"
          dataSource={value.dataColumn}
          columns={value.columns}
          loading={value.loading}
          scroll={{
            y: value.size.y - 200,
          }}
          form={value.form}
        />
      </div>

      <PopupModal
        open={value.showPopup}
        succes={value.isSucces}
        onOk={func.onClosePopupModal}
        textSucces="Sukses melakukan perubahan"
        textProses="Silahkan tunggu..."
      />
    </>
  );
};

export default IcpPage;
