import { Form } from "antd";
import { useEffect, useState } from "react";
import MainServices from "../../services/MainServices";

const FilterComponentLogic = ({ isCodeProduct }) => {
  const [state, setState] = useState({
    code_company: [],
    code_product: [],
    code_location: [],
    code_dept: [],
  });

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await MainServices.get("company/list-master");

      if (data.responseCode === 200) {
        setState({
          ...state,
          code_company: data.data,
        });
      }
    };

    fetchData();
  }, []);

  const onChange = async (e) => {
    form.setFieldsValue({
      code_location: null,
      code_dept: null,
      code_product: null,
    });
    const resProduct = isCodeProduct === true ? await MainServices.get(`product/list-by-com?code_company=${e}`) : null;
    const resLocation = await MainServices.get(`location/list-by-com?code_company=${e}`);
    const resDept = await MainServices.get(`dept/list`);

    console.log("resProduct", resProduct);
    console.log("resLocation", resLocation);
    console.log("resDept", resDept);

    if (resLocation.data.responseCode === 200) {
      setState({
        ...state,
        code_product: resProduct !== null ? setProduct(resProduct) : [],
        code_location: setLocation(resLocation),
        code_dept: setDept(resDept),
      });
    }
  };

  const setProduct = (resProduct) => {
    const formatResProduct = [];
    resProduct.data.data.forEach((element) => {
      formatResProduct.push({
        code: element.code_product,
        title: element.description,
      });
    });
    return formatResProduct;
  };

  const setLocation = (resLocation) => {
    const formatResLocation = [];
    resLocation.data.data.forEach((element) => {
      formatResLocation.push({
        code: element.code_location,
        title: element.description,
      });
    });
    return formatResLocation;
  };

  const setDept = (resDept) => {
    const formatResDept = [];
    resDept.data.data.forEach((element) => {
      formatResDept.push({
        code: element.code_dept,
        title: element.description,
      });
    });
    return formatResDept;
  };

  return {
    value: {
      state,
      form,
    },
    func: {
      onChange,
    },
  };
};

export default FilterComponentLogic;
