import { AutoComplete, Form, Input } from "antd";
import "./style.scss";

const AutoCompleteElement = ({
  label,
  name,
  onSelect,
  value,
  disabled,
  intialValue,
  variant = 'default'
}) => {
  const newVal = intialValue === undefined ? [] : [intialValue];
  value.forEach((val) => {
    newVal.push({
      value: val.description,
    });
    // if (val.code !== "") {
    //   newVal.push({
    //     value: `${val.title} (${val.code})`,
    //   });
    // } else {
    //   newVal.push({
    //     value: `${val.title}`,
    //   });
    // }
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
    {variant === "default" ? <AutoComplete
        popupClassName="autocomplete-style"
        style={{
          width: 200,
        }}
        row
        options={newVal}
        onSelect={onSelect}
        placeholder={label}
        disabled={disabled}
        allowClear
        filterOption={(inputValue, option) => {

          return (
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          );
        }}
      /> : <Input placeholder="Basic usage" readOnly={true} style={{}}/>}
      
    </Form.Item>
  );
};

export default AutoCompleteElement;
