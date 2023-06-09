import { Button, Collapse, Form } from "antd";
import { Card } from "@mui/material";
import FilterComponentLogic from "./FilterComponentLogic";
import AutoCompleteElement from "../element/auto-complete/AutoCompleteElement";
import "./Style.scss";
import { getLocal, log } from "../../values/Utilitas";

const { Panel } = Collapse;

const date = new Date();

const periode = [
  { description: `${date.getFullYear() - 2} - ${date.getFullYear() - 1}` },
  { description: `${date.getFullYear() - 1} - ${date.getFullYear()}` },
  { description: `${date.getFullYear()} - ${date.getFullYear() + 1}` },
  { description: `${date.getFullYear() + 1} - ${date.getFullYear() + 2}` },
];

const AutoCompleteFilter = ({
  value,
  func,
  isCodeProduct,
  isCodeIcp,
  isCodeProject,
  isCodeLocation,
  disabled,
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
      />
    ) : null}

    <AutoCompleteElement label="Departemen" name="code_dept" value={value.state.code_dept} />

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
  </>
);

/**
 *
 * @param {{
 * keyCodeProject: "default" | "BJU";
 * isCodeProject: true | false;
 * isCodeIcp: true | false;
 * isCodeLocation: true | false;
 * onFinish: const function = () => {};
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
  keyCodeProject = null,
  form = null,
  codeCompany = null,
  disabled = false,
  variant,
  type = "summary",
  typeCompany = "change",
}) => {
  const company = getLocal("code_company");
  const usersGroup = getLocal("user_group");

  // log("usersGroup", usersGroup)

  const { value, func } = FilterComponentLogic({
    isCodeProduct,
    isCodeProject,
    isCodeLocation,
    isCodeIcp,
    keyCodeProject,
    formGlobal: form,
    type: type,
    typeCompany: usersGroup === "usersbu" ? "static" : typeCompany,
    codeCompany,
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
                disabled={
                  usersGroup === "usersbu" ? true : usersGroup === "reviewer" ? false : disabled
                }
                // disabled={false}
                variant={variant}
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
