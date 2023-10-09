import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { Pagination } from "antd";
import { ReactGrid } from "@silevis/reactgrid";
import Logic from "./Logic";
import { Box } from "@mui/material";
import UbahRetiredModal from "component/modal/ubah-retired/UbahRetiredModal";
import { ButtonCellTemplate } from "./ButtonCellTemplate";

const LoadSaldoAwalPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderComponent
        className="more-modal-width-type1"
        type="input"
        // onFinish={func.onFinish}
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile="file/capex/load_saldo_awal.xlsx"
        // disabledImportExport={value.rows.length === 0}
        listMenuImport={[{ description: "load saldo awal", code_account: 0 }]}
        showCompany
        showType
        showYear
      />

      <FilterComponent
        onFinish={func.onFinish}
        isCodeProduct
        isCodeProject
        isCodeLocation
        isCodeIcp
        isCodeDept
        isStatus={true}
        type="input"
      />

      <div className="custom-root-layout">
        <div style={{ margin: 16 }}>
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              marginBottom: 16,
              paddingBottom: 16,
            }}
          >
            <div
              style={{ width: "100%", maxHeight: "calc(100vh - 329px)" }}
              className="liquidity-planner-app"
            >
              <ReactGrid
                rows={value.rows}
                columns={value.columns}
                stickyTopRows={1}
                stickyLeftColumns={4}
                customCellTemplates={{ status: new ButtonCellTemplate() }}
                onCellsChanged={(change) =>
                  func.onChangeTable(change, "administrasi")
                }
              />
            </div>
          </div>
          {value.rows.length > 0 ? (
            <Box display="flex" justifyContent="center">
              <Pagination
                defaultCurrent={1}
                total={value.totalData}
                pageSize={50}
                showSizeChanger={false}
                onChange={func.onChangePagination}
              />
            </Box>
          ) : null}
        </div>
      </div>

      <UbahRetiredModal
        onFinish={func.onFinishModalRetired}
        open={value.openModalRetired}
        onCancel={func.onCancelModalRetired}
        form={value.formRetired}
      />
    </>
  );
};

export default LoadSaldoAwalPage;
