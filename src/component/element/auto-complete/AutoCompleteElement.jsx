import { AutoComplete, Form } from "antd";
import { log } from "../../../values/Utilitas";

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

const AutoCompleteElement = ({ label, name, onSelect, value }) => {
  const newVal = [];
  log("value", value);
  value.forEach((val) => {
    newVal.push({
      value: `${val.title} (${val.code})`,
    });
  });
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
        options={newVal}
        onSelect={onSelect}
        placeholder={label}
        filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    </Form.Item>
  );
};

export default AutoCompleteElement;
