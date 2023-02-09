import { Form } from "antd";
import { useEffect, useState } from "react";
import MainServices from "../../services/MainServices";
import { log } from "../../values/Utilitas";

const FilterComponentLogic = ({
  isCodeProduct,
  isCodeProject,
  isCodeIcp,
  keyCodeProject,
  codeCompany,
  formGlobal,
  type,
  typeCompany,
}) => {
  const [state, setState] = useState({
    code_company: [],
    code_product: [],
    code_location: [],
    code_dept: [],
    code_icp: [],
    code_project: [],
  });

  let [form] = Form.useForm();

  const [isLoad, setIsLoad] = useState(false);

  // const [gCode, setGCode] = useState()

  useEffect(() => {
    const fetchData = async () => {
      // const { data } = await MainServices.get("company/list-master");
      const { data } = await MainServices.get("company/list-child");

      if (data.responseCode === 200) {
        setState({
          ...state,
          code_company: data.data,
        });

        setIsLoad(true);
      }
    };

    if (typeCompany === "change") {
      fetchData();
    }

    // if (codeCompany === null) {
    //   fetchData();
    // } else {
    //   getValueComboBox(codeCompany, true);
    // }
  }, [codeCompany]);

  useEffect(() => {
    // log("codeCompany-11", codeCompany);

    if (codeCompany !== null) {
      getValueComboBox(codeCompany);
    }
  }, [isLoad]);

  const onSelect = (e) => {
    if (e === "all") {
      if (formGlobal !== null) {
        formGlobal.setFieldsValue({
          code_location: "all",
          code_dept: "all",
          code_product: "all",
        });
      } else {
        form.setFieldsValue({
          code_location: "all",
          code_dept: "all",
          code_product: "all",
        });
      }
    } else {
      getValueComboBox(e);
    }
  };

  const onReset = () => {
    form.setFieldsValue({
      code_company: null,
      code_location: null,
      code_dept: null,
      code_product: null,
    });
  };

  const getValueComboBox = async (e) => {
    // const code = isNaN(e) ? e.replace(/[^0-9]/g, "") : e;

    let code = [];

    if (typeCompany === "change") {
      code = e.split(" ");
    } else {
      code.push(e)
    }

    log("code", code);

    if (code !== "0") {
      // if (formGlobal !== null) {

      //   formGlobal.setFieldsValue({
      //     code_location: null,
      //     code_dept: null,
      //     code_product: null,
      //   });
      // } else {
      //   form.setFieldsValue({
      //     code_location: null,
      //     code_dept: null,
      //     code_product: null,
      //   });
      // }

      const resProduct =
        isCodeProduct === true
          ? await MainServices.get(
              `product/list-by-com?code_company=${code[0]}`
            )
          : null;

      const resLocation = await MainServices.get(
        `location/list-by-com?code_company=${code[0]}`
      );
      const resDept = await MainServices.get(
        `dept/list-dropdown?code_company=${code[0]}`
      );
      const resIcp =
        isCodeIcp === true
          ? await MainServices.get(`icp/list-dropdown?code_company=${code[0]}`)
          : null;
      const resProject =
        isCodeProject === true
          ? await MainServices.get(
              `project/list-by-com?code_company=${code[0]}`
            )
          : null;

      if (resLocation.data.responseCode === 200) {
        setState({
          ...state,
          code_product: resProduct !== null ? setProduct(resProduct) : [],
          code_location: setLocation(resLocation),
          code_dept: setDept(resDept),
          code_icp: resIcp !== null ? setIcp(resIcp) : [],
          code_project: resProject !== null ? setProject(resProject, code) : [],
        });
      }
    }
  };

  const setProduct = (resProduct) => {
    log("resProduct", resProduct);
    let data;

    if (type === "input") {
      data = resProduct.data.data.filter((item) => item.code !== "all");
    } else {
      data = resProduct.data.data;
    }

    return data;
  };

  const setLocation = (resLocation) => {
    log("resLocation", resLocation);
    let data;

    if (type === "input") {
      data = resLocation.data.data.filter((item) => item.code !== "all");
    } else {
      data = resLocation.data.data;
    }
    return data;
  };

  const setDept = (resDept) => {
    log("resDept", resDept);

    let data;

    if (type === "input") {
      data = resDept.data.data.filter((item) => item.code !== "all");
    } else {
      data = resDept.data.data;
    }

    return data;
  };

  const setIcp = (resIcp) => {
    log("resIcp", resIcp);
    let data;

    if (type === "input") {
      data = resIcp.data.data.filter((item) => item.code !== "all");
    } else {
      data = resIcp.data.data;
    }
    return data;
  };

  const setProject = (resProject, c) => {
    log("resProject", resProject);
    let data;

    if (type === "input") {
      data = resProject.data.data.filter((item) => item.code !== "all");
    } else {
      data = resProject.data.data;
    }
    return data;
  };

  return {
    value: {
      state,
      form,
    },
    func: {
      onSelect,
      onReset,
    },
  };
};

export default FilterComponentLogic;
