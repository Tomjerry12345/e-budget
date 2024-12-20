import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import { ReactGrid } from "@silevis/reactgrid";
import Logic from "./Logic";
import "./style.scss";
import HeaderFasilitasKredit from "./header/HeaderFasilitasKredit";
import ModalFasilitasKredit from "./modal/ModalFasilitasKredit";
import { ModalMenu } from "./modal/ModalMenu";

const FasilitasKreditPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderFasilitasKredit titleHeader="Fasilitas Kredit" onClickMenu={func.onOpenMenu} />

      <FilterComponent
        onFinish={func.onFinish}
        isCodeProduct={false}
        isCodeLocation={false}
        isCodeDept={false}
        isCodeIcp={false}
        isCodeProject={false}
        type="input"
      />

      <div className="custom-root-layout">
        <div style={{ margin: "10px" }}>
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              marginBottom: 16,
              paddingBottom: 16,
            }}
          >
            <div
              style={{ width: "100%", maxHeight: "calc(100vh - 276px)" }}
              className="liquidity-planner-app"
            >
              <ReactGrid
                rows={value.rows}
                columns={value.columns}
                stickyTopRows={2}
                stickyLeftColumns={2}
                onCellsChanged={(change) => func.onChangeTable(change)}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalMenu
        open={value.openMenu}
        onCancel={func.onCloseMenu}
        disabled={value.codeFilter === undefined}
        listMenu={[
          {
            desc: "Tambah Fasilitas",
            func: func.onOpenModalTambah,
          },
          {
            desc: "Export Fasilitas",
            func: func.onExport,
          },
        ]}
      />

      <ModalFasilitasKredit
        form={value.form}
        open={value.modalTambah}
        onOk={func.onOkModalFasilitas}
        onCancel={func.onCloseModalTambah}
      />
    </>
  );
};

export default FasilitasKreditPage;
