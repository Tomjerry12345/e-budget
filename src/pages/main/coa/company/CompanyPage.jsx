import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import CompanyLogic from "./CompanyLogic";
import "../CoaStyle.scss";
import PopupModal from "../../../../component/modal/popup/PopupModal";
import { log } from "../../../../values/Utilitas";

const treeData = [
  {
    value: "100",
    title: "100",
    children: [
      {
        value: "200",
        title: "200",
        children: [
          {
            value: "210",
            title: "210",
          },
          {
            value: "230",
            title: "230",
          },
          {
            value: "240",
            title: "240",
          },
          
        ],
      },
    ],
  },
];

const CompanyPage = () => {
  const { value, func } = CompanyLogic();
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
            label: "Code Company",
            name: "code_company",
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

export default CompanyPage;
