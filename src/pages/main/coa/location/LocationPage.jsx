import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import LocationLogic from "./LocationLogic";
import "../CoaStyle.scss";

const LocationPage = () => {
  const { value, func } = LocationLogic();
  return (
    <>
      <HeaderComponent
        type="coa"
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onChangeLoadingUpload={(set, setImport, setMore) => {
          set(value.loadingUpload);

          if (value.uploadSucces === true) {
            setImport(false);
            setMore(false)
            func.setUploadSucces(null);
          }
        }}
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile="file/lokasi.xlsx"
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
            label: "Code Location",
            name: "code_location",
            type: "input",
            required: true,
          },
          {
            label: "Parent",
            name: "parent",
            type: "checkbox",
            required: false,
          },
          {
            label: "Code Parent",
            name: "code_parent",
            type: "tree-select",
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "textarea",
            required: true,
          },
        ]}
        formTambah={value.formTambah}
        valueTreeData={value.codeParent}
        onExport={func.onExport}
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
            x: 1600,
          }}
          form={value.form}
        />
      </div>
    </>
  );
};

export default LocationPage;
