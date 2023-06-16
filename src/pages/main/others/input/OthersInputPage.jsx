import React from "react";
import OthersInputLogic from "./OthersInputLogic";
import FilterComponent from "component/filter/FilterComponent";
import TableComponent from "component/table/TableComponent";
import HeaderComponent from "component/header/HeaderComponent";

const othersInputPage = () => {
  const { value, func } = OthersInputLogic();

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
        downloadFile={value.endPFile}
        disabledImportExport={value.dataColumnInput.length <= 1}
        onChangeSelect={func.onChangeTahun}
        // form={value.form}
      />

      <FilterComponent
        onFinish={func.onFinish}
        form={value.form}
        isCodeIcp
        isCodeProject
        type="input"
      />

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

export default othersInputPage;
