import { Form } from "antd";
import { useEffect, useState } from "react";
import FilterComponent from "../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";
import { getSizeScreen } from "../../../../values/Utilitas";
import LabaRugiTestingLogic from "./LabaRugiTestingLogic";

const LabaRugiTestingPage = () => {
  const { value, func } = LabaRugiTestingLogic();

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
    form.setFieldsValue({
      code_company: `HSI (211)`,
      code_location: "ALL",
      code_dept: "ALL",
      code_product: "ALL",
      code_icp: "ALL",
      code_project: "ALL",
      // periode: "2022-2023",
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      <FilterComponent
        onFinish={func.onFinish}
        codeCompany={211}
        isCodeIcp={true}
        isCodeProject={true}
        form={form}
        // disabled={true}
      />

      <div className="custom-root-layout">
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
          scroll={{ y: size.y - 340 }}
        />
      </div>
    </>
  );
};

export default LabaRugiTestingPage;
