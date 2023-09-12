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
  const { isLoading, response, errorMessage } = useSelector((state) => state.reducer);
  const [open, setOpen] = useState(false);

  const ref = createRef();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      setLocal("auth", false);
      setLocal("index-menu", 0);
      setLocal("move-page", null);
      setLocal("token", "");
      setLocal("user_group", "");
      setLocal("code_company", "");
      setLocal("company_names", "");

      log({ response });

      if (response !== null) {
        const {
          responseCode,
          token,
          user_group,
          code_company,
          code_location,
          code_department,
          company_names,
        } = response;
        if (responseCode === "200") {
          log(`token => ${token}`);
          setLocal("auth", true);
          setLocal("token", token);
          setLocal("user_group", user_group);
          setLocal("code_company", code_company);
          setLocal("code_location", code_location);
          setLocal("code_department", code_department);
          setLocal("company_names", company_names);
          navigate("/");
        } else {
          ref.current.setFields([
            {
              name: "password",
              errors: ["Password salah"],
            },
          ]);
        }
      }
    } catch (e) {
      log({ e });
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    dispatch(loginAsync(formData));
  };

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
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
