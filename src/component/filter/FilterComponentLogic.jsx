import { Form } from "antd";
import { useEffect, useState } from "react";
import MainServices from "../../services/MainServices";
import { log } from "../../values/Utilitas";

const FilterComponentLogic = ({ isCodeProduct, isCodeProject, keyCodeProject, codeCompany, formGlobal }) => {
  const [state, setState] = useState({
    code_company: [],
    code_product: [],
    code_location: [],
    code_dept: [],
    code_project: [],
  });

  let [form] = Form.useForm();

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

    log("codeCompany", codeCompany);

    if (codeCompany === null) {
      fetchData();
    } else {
      getValueComboBox(codeCompany);
    }
  }, [codeCompany]);

  const onChange = async (e) => {
    if (formGlobal !== null) {
      formGlobal.setFieldsValue({
        code_location: null,
        code_dept: null,
        code_product: null,
      });
    } else {
      form.setFieldsValue({
        code_location: null,
        code_dept: null,
        code_product: null,
      });
    }

    const resProduct = isCodeProduct === true ? await MainServices.get(`product/list-by-com?code_company=${e}`) : null;
    const resLocation = await MainServices.get(`location/list-by-com?code_company=${e}`);
    const resDept = await MainServices.get(`dept/list`);

    if (resLocation.data.responseCode === 200) {
      setState({
        ...state,
        code_product: resProduct !== null ? setProduct(resProduct) : [],
        code_location: setLocation(resLocation),
        code_dept: setDept(resDept),
      });
    }
  };

  const onSelect = (e) => {
    getValueComboBox(e);
  };

  const getValueComboBox = async (e) => {
    const code = e.replace(/[^0-9]/g, "");

    if (code !== "0") {
      if (formGlobal !== null) {
        formGlobal.setFieldsValue({
          code_location: null,
          code_dept: null,
          code_product: null,
        });
      } else {
        form.setFieldsValue({
          code_location: null,
          code_dept: null,
          code_product: null,
        });
      }

      const resProduct = isCodeProduct === true ? await MainServices.get(`product/list-by-com?code_company=${code}`) : null;
      const resLocation = await MainServices.get(`location/list-by-com?code_company=${code}`);
      const resDept = await MainServices.get(`dept/list`);
      const resProject = isCodeProject === true && keyCodeProject !== null ? await MainServices.get(`project/list`) : null;

      if (resLocation.data.responseCode === 200) {
        setState({
          ...state,
          code_product: resProduct !== null ? setProduct(resProduct) : [],
          code_location: setLocation(resLocation),
          code_dept: setDept(resDept),
          code_project: resProject !== null ? setProject(resProject) : [],
        });
      }
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

  const setProject = (resProject) => {
    const formatResProject = [];
    const data = resProject.data.data;

    data.forEach((element) => {
      let perusahaan;

      if (keyCodeProject === "BJU") {
        perusahaan = element.BJU;
      }

      if (perusahaan === "1") {
        formatResProject.push({
          code: element.code_project,
          title: element.description,
        });
      }
    });

    return formatResProject;
  };

  return {
    value: {
      state,
      form,
    },
    func: {
      onChange,
      onSelect,
    },
  };
};

export default FilterComponentLogic;
