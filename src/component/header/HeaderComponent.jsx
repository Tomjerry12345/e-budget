import HeaderComponentTypeCoa1 from "./type/type-coa/type-1/HeaderComponentTypeCoa1";
import HeaderComponentTypeCoa2 from "./type/type-coa/type-2/HeaderComponentTypeCoa2";
import HeaderComponentTypeInput from "./type/type-input/type-1/HeaderComponentTypeInput";
import HeaderComponentTypeRevenuePerusahaan from "./type/type-revenue-perusahaan/HeaderComponentTypeRevenuePerusahaan";
import HeaderComponentTypeSummary from "./type/type-summary/HeaderComponentTypeSummary";

const HeaderComponent = ({
  onFinish,
  type,
  onChangeLoadingUpload,
  onUploadFile,
  onUploadFile2,
  onChangeTambahData,
  accesFile = null,
  downloadFile,
  downloadFile2,
  onChangeSelect,
  onExport,
  inputSearch,
  onTambahData,
  inputTambah,
  formTambah,
  valueTreeData,
  listMenuTitleMore = ["", ""],
  listMenuImport = [],
  disabledImportExport,
  listMenu = [],
  disabledMenu,
  linkExport,
  dynamicFile = false,
  showType = false,
}) => {
  let component;

  if (type === "input") {
    component = (
      <HeaderComponentTypeInput
        onFinish={onFinish}
        onUploadFile={onUploadFile}
        accesFile={accesFile}
        downloadFile={downloadFile}
        disabledImportExport={disabledImportExport}
        onChangeSelect={onChangeSelect}
        listMenuImport={listMenuImport}
        dynamicFile={dynamicFile}
        showType={showType}
      />
    );
  } else if (type === "summary") {
    component = (
      <HeaderComponentTypeSummary
        listMenu={listMenu}
        disabledMenu={disabledMenu}
        linkExport={linkExport}
      />
    );
  } else if (type === "revenue-perusahaan") {
    component = (
      <HeaderComponentTypeRevenuePerusahaan
        disabledImportExport={disabledImportExport}
        listMenuImport={listMenuImport}
      />
    );
  } else if (type === "coa-1") {
    component = (
      <HeaderComponentTypeCoa1
        onUploadFile={onUploadFile}
        downloadFile={downloadFile}
        downloadFile2={downloadFile2}
        accesFile={accesFile}
        inputSearch={inputSearch}
        onTambahData={onTambahData}
        onChangeTambahData={onChangeTambahData}
        inputTambah={inputTambah}
        formTambah={formTambah}
        valueTreeData={valueTreeData}
        onChangeLoadingUpload={onChangeLoadingUpload}
        onExport={onExport}
      />
    );
  } else if (type === "coa-2") {
    component = (
      <HeaderComponentTypeCoa2
        onUploadFile={onUploadFile}
        onUploadFile2={onUploadFile2}
        downloadFile={downloadFile}
        downloadFile2={downloadFile2}
        accesFile={accesFile}
        inputSearch={inputSearch}
        onTambahData={onTambahData}
        onChangeTambahData={onChangeTambahData}
        inputTambah={inputTambah}
        formTambah={formTambah}
        valueTreeData={valueTreeData}
        onChangeLoadingUpload={onChangeLoadingUpload}
        onExport={onExport}
        listMenuTitleMore={listMenuTitleMore}
      />
    );
  }

  return component;
};

export default HeaderComponent;
