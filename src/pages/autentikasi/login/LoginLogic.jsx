import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginAsync from "../../../redux/auth/auth.thunks";
import loadUsersAsync from "../../../redux/users/users.thunks";

const LoginLogic = () => {
  const dispatch = useDispatch();
  const { isLoading, response, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dummyReq = {
    username: "ikram",
    password: "qwerty",
  };
  useEffect(() => {
    dispatch(loginAsync(dummyReq));
  }, [dispatch]);

  useEffect(() => {
    console.log(`isLoading => ${isLoading}`);
    console.log(`response => ${JSON.stringify(response)}`);
    console.log(`errorMessage => ${errorMessage}`);
  }, [response]);

  return {
    func: {},
    value: {},
  };
};

export default LoginLogic;
