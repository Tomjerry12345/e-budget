import { AutoComplete, Form } from "antd";

const options = [
  {
    value: "Burns Bay Road",
  },
  {
    value: "Downing Street",
  },
  {
    value: "Wall Street",
  },
];

const AutoCompleteElement = ({ label, name, onChange, value }) => {
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
      <AutoComplete
        style={{
          width: 200,
        }}
        options={options}
        placeholder="try to type `b`"
        filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    </Form.Item>
  );
};

export default AutoCompleteElement;
