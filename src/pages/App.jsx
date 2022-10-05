import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocal, getToken } from "../values/Utilitas";

const App = () => {
  const navigate = useNavigate();
  const auth = getLocal("auth");
  const token = getToken();

  useEffect(() => {
    if (auth === "true" && token !== null) {
      navigate("/main");
    } else {
      navigate("/login");
    }
  }, [auth]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default App;
