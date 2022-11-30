import { Button, Form } from "antd";
import { Card } from "@mui/material";
import SelectElement from "../element/select/SelectElement";
import FilterComponentLogic from "./FilterComponentLogic";

const FilterComponent = ({ onFinish, isCodeProduct }) => {
  const { value, func } = FilterComponentLogic({ isCodeProduct });

  return (
    <div className="custom-root-card">
      <Card className="card-style">
        <Form className="form-filter" layout="vertical" onFinish={onFinish} form={value.form}>
          <SelectElement label="Kode Perusahaan" name="code_company" value={value.state.code_company} onChange={func.onChange} />

          {isCodeProduct === true ? <SelectElement label="Kode Produk" name="code_product" value={value.state.code_product} /> : null}

          <SelectElement label="Kode Lokasi" name="code_location" value={value.state.code_location} />

          <SelectElement label="Kode Dept" name="code_dept" value={value.state.code_dept} />

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
