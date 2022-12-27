import { Button, Form } from "antd";
import { Card } from "@mui/material";
import SelectElement from "../element/select/SelectElement";
import FilterComponentLogic from "./FilterComponentLogic";
import AutoCompleteElement from "../element/auto-complete/AutoCompleteElement";

const SelectFilter = ({ value, func, isCodeProduct, isCodeProject }) => (
  <>
    <SelectElement label="Kode Perusahaan" name="code_company" value={value.state.code_company} onChange={func.onChange} />

    {isCodeProduct === true ? <SelectElement label="Kode Produk" name="code_product" value={value.state.code_product} /> : null}

    {isCodeProject === true ? <SelectElement label="Kode Project" name="code_project" value={value.state.code_project} /> : null}

    <SelectElement label="Kode Lokasi" name="code_location" value={value.state.code_location} />

    <SelectElement label="Kode Dept" name="code_dept" value={value.state.code_dept} />
  </>
);

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
  let element;

  if (type === 1) {
    element = <SelectFilter value={value} func={func} isCodeProduct={isCodeProduct} isCodeProject={isCodeProject} />;
  } else if (type === 2) {
    element = <AutoCompleteFilter value={value} func={func} isCodeProduct={isCodeProduct} isCodeProject={isCodeProject} disabled={disabled} />;
  }

  return (
    <div className="custom-root-card">
      <Card className="card-style">
        <Form className="form-filter" layout="vertical" onFinish={onFinish} form={form !== null ? form : value.form}>
          {element}
          <Form.Item>
            <Button className="btn-tampilkan" htmlType="submit">
              Tampilkan
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FilterComponent;
