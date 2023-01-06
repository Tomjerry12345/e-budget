import HeaderComponentTypeInput from "./type/type-input/HeaderComponentTypeInput";

const HeaderComponent = ({
  onFinish,
  type,
  onChangeFilter,
  onChangeLoadingUpload,
  onUploadFile,
  accesFile = null,
  downloadFile,
  disabledImportExport,
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
      />
    );
  } else if (type === "summary") {
  }

  return component;
};

export default HeaderComponent;
