import HeaderComponentType1 from "./type/type-1/HeaderComponentType1";

const HeaderComponent = ({ onFinish, type = 1, onChangeFilter, onClickImport }) => {
  let component;

  if (type === 1) {
    component = <HeaderComponentType1 onFinish={onFinish} onChangeFilter={onChangeFilter} onClickImport={onClickImport} />;
  }
  return component;
};

export default HeaderComponent;
