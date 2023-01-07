import HeaderComponentTypeInput from "./type/type-input/HeaderComponentTypeInput";
import HeaderComponentTypeSummary from "./type/type-summary/HeaderComponentTypeSummary";

const HeaderComponent = ({
  onFinish,
  type,
  onChangeFilter,
  onChangeLoadingUpload,
  onUploadFile,
  accesFile = null,
  downloadFile,
  disabledImportExport,
  onChangeSelect,
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
      />
    );
  } else if (type === "summary") {
    component = (
      <HeaderComponentTypeSummary
        onFinish={onFinish}
        onChangeFilter={onChangeFilter}
        onChangeLoadingUpload={onChangeLoadingUpload}
        onUploadFile={onUploadFile}
        accesFile={accesFile}
        downloadFile={downloadFile}
        disabledImportExport={disabledImportExport}
      />
    );
  }

  return component;
};

export default HeaderComponent;
