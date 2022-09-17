import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocal } from "../values/Utilitas";

const App = () => {
  const navigate = useNavigate();
  const auth = getLocal("auth");

  useEffect(() => {
    console.log(`auth => ${auth}`);
    if (auth === "true") {
      navigate("/main");
    } else {
      navigate("/login");
    }
  }, [auth]);
};

export default App;
