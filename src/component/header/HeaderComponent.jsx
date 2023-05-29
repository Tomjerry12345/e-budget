import HeaderComponentTypeCoa1 from "./type/type-coa/type-1/HeaderComponentTypeCoa1";
import HeaderComponentTypeCoa2 from "./type/type-coa/type-2/HeaderComponentTypeCoa2";
import HeaderComponentTypeInput from "./type/type-input/type-1/HeaderComponentTypeInput";
import HeaderComponentTypeRevenuePerusahaan from "./type/type-revenue-perusahaan/HeaderComponentTypeRevenuePerusahaan";
import HeaderComponentTypeSummary from "./type/type-summary/HeaderComponentTypeSummary";

const HeaderComponent = ({
  onFinish,
  type,
  onChangeFilter,
  onChangeLoadingUpload,
  onUploadFile,
  onUploadFile2,
  onChangeTambahData,
  accesFile = null,
  downloadFile,
  downloadFile2,
  disabledImportExport,
  onChangeSelect,
  onExport,
  form,
  codeCompany,
  isCodeProject = false,
  disabled = false,
  keyCodeProject,
  inputSearch,
  onTambahData,
  inputTambah,
  formTambah,
  valueTreeData,
  listMenuTitleMore = ["", ""],
  listMenuImport = [],
}) => {
  let component;

  if (type === "input") {
    component = (
      <HeaderComponentTypeInput
        onFinish={onFinish}
        onChangeFilter={onChangeFilter}
        onChangeLoadingUpload={onChangeLoadingUpload}
        onUploadFile={onUploadFile}
        accesFile={accesFile}
        downloadFile={downloadFile}
        disabledImportExport={disabledImportExport}
        onChangeSelect={onChangeSelect}
        form={form}
        listMenuImport={listMenuImport}
      />
    );
  } else if (type === "summary") {
    component = (
      <HeaderComponentTypeSummary
        onFinish={onFinish}
        onChangeFilter={onChangeFilter}
        onUploadFile={onUploadFile}
        accesFile={accesFile}
        downloadFile={downloadFile}
        disabledImportExport={disabledImportExport}
        onExport={onExport}
        form={form}
      />
    );
  } else if (type === "revenue-perusahaan") {
    component = (
      <HeaderComponentTypeRevenuePerusahaan
        onFinish={onFinish}
        onChangeFilter={onChangeFilter}
        onChangeLoadingUpload={onChangeLoadingUpload}
        onUploadFile={onUploadFile}
        accesFile={accesFile}
        downloadFile={downloadFile}
        disabledImportExport={disabledImportExport}
        onChangeSelect={onChangeSelect}
        form={form}
        codeCompany={codeCompany}
        isCodeProject={isCodeProject}
        disabled={disabled}
        keyCodeProject={keyCodeProject}
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
