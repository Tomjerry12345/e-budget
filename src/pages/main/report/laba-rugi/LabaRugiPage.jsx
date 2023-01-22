import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import LabaRugiLogic from "./LabaRugiLogic";

const LabaRugiPage = () => {
  const { value, func } = LabaRugiLogic();
  return (
    <>
      <HeaderComponent
        type="summary"
        onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onExport={func.downloadFile}
        disabledImportExport={value.data.length <= 1}
      />

      <div className="custom-root-layout custom-root-coa">
        {/* {value.data.length > 1 ? (
          <div className="layout-btn-action">
            <Button className="btn-download-template" type="primary" onClick={func.downloadFile} icon={<UploadOutlined className="custom-icon" />}>
              Download
            </Button>
          </div>
        ) : null} */}

        <TableComponent
          dataSource={value.data}
          columns={value.columns}
          loading={value.loading}
        />
      </div>
    </>
  );
};

export default LabaRugiPage;
