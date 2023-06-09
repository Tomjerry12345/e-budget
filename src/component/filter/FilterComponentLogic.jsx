import { Form } from "antd";
import { useEffect, useState } from "react";
import MainServices from "../../services/MainServices";
import { getLocal, log } from "../../values/Utilitas";

const FilterComponentLogic = ({
  isCodeProduct,
  isCodeProject,
  isCodeLocation,
  isCodeIcp,
  codeCompany,
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

  const userGroup = getLocal("user_group");
  const company = getLocal("code_company");
  const company_names = getLocal("company_names");

  useEffect(() => {
    const fetchData = async () => {
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

    if (codeCompany !== null) {
      getValueComboBox(codeCompany);
    }
  }, []);

  useEffect(() => {
    if (userGroup === "usersbu") {
      if (company_names !== null) {
        form.setFieldsValue({
          code_company: `${company} - ${company_names}`,
        });
        getValueComboBox(company);
      }
    } else if (userGroup === "reviewer") {
      let dataCompany = [];
      let companyNames = company_names.split(", ");

      company.split(", ").forEach((v, i) => {
        dataCompany.push({
          code: v,
          description: `${v} - ${companyNames[i]}`,
        });
      });

      log("dataCompany", dataCompany);

      setState({
        ...state,
        code_company: dataCompany,
      });
    }
  }, [isLoad]);

  const onSelect = (e) => {
    if (e === "all") {
      form.setFieldsValue({
        code_location: "all",
        code_dept: "all",
        code_product: "all",
      });
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
    let code = [];

    try {
      if (typeCompany === "change") {
        code = e.split(" ");
      } else {
        code.push(e);
      }

      log("code", code);

      // if (code !== "0") {
      const resProduct =
        isCodeProduct === true
          ? await MainServices.get(`product/list-by-com?code_company=${code[0]}`)
          : null;

      const resLocation =
        isCodeLocation === true
          ? await MainServices.get(`location/list-by-com?code_company=${code[0]}`)
          : null;
      const resDept = await MainServices.get(
        `department/list-dropdown?code_company=${code[0]}`
      );
      const resIcp =
        isCodeIcp === true
          ? await MainServices.get(`icp/list-dropdown?code_company=${code[0]}`)
          : null;
      const resProject =
        isCodeProject === true
          ? await MainServices.get(`project/list-by-com?code_company=${code[0]}`)
          : null;

      setState({
        ...state,
        code_product: resProduct !== null ? setProduct(resProduct) : [],
        code_location: resLocation !== null ? setLocation(resLocation) : [],
        code_dept: setDept(resDept),
        code_icp: resIcp !== null ? setIcp(resIcp) : [],
        code_project: resProject !== null ? setProject(resProject, code) : [],
      });
    } catch (err) {
      log({ err });
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
