import { Form, Select } from "antd";

const SelectElement = ({ label, name, onChange, value }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: "tidak boleh kosong!",
        },
      ]}
    >
      <Select onChange={onChange}>
        {value.map((val, i) => (
          <Select.Option key={i} value={val.code}>
            {`${val.code} (${val.title})`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectElement;
