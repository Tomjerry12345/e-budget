import { Button, Collapse, Form } from "antd";
import { Card } from "@mui/material";
import FilterComponentLogic from "./FilterComponentLogic";
import AutoCompleteElement from "../element/auto-complete/AutoCompleteElement";
import "./Style.scss";

const { Panel } = Collapse;

const periode = [{ title: "2022-2023", code: "" }];

const AutoCompleteFilter = ({
  value,
  func,
  isCodeProduct,
  isCodeIcp,
  isCodeProject,
  disabled,
  variant,
}) => (
  <>
    <AutoCompleteElement
      label="Kode Perusahaan"
      name="code_company"
      value={value.state.code_company}
      onSelect={func.onSelect}
      disabled={disabled}
      intialValue={variant === "summary" ? { value: "all" } : undefined}
    />

    {isCodeProduct === true ? (
      <AutoCompleteElement
        label="Kode Produk"
        name="code_product"
        value={value.state.code_product}
      />
    ) : null}

    <AutoCompleteElement
      label="Kode Lokasi"
      name="code_location"
      value={value.state.code_location}
    />

    <AutoCompleteElement
      label="Kode Dept"
      name="code_dept"
      value={value.state.code_dept}
    />

    {isCodeIcp ? (
      <AutoCompleteElement
        label="Kode Icp"
        name="code_icp"
        value={value.state.code_icp}
      />
    ) : null}

    {isCodeProject === true ? (
      <AutoCompleteElement
        label="Kode Project"
        name="code_project"
        value={value.state.code_project}
      />
    ) : null}

    {/* <AutoCompleteElement label="Periode" name="periode" value={periode} /> */}
  </>
);

/**
 *
 * @param {{
 * keyCodeProject: "default" | "BJU";
 * isCodeProject: true | false;
 * isCodeIcp: true | false;
 * onFinish: const function = () => {};
 * }} props Props for the component
 *
 */

const FilterComponent = ({
  onFinish,
  isCodeProduct = true,
  isCodeProject = false,
  isCodeIcp = false,
  keyCodeProject = null,
  form = null,
  codeCompany = null,
  disabled = false,
  variant,
}) => {
  const { value, func } = FilterComponentLogic({
    isCodeProduct,
    isCodeProject,
    isCodeIcp,
    keyCodeProject,
    codeCompany,
    formGlobal: form,
  });

  return (
    <div className="custom-root-card">
      <Collapse
        expandIconPosition="end"
        activeKey="1"
        style={{
          marginTop: 12,
        }}
      >
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
                isCodeIcp={isCodeIcp}
                disabled={disabled}
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
