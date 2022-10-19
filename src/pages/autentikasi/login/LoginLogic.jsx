import axios from "axios";
import { createRef } from "react";
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

  const ref = createRef();

  const navigate = useNavigate();

  useEffect(() => {
    setLocal("auth", false);
    setLocal("index-menu", 0);
    setLocal("move-page", null);
    setLocal("token", "");

    if (response !== null) {
      const { responseCode, responseDescription, token } = response;
      if (responseCode === "200") {
        log(`token => ${token}`);
        setLocal("auth", true);
        setLocal("token", token);
        navigate("/");
      } else {
        logS(responseDescription);
      }
    } else {
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

  return {
    func: {
      onFinish,
    },
    value: {
      ref,
    },
  };
};

export default LoginLogic;
