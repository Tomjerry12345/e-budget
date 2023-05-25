import React from "react";
import FilterComponent from "../../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../../component/header/HeaderComponent";
import TableComponent from "../../../../../component/table/TableComponent";
import IklanAdvertensiInputLogic from "./IklanAdvertensiInputLogic";
import { Typography } from "antd";
import { ReactGrid } from "@silevis/reactgrid";

const IklanAdvertensiInputPage = () => {
  const { value, func } = IklanAdvertensiInputLogic();

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
        downloadFile="file/opex.xlsx"
        disabledImportExport={value.dataColumnInput.length <= 1}
        onChangeSelect={func.onChangeTahun}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject type="input" />

      <div className="custom-root-layout">
        {/* <TableComponent
          variant="input"
          dataSource={value.dataColumnInput}
          columns={value.columns}
          loading={value.loading}
          listKeyParent={value.listKeyParent}
        /> */}
        {value.rows.pemasaran.length > 0 ? (
          <Typography.Text className="section-header-table">Pemasaran</Typography.Text>
        ) : null}

        {value.rows.pemasaran.length > 0
          ? value.rows.pemasaran.map((e, i) => (
              <div
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  marginBottom: 16,
                  paddingBottom: 16,
                }}
              >
                <div
                  style={{ width: "100%", maxHeight: "calc(100vh - 239px)" }}
                  className="liquidity-planner-app"
                >
                  <ReactGrid
                    rows={e}
                    columns={value.columns}
                    stickyTopRows={1}
                    stickyLeftColumns={1}
                    onCellsChanged={(change) => func.onChangeTable(change, i)}
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default IklanAdvertensiInputPage;
