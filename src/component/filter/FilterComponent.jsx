import { Button, Form } from "antd";
import { Card } from "@mui/material";
import FilterComponentLogic from "./FilterComponentLogic";
import AutoCompleteElement from "../element/auto-complete/AutoCompleteElement";
import "./Style.scss";

const AutoCompleteFilter = ({ value, func, isCodeProduct, isCodeProject, disabled }) => (
  <>
    <AutoCompleteElement label="Kode Perusahaan" name="code_company" value={value.state.code_company} onSelect={func.onSelect} disabled={disabled} />

    {isCodeProduct === true ? <AutoCompleteElement label="Kode Produk" name="code_product" value={value.state.code_product} /> : null}

    {isCodeProject === true ? <AutoCompleteElement label="Kode Project" name="code_project" value={value.state.code_project} /> : null}

    <AutoCompleteElement label="Kode Lokasi" name="code_location" value={value.state.code_location} />

    <AutoCompleteElement label="Kode Dept" name="code_dept" value={value.state.code_dept} />
  </>
);

/**
 *
 * @param {{
 * keyCodeProject: "default" | "BJU";
 * isCodeProject: true | false;
 * onFinish: const function = () => {};
 * }} props Props for the component
 *
 */

const FilterComponent = ({ onFinish, isCodeProduct = true, isCodeProject = false, keyCodeProject = null, form = null, type = 1, codeCompany = null, disabled = false }) => {
  const { value, func } = FilterComponentLogic({ isCodeProduct, isCodeProject, keyCodeProject, codeCompany, formGlobal: form });

  return (
    <div className="custom-root-card">
      <Card className="card-style">
        <Form className="form-filter" layout="vertical" onFinish={onFinish} form={form !== null ? form : value.form}>
          <AutoCompleteFilter value={value} func={func} isCodeProduct={isCodeProduct} isCodeProject={isCodeProject} disabled={disabled} />
          <div style={{ display: "flex" }}>
            <Form.Item>
              <Button className="btn-reset" onClick={func.onReset}>
                Reset
              </Button>
            </Form.Item>
            <Form.Item>
              <Button className="btn-tampilkan" htmlType="submit">
                Tampilkan
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default FilterComponent;
