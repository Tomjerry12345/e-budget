import { Button, Form } from "antd";
import { Card } from "@mui/material";
import SelectElement from "../element/select/SelectElement";
import FilterComponentLogic from "./FilterComponentLogic";
import AutoCompleteElement from "../element/auto-complete/AutoCompleteElement";

const SelectFilter = ({ value, func, isCodeProduct }) => (
  <>
    <SelectElement label="Kode Perusahaan" name="code_company" value={value.state.code_company} onChange={func.onChange} />

    {isCodeProduct === true ? <SelectElement label="Kode Produk" name="code_product" value={value.state.code_product} /> : null}

    <SelectElement label="Kode Lokasi" name="code_location" value={value.state.code_location} />

    <SelectElement label="Kode Dept" name="code_dept" value={value.state.code_dept} />
  </>
);

const AutoCompleteFilter = ({ value, func, isCodeProduct }) => (
  <>
    <AutoCompleteElement label="Kode Perusahaan" name="code_company" value={value.state.code_company} onChange={func.onChange} />
  </>
);

const FilterComponent = ({ onFinish, isCodeProduct, type = 1 }) => {
  const { value, func } = FilterComponentLogic({ isCodeProduct });
  let element;

  if (type === 1) {
    element = <SelectFilter value={value} func={func} isCodeProduct={isCodeProduct} />;
  } else if (type === 2) {
    element = <AutoCompleteFilter value={value} func={func} isCodeProduct={isCodeProduct} />;
  }

  return (
    <div className="custom-root-card">
      <Card className="card-style">
        <Form className="form-filter" layout="vertical" onFinish={onFinish} form={value.form}>
          <Form.Item>
            {element}
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
