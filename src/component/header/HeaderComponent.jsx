import HeaderComponentTypeCoa from "./type/type-coa/HeaderComponentTypeCoa";
import HeaderComponentTypeInput from "./type/type-input/HeaderComponentTypeInput";
import HeaderComponentTypeRevenueInput from "./type/type-revenue-input/HeaderComponentTypeRevenueInput";
import HeaderComponentTypeRevenuePerusahaan from "./type/type-revenue-perusahaan/HeaderComponentTypeRevenuePerusahaan";
import HeaderComponentTypeRevenueSummary from "./type/type-revenue-summary/HeaderComponentTypeSummary";
import HeaderComponentTypeSummaryLabaRugi from "./type/type-summary-laba-rugi/HeaderComponentTypeSummaryLabaRugi";
import HeaderComponentTypeSummary from "./type/type-summary/HeaderComponentTypeSummary";

const HeaderComponent = ({
  onFinish,
  type,
  onChangeFilter,
  onChangeLoadingUpload,
  onUploadFile,
  onChangeTambahData,
  accesFile = null,
  downloadFile,
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
  valueTreeData
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
  } else if (type === "revenue-input") {
    component = (
      <HeaderComponentTypeRevenueInput
        onFinish={onFinish}
        onChangeFilter={onChangeFilter}
        onChangeLoadingUpload={onChangeLoadingUpload}
        onUploadFile={onUploadFile}
        accesFile={accesFile}
        downloadFile={downloadFile}
        disabledImportExport={disabledImportExport}
        onChangeSelect={onChangeSelect}
        form={form}
      />
    );
  } else if (type === "revenue-summary") {
    component = (
      <HeaderComponentTypeRevenueSummary
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
  } else if (type === "coa") {
    component = (
      <HeaderComponentTypeCoa
        onUploadFile={onUploadFile}
        downloadFile={downloadFile}
        accesFile={accesFile}
        inputSearch={inputSearch}
        onTambahData={onTambahData}
        onChangeTambahData={onChangeTambahData}
        inputTambah={inputTambah}
        formTambah={formTambah}
        valueTreeData={valueTreeData}
        onChangeLoadingUpload={onChangeLoadingUpload}
      />
    );
  }

  return component;
};

export default HeaderComponent;
