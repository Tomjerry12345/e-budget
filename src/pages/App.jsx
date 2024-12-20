import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAsync } from "../redux/main/main.thunks";
import {
  getLocal,
  getToken,
  log,
  logObj,
  logS,
  setLocal,
} from "../values/Utilitas";

const App = () => {
  const navigate = useNavigate();

  const { isLoading, response, errorMessage, nameReducer } = useSelector(
    (state) => state.reducer
  );

  const dispatch = useDispatch();

  const auth = getLocal("auth");

  const token = getToken();

  useEffect(() => {
    dispatch(getAsync(`company/list`, "check-expired"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    logObj("response", response);
    if (response !== null) {
      const { data, responseCode } = response;

      logS("responseCode", responseCode);

      if (responseCode === 2004) {
        alert("2004");
        navigate("/login");
      } else {
        // alert("400");
        if (auth === "true" && token !== null) {
          setLocal("name-menu", "Dashboard");
          setLocal("index-menu", 0);
          setLocal("move-page", null);
          navigate("/main");
        } else {
          navigate("/login");
        }
      }
    } else {
      // alert(errorMessage);
      if (errorMessage === "Request failed with status code 500") {
        navigate("/login");
      } else if (errorMessage === "Network Error") {
        alert("jaringan tidak tersedia");
      }

      console.log(`error ${errorMessage}`);
    }
  }, [isLoading, response]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default App;
