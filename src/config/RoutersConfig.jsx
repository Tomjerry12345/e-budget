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
import LabaRugiPage from "../pages/main/report/laba-rugi/LabaRugiPage";
import HkPage from "../pages/main/revenueCogs/hk/HkPage";
import KiuPage from "../pages/main/revenueCogs/kiu/KiuPage";
import PenjualanRevenueCogsPage from "../pages/main/revenueCogs/component/penjualan/PenjualanRevenueCogsPage";
import LainRevenueCogsPage from "../pages/main/revenueCogs/component/hpplain/LainRevenueCogsPage";
import BtsPage from "../pages/main/revenueCogs/bts/BtsPage";
import KiaPage from "../pages/main/revenueCogs/kia/KiaPage";
import BjuPage from "../pages/main/revenueCogs/bju/BjuPage";
import BltPage from "../pages/main/revenueCogs/blt/BltPage";
import BluPage from "../pages/main/revenueCogs/blu/BluPage";
import BkPage from "../pages/main/revenueCogs/bk/BkPage";
import BsuPage from "../pages/main/revenueCogs/bsu/BsuPage";
import BsbPage from "../pages/main/revenueCogs/bsb/BsbPage";
import KikPage from "../pages/main/revenueCogs/kik/KikPage";
import IkpPage from "../pages/main/revenueCogs/ikp/IkpPage";
import BandPage from "../pages/main/revenueCogs/band/BandPage";
import DepartementPage from "../pages/main/coa/departement/DepartementPage";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="revenue-cogs">
            {/* <Route path="input/Input Direct Revenue & COGS" element={<RevenueCogsInputPage />} /> */}
            <Route path="input" element={<RevenueCogsInputPage />} />
            <Route path="summary" element={<RevenueCogsSummary />} />

            <Route path="hk" element={<HkPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="kiu" element={<KiuPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="bts" element={<BtsPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="kia" element={<KiaPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="bju" element={<BjuPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="blt" element={<BltPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="blu" element={<BluPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="bk" element={<BkPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="bsu" element={<BsuPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="bsb" element={<BsbPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="kik" element={<KikPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="ikp" element={<IkpPage />}>
              <Route index path="penjualan" element={<PenjualanRevenueCogsPage />} />
              <Route path="hpplain" element={<LainRevenueCogsPage />} />
            </Route>
            <Route path="band" element={<BandPage />}>
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
          <Route path="report">
            <Route path="laba-rugi" element={<LabaRugiPage />} />
          </Route>
          <Route path="coa">
            <Route path="departement" element={<DepartementPage />} />
            <Route path=":item" element={<CoaPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
