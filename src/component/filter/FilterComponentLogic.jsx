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

    log("codeCompany", codeCompany);

    fetchData();

    // if (codeCompany === null) {
    //   fetchData();
    // } else {
    //   getValueComboBox(codeCompany, true);
    // }
  }, [codeCompany]);

  useEffect(() => {
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
    const code = isNaN(e) ? e.replace(/[^0-9]/g, "") : e;

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
          ? await MainServices.get(`product/list-by-com?code_company=${code}`)
          : null;

      const resLocation = await MainServices.get(
        `location/list-by-com?code_company=${code}`
      );
      const resDept = await MainServices.get(
        `dept/list-dropdown?code_company=${code}`
      );
      const resIcp =
        isCodeIcp === true
          ? await MainServices.get(`icp/list-dropdown?code_company=${code}`)
          : null;
      const resProject =
        isCodeProject === true
          ? await MainServices.get(`project/list-by-com?code_company=${code}`)
          : null;

      log("resProject", resProject);

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
    // const formatResProduct = [];
    // resProduct.data.data.forEach((element) => {
    //   formatResProduct.push({
    //     code: element.code_product,
    //     title: element.description,
    //   });
    // });
    // return formatResProduct;
    return resProduct.data.data;
  };

  const setLocation = (resLocation) => {
    // const formatResLocation = [
    //   {
    //     title: "all",
    //     code: "",
    //   },
    // ];
    // resLocation.data.data.forEach((element) => {
    //   formatResLocation.push({
    //     code: element.code_location,
    //     title: element.description,
    //   });
    // });
    // return formatResLocation;
    return resLocation.data.data;
  };

  const setDept = (resDept) => {
    // const formatResDept = [
    //   {
    //     title: "all",
    //     code: "",
    //   },
    // ];
    // resDept.data.data.forEach((element) => {
    //   formatResDept.push({
    //     code: element.code_dept,
    //     title: element.description,
    //   });
    // });
    // return formatResDept;
    return resDept.data.data;
  };

  const setIcp = (resIcp) => {
    // const formatResIcp = [
    //   {
    //     title: "all",
    //     code: "",
    //   },
    // ];
    // resIcp.data.data.forEach((element) => {
    //   formatResIcp.push({
    //     code: element.code_location,
    //     title: element.description,
    //   });
    // });
    // return formatResIcp;
    return resIcp.data.data;
  };

  const setProject = (resProject, c) => {
    // const formatResProject = [
    //   {
    //     title: "all",
    //     code: "",
    //   },
    // ];
    // const data = resProject.data.data;

    // log("dataProject", data);

    // data.forEach((element) => {
    //   let perusahaan;

    //   if (keyCodeProject === "default") {
    //     if (c === "231") {
    //       perusahaan = element.BAND;
    //     } else if (c === "241") {
    //       perusahaan = element.KIK;
    //     } else if (c === "312") {
    //       perusahaan = element.BJU;
    //     } else if (c === "413") {
    //       perusahaan = element.BSB;
    //     }
    //   } else if (keyCodeProject === "BJU") {
    //     perusahaan = element.BJU;
    //   }

    //   if (perusahaan === "1") {
    //     formatResProject.push({
    //       code: element.code_project,
    //       title: element.description,
    //     });
    //   }
    // });

    // return formatResProject;
    return resProject.data.data;
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
