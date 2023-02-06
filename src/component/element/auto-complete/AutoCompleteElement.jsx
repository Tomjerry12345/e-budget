import { AutoComplete, Form } from "antd";
import "./style.scss";

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
      <AutoComplete
        popupClassName="autocomplete-style"
        style={{
          width: 200,
        }}
        row
        options={newVal}
        onSelect={onSelect}
        placeholder={label}
        disabled={disabled}
        filterOption={(inputValue, option) => {

          return (
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          );
        }}
      />
    </Form.Item>
  );
};

export default AutoCompleteElement;
