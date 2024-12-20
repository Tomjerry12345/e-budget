/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from "antd";
import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { getLocal, log } from "values/Utilitas";
import { useDispatch } from "react-redux";
import { actionData } from "redux/data-global/data.reducer";

const FilterComponentLogic = ({
  isCodeLocation,
  isCodeIcp,
  isCodeDept,
  codeCompany,
  type,
  typeCompany,
  typeFilter,
  isCompanyAll,
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

  const userGroup = getLocal("user_group");
  const company = getLocal("code_company");
  const company_names = getLocal("company_names");
  const code_location = getLocal("code_location");
  const code_dept = getLocal("code_department");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await MainServices.get("company/list-child");

      if (data.responseCode === 200) {
        if (isCompanyAll) {
          data.data.unshift({ description: "ALL" });
        }

        log("data.data", data.data);
        setState({
          ...state,
          code_company: data.data,
        });

        dispatch(actionData({ listCompany: data.data }));

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
    const fetchData = async (q) => {
      const { data } = await MainServices.get("company/list-child");

      const arr = data.data;
      const listCompany = [];

      if (data.responseCode === 200) {
        log({ q });
        q.forEach((code) => {
          let obj = arr.find((o) => o.code === code);
          listCompany.push(obj);
        });
        setState({
          ...state,
          code_company: listCompany,
        });

        // dispatch(actionData({ listCompany: listCompany }));

        // setIsLoad(true);
      }
    };

    if (userGroup !== "" || userGroup !== undefined || userGroup !== "null") {
      if (userGroup === "sbu") {
        if (company_names !== null) {
          let dataLocation = [];
          let dataDept = [];

          form.setFieldsValue({
            code_company: `${company} - ${company_names}`,
          });

          if (code_location !== "null") {
            code_location.split(",").forEach((v, i) => {
              dataLocation.push(v);
            });

            // form.setFieldsValue({
            //   code_location,
            // });
          }

          if (code_dept !== "null") {
            code_dept.split(",").forEach((v, i) => {
              dataDept.push(v);
            });

            // form.setFieldsValue({
            //   code_dept,
            // });
          }

          getValueComboBox(company, dataLocation, dataDept);
        }
      } else if (userGroup === "subholding") {
        let dataCompany = [];

        company.split(",").forEach((v, i) => {
          dataCompany.push(v);
        });

        fetchData(dataCompany);
      }
    }
  }, [isLoad]);

  useEffect(() => {
    if (type === "summary") {
      form.setFieldsValue({
        code_product: `ALL`,
        code_location: `ALL`,
        code_dept: `ALL`,
        code_icp: `ALL`,
        code_project: `ALL`,
      });
    }
  }, []);

  const onSelect = (e) => {
    log({ e });

    if (e === "ALL") {
      form.setFieldsValue({
        code_product: "ALL",
        code_location: "ALL",
        code_dept: "ALL",
        code_icp: "ALL",
        code_project: "ALL",
      });
      formGlobal.setFieldsValue({
        code_product: "ALL",
        code_location: "ALL",
        code_dept: "ALL",
        code_icp: "ALL",
        code_project: "ALL",
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

  const getValueComboBox = async (e, dataLocation = null, dataDept = null) => {
    let code = [];

    try {
      if (typeCompany === "change") {
        code = e.split(" ");
      } else {
        code.push(e);
      }

      // const resProduct =
      //   isCodeProduct === true
      //     ? await MainServices.get(`product/list-by-com?code_company=${code[0]}`)
      //     : null;
      const resProduct = await MainServices.get(`product/list-by-com?code_company=${code[0]}`);

      const resLocation =
        isCodeLocation === true
          ? await MainServices.get(`location/list-by-com?code_company=${code[0]}`)
          : null;
      const resDept =
        isCodeDept === true
          ? await MainServices.get(`department/list-dropdown?code_company=${code[0]}`)
          : null;
      const resIcp =
        isCodeIcp === true
          ? await MainServices.get(`icp/list-dropdown?code_company=${code[0]}`)
          : null;
      const resProject = await MainServices.get(`project/list-by-com?code_company=${code[0]}`);

      setState({
        ...state,
        code_product: setProduct(resProduct),
        code_location: resLocation !== null ? setLocation(resLocation, dataLocation) : [],
        code_dept: resDept !== null ? setDept(resDept, dataDept) : [],
        code_icp: resIcp !== null ? setIcp(resIcp) : [],
        code_project: setProject(resProject),
      });
    } catch (err) {
      log({ err });
    }
  };

  const setProduct = (resProduct) => {
    let data;

    if (type === "input") {
      data = resProduct.data.data.filter((item) => item.code !== "all");
      if (typeFilter === "hpp-pendapatan") {
        data.shift();
      }
    } else {
      data = resProduct.data.data;
    }

    return data;
  };

  const setLocation = (resLocation, dataLocation) => {
    let data;

    if (type === "input") {
      if (dataLocation !== null) {
        data = resLocation.data.data.filter((item) =>
          dataLocation.map((e) => item.code === e).includes(true)
        );
      } else {
        data = resLocation.data.data.filter((item) => item.code !== "all");
      }
    } else {
      data = resLocation.data.data;
    }
    return data;
  };

  const setDept = (resDept, dataDept) => {
    let data;

    if (type === "input") {
      if (dataDept !== null) {
        data = resDept.data.data.filter((item) =>
          dataDept.map((e) => item.code === e).includes(true)
        );
      } else {
        data = resDept.data.data.filter((item) => item.code !== "all");
      }
    } else {
      data = resDept.data.data;
    }

    return data;
  };

  const setIcp = (resIcp) => {
    let data;

    if (type === "input") {
      data = resIcp.data.data.filter((item) => item.code !== "all");
    } else {
      data = resIcp.data.data;
    }
    return data;
  };

  const setProject = (resProject) => {
    let data;

    if (type === "input") {
      data = resProject.data.data.filter((item) => item.code !== "all");
      if (typeFilter === "not-show-first-filter-project") {
        data.shift();
      }
    } else {
      data = resProject.data.data;
    }
    return data;
  };

  return {
    value: {
      state,
      form,
      code_location,
      code_dept,
    },
    func: {
      onSelect,
      onReset,
    },
  };
};

export default FilterComponentLogic;
