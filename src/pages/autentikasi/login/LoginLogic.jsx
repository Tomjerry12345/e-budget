import { createRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginAsync from "../../../redux/auth/auth.thunks";
import { setLocal } from "../../../values/Utilitas";

const LoginLogic = () => {
  const dispatch = useDispatch();
  const { isLoading, response, errorMessage } = useSelector(
    (state) => state.reducer
  );

  const ref = createRef();

  const navigate = useNavigate();

  useEffect(() => {
    setLocal("auth", false);
    setLocal("index-menu", null);
    if (response !== null) {
      const { responseCode, responseDescription } = response;
      if (responseCode === "200") {
        setLocal("auth", true);
        navigate("/");
      } else {
        alert(responseDescription);
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
