import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/autentikasi/login/LoginPage";
import MainPage from "../pages/main/MainPage";
import DashboardPage from "../pages/main/dashboard/DashboardPage";
import CoaPage from "../pages/main/coa/CoaPage";
import OpexInputPage from "../pages/main/opex/input/OpexInputPage";
import OpexSummary from "../pages/main/opex/summary/OpexSummary";
import App from "../pages/App";
import CapexSummary from "../pages/main/capex/summary/CapexSummary";
import RevenueCogsSummary from "../pages/main/revenueCogs/summary/RevenueCogsSummary";
import MppSummary from "../pages/main/mpp/summary/MppSummary";
import CapexInputPage from "../pages/main/capex/input/CapexInputPage";
import MppInputPage from "../pages/main/mpp/input/MppInputPage";
import RevenueCogsInputPage from "../pages/main/revenueCogs/input/RevenueCogsInputPage";
import OthersSummary from "../pages/main/others/summary/OthersSummary";
import OthersInputPage from "../pages/main/others/input/OthersInputPage";
import OthersInputAsumsiPage from "../pages/main/others/asumsi/OthersInputAsumsiPage";
import OthersRevenueCogsPage from "../pages/main/revenueCogs/others/OthersRevenueCogsPage";
import PenjualanRevenueCogsPage from "../pages/main/revenueCogs/others/component/penjualan/PenjualanRevenueCogsPage";
import LainRevenueCogsPage from "../pages/main/revenueCogs/others/component/hpplain/LainRevenueCogsPage";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="revenue-cogs">
            <Route path="input/:item" element={<RevenueCogsInputPage />} />
            <Route path="summary/:item" element={<RevenueCogsSummary />} />
            <Route path="others/:item" element={<OthersRevenueCogsPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
          </Route>
          <Route path="opex">
            <Route path="input/:item" element={<OpexInputPage />} />
            <Route path="summary/:item" element={<OpexSummary />} />
          </Route>
          <Route path="capex">
            <Route path="input/:item" element={<CapexInputPage />} />
            <Route path="summary/:item" element={<CapexSummary />} />
          </Route>
          <Route path="mpp">
            <Route path="input/:item" element={<MppInputPage />} />
            <Route path="summary/:item" element={<MppSummary />} />
          </Route>
          <Route path="others">
            <Route path="others-input/Input Asumsi" element={<OthersInputAsumsiPage />} />
            <Route path="input/:item" element={<OthersInputPage />} />
            <Route path="summary/:item" element={<OthersSummary />} />
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
