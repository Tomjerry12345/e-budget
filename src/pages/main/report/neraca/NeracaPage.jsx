import { Form } from "antd";
import { useEffect, useState } from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import TableComponent from "component/table/TableComponent";
import { getLocal, getSizeScreen } from "values/Utilitas";
import Logic from "./Logic";

const LabaRugiPage = () => {
  const { value, func } = Logic();

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
    const userGroup = getLocal("user_group");
    const company = getLocal("code_company");
    const company_names = getLocal("company_names");
    const code_location = getLocal("code_location");
    const code_dept = getLocal("code_department");

    form.setFieldsValue({
      code_company:
        userGroup === "superadmin"
          ? ""
          : company === ""
          ? null
          : `${company} - ${company_names}`,
      code_product: "ALL",
      code_location: userGroup === "superadmin" ? "ALL" : code_location,
      code_dept: userGroup === "superadmin" ? "ALL" : code_dept,
      code_icp: "ALL",
      code_project: "ALL",
      // periode: "2023 - 2024",
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <HeaderComponent
        type="summary"
        onFinish={func.onFinish}
        listMenu={[{ description: "Neraca", disabled: value.data.length === 0 }]}
        linkExport={value.linkExport}
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
          scroll={{ y: size.y - 260 }}
        />
      </div>
    </>
  );
};

export default LabaRugiPage;
