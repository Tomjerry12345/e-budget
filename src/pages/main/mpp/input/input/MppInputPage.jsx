import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import TableComponent from "component/table/TableComponent";
import Logic from "./Logic";

const MppInputPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderComponent
        type="input"
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
        downloadFile="file/mpp.xlsx"
        disabledImportExport={value.dataColumnInput.length <= 1}
        onChangeSelect={func.onChangeTahun}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject type="input" />

      <div className="custom-root-layout">
        <TableComponent
          variant="input"
          dataSource={value.dataColumnInput}
          columns={value.columns}
          loading={value.loading}
          listKeyParent={value.listKeyParent}
        />
      </div>
    </>
  );
};

export default MppInputPage;
