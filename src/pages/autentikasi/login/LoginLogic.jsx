import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginAsync from "../../../redux/auth/auth.thunks";
import { getLocal, log, setLocal } from "../../../values/Utilitas";
import { Form } from "antd";

const LoginLogic = () => {
  const dispatch = useDispatch();
  const { isLoading, response, errorMessage } = useSelector((state) => state.reducer);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);

  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    const checkedRemember = getLocal("checked-remember");
    if (checkedRemember === "true") {
      const username = getLocal("username");
      const password = getLocal("password");
      form.setFieldsValue({
        username: username,
        password: password,
      });
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  useEffect(() => {
    try {
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
          setLocal("username-get", input.username);

          if (checked) {
            setLocal("username", input.username);
            setLocal("password", input.password);
          } else {
            setLocal("username", "");
            setLocal("password", "");
          }

          setLocal("checked-remember", checked);

          navigate("/");
        } else {
          form.setFields([
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

    setInput(values);

    dispatch(loginAsync(formData));
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onCheckRemember = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
  };

  

  return {
    func: {
      onFinish,
      handleOk,
      handleCancel,
      onCheckRemember,
    },
    value: {
      open,
      form,
      checked,
    },
  };
};

export default LoginLogic;
