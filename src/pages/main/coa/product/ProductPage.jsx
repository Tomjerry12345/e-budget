import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import "../CoaStyle.scss";
import PopupModal from "../../../../component/modal/popup/PopupModal";
import { log } from "../../../../values/Utilitas";
import ProductLogic from "./ProductLogic";

const treeData = [
  {
    value: "200",
    title: "200",
  },
  {
    value: "300",
    title: "300",
  },
  {
    value: "400",
    title: "400",
  },
  {
    value: "500",
    title: "500",
  },
];

const ProductPage = () => {
  const { value, func } = ProductLogic();
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
        inputTambah={[
          {
            label: "Code Product",
            name: "code_product",
            type: "input",
            required: true
          },
          {
            label: "Parent",
            name: "parent",
            type: "checkbox",
            required: false
          },
          {
            label: "Code Parent",
            name: "code_parent",
            type: "tree-select",
            required: true
          },
          {
            label: "Description",
            name: "description",
            type: "textarea",
            required: true
          },
        ]}
        formTambah={value.formTambah}
        valueTreeData={treeData}
      />
      <div className="custom-root-layout custom-root-coa">
        <TableComponent
          variant="input"
          type="coa"
          dataSource={value.dataColumn}
          columns={value.columns}
          loading={value.loading}
          scroll={{
            y: value.size.y - 140,
            x: 900,
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

export default ProductPage;
