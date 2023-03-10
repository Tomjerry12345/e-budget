import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import "../CoaStyle.scss";
import PopupModal from "../../../../component/modal/popup/PopupModal";
import { log } from "../../../../values/Utilitas";
import ProductLogic from "./ProductLogic";
import ModalListPerusahaan from "../../../../component/modal/list-perusahaan/ModalListPerusahaan";


const ProductPage = () => {
  const { value, func } = ProductLogic();
  return (
    <>
      <HeaderComponent
        type="coa-2"
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onChangeLoadingUpload={(set, setImport, setImport2, setMore) => {
          set(value.loadingUpload);

          if (value.uploadSucces === true) {
            setImport(false);
            setMore(false);
            setImport2(false);
            func.setUploadSucces(null);
          }
        }}
        onUploadFile={func.onUploadFile}
        onUploadFile2={func.onUploadFile2}
        accesFile={value}
        downloadFile="file/product.xlsx"
        downloadFile2="file/product-company.xlsx"
        inputSearch={{
          title: "input kode / nama perusahaan",
          onChange: func.onSearch,
        }}
        onTambahData={func.onTambahData}
        onChangeTambahData={(set) => {
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
        valueTreeData={value.codeParent}
        onExport={func.onExport}
        listMenuTitleMore={["Import Data Produk", "Import Produk Perusahaan"]}
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
            // x: 1600,
          }}
          form={value.form}
        />
      </div>

      <ModalListPerusahaan
        open={value.openDetailPerusahaan}
        data={value.listPerusahaan}
        onOk={func.onCloseDetailPerusahaan}
        onChange={func.onUpdatePerusahaan}
      />
    </>
  );
};

export default ProductPage;
