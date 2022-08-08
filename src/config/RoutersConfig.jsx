import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/autentikasi/login/LoginPage";
import MainPage from "../pages/main/MainPage";
import DashboardPage from "../pages/main/dashboard/DashboardPage";
import CoaInput from "../pages/main/coa/input/CoaInput";
import CoaSummary from "../pages/main/coa/summary/CoaSummary";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="coa">
            <Route path="input/:item" element={<CoaInput />} />
            <Route path="summary/:item" element={<CoaSummary />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
