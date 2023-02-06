import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import "../CoaStyle.scss";
import PopupModal from "../../../../component/modal/popup/PopupModal";
import { log } from "../../../../values/Utilitas";
import DepartementLogic from "./AkunLogic";

const treeData = [
  {
    value: "1000000",
    title: "1000000",
    children: [
      {
        value: "1100000",
        title: "1100000",
        children: [
          {
            value: "1111000",
            title: "1111000",
          },
          {
            value: "1120000",
            title: "1120000",
          },
          {
            value: "1130000",
            title: "1130000",
          },
          
        ],
      },
    ],
  },
];

const AkunPage = () => {
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
        inputTambah={[
          {
            label: "Code Account",
            name: "code_account",
            type: "input",
            required: true
          },
          {
            label: "Parent",
            name: "parent",
            type: "checkbox",
            require: false
          },
          {
            label: "Code Parent",
            name: "code_parent",
            type: "tree-select",
            required: true
          },
          {
            label: "Type Account",
            name: "type_account",
            type: "select",
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

export default AkunPage;
