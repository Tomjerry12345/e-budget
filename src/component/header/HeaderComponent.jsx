import HeaderComponentType1 from "./type/type-1/HeaderComponentType1";

const HeaderComponent = ({ form, onFinish, type = 1 }) => {
  let component;

  if (type === 1) {
    component = <HeaderComponentType1 form={form} onFinish={onFinish} />;
  }
  return component;
};

export default HeaderComponent;
