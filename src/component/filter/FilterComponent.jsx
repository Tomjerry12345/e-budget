import { Button, Collapse, Form } from "antd";
import { Card } from "@mui/material";
import FilterComponentLogic from "./FilterComponentLogic";
import AutoCompleteElement from "../element/auto-complete/AutoCompleteElement";
import "./Style.scss";
import { getLocal } from "../../values/Utilitas";

const { Panel } = Collapse;

const date = new Date();

const periode = [
  { description: `${date.getFullYear() - 2} - ${date.getFullYear() - 1}` },
  { description: `${date.getFullYear() - 1} - ${date.getFullYear()}` },
  { description: `${date.getFullYear()} - ${date.getFullYear() + 1}` },
  { description: `${date.getFullYear() + 1} - ${date.getFullYear() + 2}` },
];

const status = [{ description: `All` }, { description: `Actived` }, { description: `Retired` }];

const dataType = [{ description: `Actual` }, { description: `Budget` }];

const AutoCompleteFilter = ({
  value,
  func,
  isCodeProduct,
  isCodeIcp,
  isCodeProject,
  isCodeLocation,
  isCodeDept,
  isStatus,
  isType,
  disabled,
  disabledLocation,
  disabledDept,
  variant,
  type = "default",
}) => (
  <>
    <AutoCompleteElement
      label="Perusahaan"
      name="code_company"
      value={value.state.code_company}
      onSelect={func.onSelect}
      disabled={disabled}
      intialValue={variant === "summary" ? { value: "all" } : undefined}
      variant={variant}
    />

    {isCodeProduct === true ? (
      <AutoCompleteElement
        label="Produk"
        name="code_product"
        value={value.state.code_product}
      />
    ) : null}

    {isCodeLocation === true ? (
      <AutoCompleteElement
        label="Lokasi"
        name="code_location"
        value={value.state.code_location}
        disabled={disabledLocation}
      />
    ) : null}
    {isCodeDept === true ? (
      <AutoCompleteElement
        label="Departemen"
        name="code_dept"
        value={value.state.code_dept}
        disabled={disabledDept}
      />
    ) : null}

    {isCodeIcp ? (
      <AutoCompleteElement label="ICP" name="code_icp" value={value.state.code_icp} />
    ) : null}

    {isCodeProject === true ? (
      <AutoCompleteElement
        label="Project"
        name="code_project"
        value={value.state.code_project}
      />
    ) : null}

    <AutoCompleteElement label="Periode" name="periode" value={periode} />

    {isStatus === true ? (
      <AutoCompleteElement label="Status" name="status" value={status} />
    ) : null}

    {isType === true ? <AutoCompleteElement label="Tipe" name="type" value={dataType} /> : null}
  </>
);

/**
 *
 * @param {{
 * onFinish: const function = () => {};
 * isCodeProduct: const boolean;
 * isCodeProject: true | false;
 * isCodeLocation: true | false;
 * isCodeIcp: true | false;
 * isCodeDept: true | false;
 * isStatus: true | false;
 * isType: true | false;
 * keyCodeProject: "default" | "BJU";
 * type: "summary" | "input";
 * }} props Props for the component
 *
 */
const FilterComponent = ({
  onFinish,
  isCodeProduct = true,
  isCodeProject = true,
  isCodeLocation = true,
  isCodeIcp = true,
  isCodeDept = true,
  isStatus = false,
  isType = false,
  keyCodeProject = null,
  form = null,
  codeCompany = null,
  disabled = false,
  variant,
  type = "summary",
  typeCompany = "change",
  typeFilter,
  isCompanyAll = false,
}) => {
  const company = getLocal("code_company");
  const usersGroup = getLocal("user_group");

  // log("usersGroup", usersGroup)

  const { value, func } = FilterComponentLogic({
    isCodeProduct,
    isCodeProject,
    isCodeLocation,
    isCodeIcp,
    isCodeDept,
    keyCodeProject,
    formGlobal: form,
    type: type,
    typeCompany: usersGroup === "sbu" ? "static" : typeCompany,
    codeCompany,
    typeFilter,
    isCompanyAll,
  });

  return (
    <div className="custom-root-card">
      <Collapse expandIconPosition="end" activeKey="1">
        <Panel header="Filter Data" key="1">
          <Card className="card-style">
            <Form
              className="form-filter"
              layout="vertical"
              onFinish={onFinish}
              form={form !== null ? form : value.form}
            >
              <AutoCompleteFilter
                value={value}
                func={func}
                isCodeProduct={isCodeProduct}
                isCodeProject={isCodeProject}
                isCodeLocation={isCodeLocation}
                isCodeIcp={isCodeIcp}
                isCodeDept={isCodeDept}
                isStatus={isStatus}
                isType={isType}
                disabled={
                  usersGroup === "sbu"
                    ? true
                    : usersGroup === "subholding" || usersGroup === "superadmin"
                    ? false
                    : disabled
                }
                disabledLocation={false}
                disabledDept={false}
                variant={variant}
                // disabledLocation={
                //   usersGroup === "sbu" ? (value.code_location !== "null" ? true : false) : false
                // }
              />
              <div style={{ display: "flex" }}>
                {/* <Form.Item>
                  <Button className="btn-reset" onClick={func.onReset}>
                    Reset
                  </Button>
                </Form.Item> */}
                <Form.Item>
                  <Button className="btn-tampilkan" htmlType="submit">
                    Tampilkan
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterComponent;
