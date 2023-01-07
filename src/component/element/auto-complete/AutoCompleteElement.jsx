import { AutoComplete, Form } from "antd";

const AutoCompleteElement = ({
  label,
  name,
  onSelect,
  value,
  disabled,
  intialValue,
}) => {
  const newVal = intialValue === undefined ? [] : [intialValue];
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
        row
        options={newVal}
        onSelect={onSelect}
        placeholder={label}
        disabled={disabled}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </Form.Item>
  );
};

export default AutoCompleteElement;
