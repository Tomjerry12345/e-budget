import { Form } from "antd";
import axios from "axios";
import { createRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginAsync from "../../../redux/auth/auth.thunks";
import { log, logS, setLocal } from "../../../values/Utilitas";

const LoginLogic = () => {
  const dispatch = useDispatch();
  const { isLoading, response, errorMessage } = useSelector(
    (state) => state.reducer
  );
  const [open, setOpen] = useState(false);

  const ref = createRef();

  const navigate = useNavigate();

  useEffect(() => {
    setLocal("auth", false);
    setLocal("index-menu", 0);
    setLocal("move-page", null);
    setLocal("token", "");
    setLocal("user_group", "");
    setLocal("code_company", "");
    setLocal("company_names", "");

    if (response !== null) {
      const {
        responseCode,
        responseDescription,
        token,
        user_group,
        code_company,
        company_names,
      } = response;
      if (responseCode === "200") {
        log(`token => ${token}`);
        setLocal("auth", true);
        setLocal("token", token);
        setLocal("user_group", user_group);
        setLocal("code_company", code_company);
        setLocal("company_names", company_names);
        navigate("/");
      } else {
        // setOpen(true);
        // form.validateFields(["password"]);
        // alert("test");
        ref.current.setFields([
          {
            name: "password",
            errors: ["Password salah"],
          },
        ]);
        logS(responseDescription);
      }
    } else {
      // setOpen(true);
      console.log(`error => ${errorMessage}`);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {
    console.log("Success:", values);
    let formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    dispatch(loginAsync(formData));
  };

  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  return {
    func: {
      onFinish,
      handleOk,
      handleCancel,
    },
    value: {
      ref,
      open,
    },
  };
};

export default LoginLogic;
