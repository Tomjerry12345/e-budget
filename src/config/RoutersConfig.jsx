import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/autentikasi/login/LoginPage";
import MainPage from "../pages/main/MainPage";
import DashboardPage from "../pages/main/dashboard/DashboardPage";
import CoaPage from "../pages/main/coa/CoaPage";
import OpexInputPage from "../pages/main/opex/input/OpexInputPage";
import OpexSummary from "../pages/main/opex/summary/OpexSummary";
import App from "../pages/App";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="opex">
            <Route path="input/:item" element={<OpexInputPage />} />
            <Route path="summary/:item" element={<OpexSummary />} />
          </Route>
          <Route path="coa">
            <Route path=":item" element={<CoaPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
