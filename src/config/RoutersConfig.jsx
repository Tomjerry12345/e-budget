import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/autentikasi/login/LoginPage";
import MainPage from "../pages/main/MainPage";
import DashboardPage from "../pages/main/dashboard/DashboardPage";
import CoaSummary from "../pages/main/coa/summary/CoaSummary";
import CoaInputPage from "../pages/main/coa/input/CoaInputPage";
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
            <Route path="input/:item" element={<CoaInputPage />} />
            <Route path="summary/:item" element={<CoaSummary />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
