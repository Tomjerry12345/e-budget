import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "pages/autentikasi/login/LoginPage";
import MainPage from "pages/main/MainPage";
import DashboardPage from "pages/main/dashboard/DashboardPage";
import App from "pages/App";
import RevenueCogsSummary from "pages/main/revenueCogs/summary/RevenueCogsSummary";
import RevenueCogsInputPage from "pages/main/revenueCogs/input/RevenueCogsInputPage";
import OthersInputAsumsiPage from "pages/main/others/asumsi/OthersInputAsumsiPage";
import LabaRugiPage from "pages/main/report/laba-rugi/LabaRugiPage";
import CashFlowPage from "pages/main/report/cash-flow/CashFlowPage";
import NeracaPage from "pages/main/report/neraca/NeracaPage";
import HkPage from "pages/main/revenueCogs/hk/HkPage";
import KiuPage from "pages/main/revenueCogs/kiu/KiuPage";
import KiaPage from "pages/main/revenueCogs/kia/KiaPage";
import BjuPage from "pages/main/revenueCogs/bju/BjuPage";
import BltPage from "pages/main/revenueCogs/blt/BltPage";
import BluPage from "pages/main/revenueCogs/blu/BluPage";
import BkPage from "pages/main/revenueCogs/bk/BkPage";
import BsuPage from "pages/main/revenueCogs/bsu/BsuPage";
import BsbPage from "pages/main/revenueCogs/bsb/BsbPage";
import KikPage from "pages/main/revenueCogs/kik/KikPage";
import IkpPage from "pages/main/revenueCogs/ikp/IkpPage";
import BandPage from "pages/main/revenueCogs/band/BandPage";
import PenjualanHkPage from "pages/main/revenueCogs/hk/tabs/penjualan/PenjualanHkPage";
import LainHkPage from "pages/main/revenueCogs/hk/tabs/hpplain/LainHkPage";
import PenjualanBjuPage from "pages/main/revenueCogs/bju/tabs/penjualan/PenjualanBjuPage";
import LainBjuPage from "pages/main/revenueCogs/bju/tabs/hpplain/LainBjuPage";
import PenjualanBkPage from "pages/main/revenueCogs/bk/tabs/penjualan/PenjualanBkPage";
import LainBkPage from "pages/main/revenueCogs/bk/tabs/hpplain/LainBkPage";
import CompanyPage from "pages/main/coa/company/CompanyPage";
import ProductPage from "pages/main/coa/product/ProductPage";
import DepartementPage from "pages/main/coa/departement/DepartementPage";
import AkunPage from "pages/main/coa/akun/AkunPage";
import ProjectPage from "pages/main/coa/project/ProjectPage";
import IcpPage from "pages/main/coa/icp/IcpPage";
import LocationPage from "pages/main/coa/location/LocationPage";
import InputDirectAllPage from "pages/main/others/input/direct-all/InputDirectAllPage";
import GmmPage from "pages/main/revenueCogs/gmm/GmmPage";
import PenjualanGmmPage from "pages/main/revenueCogs/gmm/tabs/penjualan/PenjualanGmmPage";
import LainGmmPage from "pages/main/revenueCogs/gmm/tabs/hpplain/LainGmmPage";
import PenjualanKiaPage from "pages/main/revenueCogs/kia/tabs/penjualan/PenjualanKiaPage";
import LainKiaPage from "pages/main/revenueCogs/kia/tabs/hpplain/LainKiaPage";
import PenjualanBltPage from "pages/main/revenueCogs/blt/tabs/penjualan/PenjualanBltPage";
import LainBltPage from "pages/main/revenueCogs/blt/tabs/hpplain/LainBltPage";
import PenjualanBluPage from "pages/main/revenueCogs/blu/tabs/penjualan/PenjualanBluPage";
import LainBluPage from "pages/main/revenueCogs/blu/tabs/hpplain/LainBluPage";
import PenjualanBsuPage from "pages/main/revenueCogs/bsu/tabs/penjualan/PenjualanBsuPage";
import LainBsuPage from "pages/main/revenueCogs/bsu/tabs/hpplain/LainBsuPage";
import PenjualanBsbPage from "pages/main/revenueCogs/bsb/tabs/penjualan/PenjualanBsbPage";
import LainBsbPage from "pages/main/revenueCogs/bsb/tabs/hpplain/LainBsbPage";
import PenjualanKikPage from "pages/main/revenueCogs/kik/tabs/penjualan/PenjualanKikPage";
import LainKikPage from "pages/main/revenueCogs/kik/tabs/hpplain/LainKikPage";
import PenjualanIkpPage from "pages/main/revenueCogs/ikp/tabs/penjualan/PenjualanIkpPage";
import LainIkpPage from "pages/main/revenueCogs/ikp/tabs/hpplain/LainIkpPage";
import PenjualanBandPage from "pages/main/revenueCogs/band/tabs/penjualan/PenjualanBandPage";
import LainBandPage from "pages/main/revenueCogs/band/tabs/hpplain/LainBandPage";
import DirectAllSummary from "pages/main/others/summary/direct-all/DIrectAllSummary";
import IklanAdvertensiInputPage from "pages/main/opex/input/iklan-advertensi/IklanAdvertensiInputPage";
import PemeliharaanInputPage from "pages/main/opex/input/pemeliharaan/PemeliharaanInputPage";
import PerlengkapanKantorInputPage from "pages/main/opex/input/perlengkapan-kantor/PerlengkapanKantorInputPage";
import OpexInputPage from "pages/main/opex/input/input-opex/OpexInputPage";
import OpexSummary from "pages/main/opex/summary/summary-opex/OpexSummary";
import IklanAdvertensiSummaryPage from "pages/main/opex/summary/iklan-advertensi/IklanAdvertensiSummaryPage";
import PemeliharaanSummaryPage from "pages/main/opex/summary/pemeliharaan/PemeliharaanSummaryPage";
import PerlengkapanKantorSummaryPage from "pages/main/opex/summary/perlengkapan-kantor/PerlengkapanKantorSummaryPage";
import PengirimanDokumenSummaryPage from "pages/main/opex/summary/pengiriman-dokumen/PengirimanDokumenSummaryPage";
import FcCetakJilidSummaryPage from "pages/main/opex/summary/fc-cetak-jilid/FcCetakJilidSummaryPage";
import SuratKabarSummaryPage from "pages/main/opex/summary/surat-kabar/SuratKabarSummaryPage";
import PantriSummaryPage from "pages/main/opex/summary/pantri/PantriSummaryPage";
import TenderSummaryPage from "pages/main/opex/summary/tender/TenderSummaryPage";
import KontraktualRapatClearanceSummaryPage from "pages/main/opex/summary/kontraktual-rapat-clearance/KontraktualRapatClearanceSummaryPage";
import TransportasiSummaryPage from "pages/main/opex/summary/transportasi/TransportasiSummaryPage";
import PerjalananDinasSummaryPage from "pages/main/opex/summary/perjalanan-dinas/PerjalananDinasSummaryPage";
import PajakParkirRestoSummaryPage from "pages/main/opex/summary/pajak-parkir-resto/PajakParkirRestoSummaryPage";
import PengirimanDokumenInputPage from "pages/main/opex/input/pengiriman-dokumen/PengirimanDokumenInputPage";
import FcCetakJilidInputPage from "pages/main/opex/input/fc-cetak-jilid/FcCetakJilidInputPage";
import SuratKabarInputPage from "pages/main/opex/input/surat-kabar/SuratKabarInputPage";
import PantriInputPage from "pages/main/opex/input/pantri/PantriInputPage";
import TenderInputPage from "pages/main/opex/input/tender/TenderInputPage";
import KontraktualRapatClearanceInputPage from "pages/main/opex/input/kontraktual-rapat-clearance/KontraktualRapatClearanceInputPage";
import TransportasiInputPage from "pages/main/opex/input/transportasi/TransportasiInputPage";
import PerjalananDinasInputPage from "pages/main/opex/input/perjalanan-dinas/PerjalananDinasInputPage";
import PajakParkirRestoInputPage from "pages/main/opex/input/pajak-parkir-resto/PajakParkirRestoInputPage";
import PajakKendaraanInputPage from "pages/main/opex/input/pajak-kendaraan/PajakKendaraanInputPage";
import PajakInputPage from "pages/main/opex/input/pajak/PajakInputPage";
import IzinKonsultanInputPage from "pages/main/opex/input/izin-konsutan/IzinKonsultanInputPage";
import PemasaranLainnyaInputPage from "pages/main/opex/input/pemasaran-lainnya/PemasaranLainnyaInputPage";
import AdministrasiLainnyaInputPage from "pages/main/opex/input/administrasi-lainnya/AdministrasiLainnyaInputPage";
import BbmTolParkirInputPage from "pages/main/opex/input/bbm-tol-parkir/BbmTolParkirInputPage";
import PajakKendaraanSummaryPage from "pages/main/opex/summary/pajak-kendaraan/PajakKendaraanSummaryPage";
import PajakSummaryPage from "pages/main/opex/summary/pajak/PajakSummaryPage";
import IzinkonsultanSummaryPage from "pages/main/opex/summary/izin-konsultan/IzinkonsultanSummaryPage";
import PemasaranLainnyaSummaryPage from "pages/main/opex/summary/pemasaran-lainnya/PemasaranLainnyaSummaryPage";
import AdministrasiLainnyaSummaryPage from "pages/main/opex/summary/administrasi-lainnya/AdministrasiLainnyaSummaryPage";
import SewaSummaryPage from "pages/main/opex/summary/sewa/SewaSummaryPage";
import ListrikAirTelefonSummaryPage from "pages/main/opex/summary/listrik-air-telefon/ListrikAirTelefonSummaryPage";
import AsuransiSummaryPage from "pages/main/opex/summary/asuransi/AsuransiSummaryPage";
import KeamananKebersihanSummaryPage from "pages/main/opex/summary/keamanan-kebersihan/KeamananKebersihanSummaryPage";
import BbmTolParkirSummaryPage from "pages/main/opex/summary/bbm-tol-parkir/BbmTolParkirSummaryPage";
import SewaInputPage from "pages/main/opex/input/sewa/SewaInputPage";
import ListrikAirTeleponInputPage from "pages/main/opex/input/listrik-air-telepon/ListrikAirTeleponInputPage";
import AsuransiInputPage from "pages/main/opex/input/asuransi/AsuransiInputPage";
import KeamananKebersihanInputPage from "pages/main/opex/input/keamanan-kebersihan/KeamananKebersihanInputPage";
import InternetInputPage from "pages/main/opex/input/internet/InternetInputPage";
import InternetSummaryPage from "pages/main/opex/summary/internet/InternetSummaryPage";
import CapexInputPage from "pages/main/capex/input/input-capex/CapexInputPage";
import NewAsetInputPage from "pages/main/capex/input/new-aset/NewAsetInputPage";

import LoadSaldoAwalPage from "pages/main/capex/input/load-saldo-awal/LoadSaldoAwalPage";
import ExistingAsetSummaryPage from "pages/main/capex/summary/existing-aset/ExistingAsetSummaryPage";
import PenyusutanExistingAsetSummaryPage from "pages/main/capex/summary/penyusutan-existing-aset/PenyusutanExistingAsetSummaryPage";
import SaldoAwalAkumulasiPenyusutanSummaryPage from "pages/main/capex/summary/saldo-awal-akumulasi-penyusutan/SaldoAwalAkumulasiPenyusutanSummaryPage";
import NewAsetSummaryPage from "pages/main/capex/summary/new-aset/NewAsetSummaryPage";
import PenyusutanNewAsetSummaryPage from "pages/main/capex/summary/penyusutan-new-aset/PenyusutanNewAsetSummaryPage";
import AkumulasiPenyusutanNewAsetSummaryPage from "pages/main/capex/summary/akumulasi-penyusutan-new-aset/AkumulasiPenyusutanNewAsetSummaryPage";
import DisposalAsetSummaryPage from "pages/main/capex/summary/disposal-aset/DisposalAsetSummaryPage";
import NilaiJualAsetSummaryPage from "pages/main/capex/summary/nilai-jual-aset/NilaiJualAsetSummaryPage";
import PenyusutanDisposalAsetSummaryPage from "pages/main/capex/summary/penyusutan-disposal-aset/PenyusutanDisposalAsetSummaryPage";
import AkumulasiPenyusutanDisposalAsetSummaryPage from "pages/main/capex/summary/akumulasi-penyusutan-disposal-aset/AkumulasiPenyusutanDisposalAsetSummaryPage";
import TotalAsetSummaryPage from "pages/main/capex/summary/total-aset/TotalAsetSummaryPage";
import TotalPenyusutanSummaryPage from "pages/main/capex/summary/total-penyusutan/TotalPenyusutanSummaryPage";
import TotalAkumulasiPenyusutanSummaryPage from "pages/main/capex/summary/total-akumulasi-penyusutan/TotalAkumulasiPenyusutanSummaryPage";
import RateAsumptionPage from "pages/main/mpp/input/rate-asumption/RateAsumptionPage";
import GeneralAsumptionPage from "pages/main/mpp/input/general-asumption/GeneralAsumptionPage";
import RateSalaryPage from "pages/main/mpp/input/rate-salary/RateSalaryPage";
import HeadcountSalaryPage from "pages/main/mpp/input/headcount-salary/HeadcountSalaryPage";
import HeadcountAsumptionPage from "pages/main/mpp/input/headcount-asumption/HeadcountAsumptionPage";
import BiayaPph21Page from "pages/main/mpp/input/biaya-pph21/BiayaPph21Page";
import BpjsPage from "pages/main/mpp/input/bpjs/BpjsPage";
import DaysPage from "pages/main/mpp/input/days/DaysPage";
import JamLemburPage from "pages/main/mpp/input/jam-lembur/JamLemburPage";
import UniformSafetyPage from "pages/main/mpp/input/uniform-safety/UniformSafetyPage";
import BiayaPengobatanPage from "pages/main/mpp/input/biaya-pengobatan/BiayaPengobatanPage";
import BiayaPendidikanLatihanPage from "pages/main/mpp/input/biaya-pendidikan-latihan/BiayaPendidikanLatihanPage";
import BiayaRekrutmentAssessmentPage from "pages/main/mpp/input/biaya-rekrutment-assessment/BiayaRekrutmentAssessmentPage";
import MppLainnyaPage from "pages/main/mpp/input/mpp-lainnya/MppLainnyaPage";
import MppInputPage from "pages/main/mpp/input/direct/MppInputPage";
import MppSummary from "pages/main/mpp/summary/summary/MppSummary";
import CapexSummary from "pages/main/capex/summary/capex-summary/CapexSummary";
import BiayaNonOperasionalSummary from "pages/main/others/summary/biaya-non-operasional/BiayaNonOperasionalSummary";
import PendapatanNonOperasionalSummary from "pages/main/others/summary/pendapatan-non-operasional/PendapatanNonOperasionalSummary";
import PendapatanNonOperasionalPage from "pages/main/others/input/pendapatan-non-operasional/PendapatanNonOperasionalPage";
import BiayaNonOperasionalPage from "pages/main/others/input/biaya-non-operasional/BiayaNonOperasionalPage";
import GajiSummary from "pages/main/mpp/summary/gaji/GajiSummary";
import LemburSummary from "pages/main/mpp/summary/lembur/LemburSummary";
import UniformSafetySummary from "pages/main/mpp/summary/uniform-safety/UniformSafetySummary";
import MakanMinumSummary from "pages/main/mpp/summary/makan-minum/MakanMinumSummary";
import PengobatanSummary from "pages/main/mpp/summary/pengobatan/PengobatanSummary";
import Pph21Summary from "pages/main/mpp/summary/pph-21/Pph21Summary";
import BpjsTkSummary from "pages/main/mpp/summary/bpjs-tk/BpjsTkSummary";
import BpjsKesehatanSummary from "pages/main/mpp/summary/bpjs-kesehatan/BpjsKesehatanSummary";
import KomunikasiSummary from "pages/main/mpp/summary/komunikasi/KomunikasiSummary";
import PendidikanPelatihanSummary from "pages/main/mpp/summary/pendidikan-pelatihan/PendidikanPelatihanSummary";
import RekrutmentAssessmentSummary from "pages/main/mpp/summary/rekrutment-assesment/RekrutmentAssessmentSummary";
import MppLainnyaSummary from "pages/main/mpp/summary/mpp-lainnya/MppLainnyaSummary";
import ManagementUserPage from "pages/main/management-user/ManagementUserPage";
import ProfilePage from "pages/main/akun/profile/ProfilePage";
import LainKiuPage from "pages/main/revenueCogs/kiu/tabs/hpplain/LainKiuPage";
import TransportasiMppSummary from "pages/main/mpp/summary/transportasi/TransportasiMppSummary";
import PenjualanKiuPage from "pages/main/revenueCogs/kiu/tabs/penjualan/PenjualanKiuPage";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="revenue-cogs">
            <Route path="input/direct" element={<RevenueCogsInputPage />} />
            <Route path="summary/direct" element={<RevenueCogsSummary />} />

            <Route path="hk" element={<HkPage />}>
              <Route index path="penjualan/" element={<PenjualanHkPage />} />
              <Route path="hpplain/" element={<LainHkPage />} />
            </Route>
            <Route path="kiu" element={<KiuPage />}>
              <Route index path="penjualan/" element={<PenjualanKiuPage />} />
              <Route path="hpplain/" element={<LainKiuPage />} />
            </Route>
            <Route path="gmm" element={<GmmPage />}>
              <Route index path="penjualan/" element={<PenjualanGmmPage />} />
              <Route path="hpplain/" element={<LainGmmPage />} />
            </Route>
            <Route path="kia" element={<KiaPage />}>
              <Route index path="penjualan/" element={<PenjualanKiaPage />} />
              <Route path="hpplain/" element={<LainKiaPage />} />
            </Route>
            <Route path="bju" element={<BjuPage />}>
              <Route index path="penjualan" element={<PenjualanBjuPage />} />
              <Route path="hpplain" element={<LainBjuPage />} />
            </Route>
            <Route path="blt" element={<BltPage />}>
              <Route index path="penjualan/" element={<PenjualanBltPage />} />
              <Route path="hpplain/" element={<LainBltPage />} />
            </Route>
            <Route path="blu" element={<BluPage />}>
              <Route index path="penjualan/" element={<PenjualanBluPage />} />
              <Route path="hpplain/" element={<LainBluPage />} />
            </Route>
            <Route path="bk" element={<BkPage />}>
              <Route index path="penjualan" element={<PenjualanBkPage />} />
              <Route path="hpplain" element={<LainBkPage />} />
            </Route>
            <Route path="bsu" element={<BsuPage />}>
              <Route index path="penjualan/" element={<PenjualanBsuPage />} />
              <Route path="hpplain/" element={<LainBsuPage />} />
            </Route>
            <Route path="bsb" element={<BsbPage />}>
              <Route index path="penjualan/" element={<PenjualanBsbPage />} />
              <Route path="hpplain/" element={<LainBsbPage />} />
            </Route>
            <Route path="kik" element={<KikPage />}>
              <Route index path="penjualan/" element={<PenjualanKikPage />} />
              <Route path="hpplain/" element={<LainKikPage />} />
            </Route>
            <Route path="ikp" element={<IkpPage />}>
              <Route index path="penjualan/" element={<PenjualanIkpPage />} />
              <Route path="hpplain/" element={<LainIkpPage />} />
            </Route>
            <Route path="band" element={<BandPage />}>
              <Route index path="penjualan/" element={<PenjualanBandPage />} />
              <Route path="hpplain/" element={<LainBandPage />} />
            </Route>
          </Route>
          <Route path="opex">
            <Route
              path="input/iklan-advertensi"
              element={<IklanAdvertensiInputPage />}
            />
            <Route
              path="input/pemasaran-lainnya"
              element={<PemasaranLainnyaInputPage />}
            />
            <Route path="input/sewa" element={<SewaInputPage />} />
            <Route
              path="input/pemeliharaan"
              element={<PemeliharaanInputPage />}
            />
            <Route
              path="input/perlengkapan-kantor"
              element={<PerlengkapanKantorInputPage />}
            />
            <Route
              path="input/pengiriman-dokumen"
              element={<PengirimanDokumenInputPage />}
            />
            <Route
              path="input/fc-cetak-jilid"
              element={<FcCetakJilidInputPage />}
            />
            <Route
              path="input/listrik-air-telefon"
              element={<ListrikAirTeleponInputPage />}
            />
            <Route path="input/surat-kabar" element={<SuratKabarInputPage />} />
            <Route path="input/pantri" element={<PantriInputPage />} />
            <Route path="input/asuransi" element={<AsuransiInputPage />} />
            <Route
              path="input/keamanan-kebersihan"
              element={<KeamananKebersihanInputPage />}
            />
            <Route path="input/internet" element={<InternetInputPage />} />
            <Route path="input/tender" element={<TenderInputPage />} />
            <Route
              path="input/kontraktual-rapat-clearance"
              element={<KontraktualRapatClearanceInputPage />}
            />
            <Route
              path="input/bbm-tol-parkir"
              element={<BbmTolParkirInputPage />}
            />
            <Route
              path="input/transportasi"
              element={<TransportasiInputPage />}
            />
            <Route
              path="input/perjalanan-dinas"
              element={<PerjalananDinasInputPage />}
            />
            <Route
              path="input/pajak-kendaraan"
              element={<PajakKendaraanInputPage />}
            />
            <Route path="input/pajak" element={<PajakInputPage />} />
            <Route
              path="input/pajak-parkir-resto"
              element={<PajakParkirRestoInputPage />}
            />
            <Route
              path="input/izin-konsultan"
              element={<IzinKonsultanInputPage />}
            />
            <Route
              path="input/administrasi-lainnya"
              element={<AdministrasiLainnyaInputPage />}
            />
            <Route path="input/opex" element={<OpexInputPage />} />

            <Route
              path="summary/iklan-advertensi"
              element={<IklanAdvertensiSummaryPage />}
            />
            <Route path="summary/sewa" element={<SewaSummaryPage />} />
            <Route
              path="summary/pemasaran-lainnya"
              element={<PemasaranLainnyaSummaryPage />}
            />
            <Route
              path="summary/pemeliharaan"
              element={<PemeliharaanSummaryPage />}
            />
            <Route
              path="summary/perlengkapan-kantor"
              element={<PerlengkapanKantorSummaryPage />}
            />
            <Route
              path="summary/pengiriman-dokumen"
              element={<PengirimanDokumenSummaryPage />}
            />
            <Route
              path="summary/fc-cetak-jilid"
              element={<FcCetakJilidSummaryPage />}
            />
            <Route
              path="summary/listrik-air-telefon"
              element={<ListrikAirTelefonSummaryPage />}
            />
            <Route
              path="summary/surat-kabar"
              element={<SuratKabarSummaryPage />}
            />
            <Route path="summary/pantri" element={<PantriSummaryPage />} />
            <Route path="summary/asuransi" element={<AsuransiSummaryPage />} />
            <Route
              path="summary/keamanan-kebersihan"
              element={<KeamananKebersihanSummaryPage />}
            />
            <Route path="summary/internet" element={<InternetSummaryPage />} />
            <Route path="summary/tender" element={<TenderSummaryPage />} />
            <Route
              path="summary/kontraktual-rapat-clearance"
              element={<KontraktualRapatClearanceSummaryPage />}
            />
            <Route
              path="summary/bbm-tol-parkir"
              element={<BbmTolParkirSummaryPage />}
            />
            <Route
              path="summary/transportasi"
              element={<TransportasiSummaryPage />}
            />
            <Route
              path="summary/perjalanan-dinas"
              element={<PerjalananDinasSummaryPage />}
            />
            <Route
              path="summary/pajak-kendaraan"
              element={<PajakKendaraanSummaryPage />}
            />
            <Route path="summary/pajak" element={<PajakSummaryPage />} />
            <Route
              path="summary/pajak-parkir-resto"
              element={<PajakParkirRestoSummaryPage />}
            />
            <Route
              path="summary/izin-konsultan"
              element={<IzinkonsultanSummaryPage />}
            />
            <Route
              path="summary/administrasi-lainnya"
              element={<AdministrasiLainnyaSummaryPage />}
            />
            <Route path="summary/opex" element={<OpexSummary />} />
          </Route>
          <Route path="capex">
            <Route
              path="input/load-saldo-awal"
              element={<LoadSaldoAwalPage />}
            />
            <Route path="input/new-aset" element={<NewAsetInputPage />} />
            <Route path="input/direct-capex" element={<CapexInputPage />} />
            <Route
              path="summary/existing-aset"
              element={<ExistingAsetSummaryPage />}
            />
            <Route
              path="summary/penyusutan-existing-aset"
              element={<PenyusutanExistingAsetSummaryPage />}
            />
            <Route
              path="summary/saldo-awal-akumulasi-penyusutan"
              element={<SaldoAwalAkumulasiPenyusutanSummaryPage />}
            />
            <Route path="summary/new-aset" element={<NewAsetSummaryPage />} />
            <Route
              path="summary/penyusutan-new-aset"
              element={<PenyusutanNewAsetSummaryPage />}
            />
            <Route
              path="summary/akumulasi-penyusutan-new-aset"
              element={<AkumulasiPenyusutanNewAsetSummaryPage />}
            />
            <Route
              path="summary/disposal-aset"
              element={<DisposalAsetSummaryPage />}
            />
            <Route
              path="summary/nilai-jual-aset"
              element={<NilaiJualAsetSummaryPage />}
            />
            <Route
              path="summary/penyusutan-disposal-aset"
              element={<PenyusutanDisposalAsetSummaryPage />}
            />
            <Route
              path="summary/akumulasi-penyusutan-disposal-aset"
              element={<AkumulasiPenyusutanDisposalAsetSummaryPage />}
            />
            <Route
              path="summary/total-aset"
              element={<TotalAsetSummaryPage />}
            />
            <Route
              path="summary/total-penyusutan"
              element={<TotalPenyusutanSummaryPage />}
            />
            <Route
              path="summary/total-akumulasi-penyusutan"
              element={<TotalAkumulasiPenyusutanSummaryPage />}
            />
            <Route path="summary/capex" element={<CapexSummary />} />
          </Route>
          <Route path="mpp">
            <Route
              path="input/general-asumption"
              element={<GeneralAsumptionPage />}
            />
            <Route
              path="input/rate-asumption"
              element={<RateAsumptionPage />}
            />
            <Route path="input/rate-salary" element={<RateSalaryPage />} />
            <Route
              path="input/headcount-salary"
              element={<HeadcountSalaryPage />}
            />
            <Route
              path="input/headcount-asumption"
              element={<HeadcountAsumptionPage />}
            />
            <Route path="input/days" element={<DaysPage />} />
            <Route path="input/jam-lembur" element={<JamLemburPage />} />
            <Route
              path="input/biaya-pengobatan"
              element={<BiayaPengobatanPage />}
            />
            <Route path="input/biaya-pph21" element={<BiayaPph21Page />} />
            <Route path="input/bpjs-kesehatan" element={<BpjsPage />} />
            <Route
              path="input/biaya-pendidikan-latihan"
              element={<BiayaPendidikanLatihanPage />}
            />
            <Route
              path="input/rekrutment-assessment"
              element={<BiayaRekrutmentAssessmentPage />}
            />
            <Route
              path="input/uniform-safety"
              element={<UniformSafetyPage />}
            />
            <Route path="input/lainnya" element={<MppLainnyaPage />} />
            <Route path="input/mpp" element={<MppInputPage />} />

            <Route path="summary/gaji" element={<GajiSummary />} />
            <Route path="summary/lembur" element={<LemburSummary />} />
            <Route path="summary/makan-minum" element={<MakanMinumSummary />} />
            <Route path="summary/pengobatan" element={<PengobatanSummary />} />
            <Route path="summary/pph21" element={<Pph21Summary />} />
            <Route path="summary/bpjs-tk" element={<BpjsTkSummary />} />
            <Route
              path="summary/bpjs-kesehatan"
              element={<BpjsKesehatanSummary />}
            />
            <Route
              path="summary/transportasi"
              element={<TransportasiMppSummary />}
            />
            <Route path="summary/komunikasi" element={<KomunikasiSummary />} />
            <Route
              path="summary/pendidikan-pelatihan"
              element={<PendidikanPelatihanSummary />}
            />
            <Route
              path="summary/rekrutment-assesment"
              element={<RekrutmentAssessmentSummary />}
            />
            <Route
              path="summary/uniform-safety"
              element={<UniformSafetySummary />}
            />
            <Route path="summary/lainnya" element={<MppLainnyaSummary />} />
            <Route path="summary/mpp" element={<MppSummary />} />
          </Route>
          <Route path="others">
            <Route
              path="others-input/Input Asumsi"
              element={<OthersInputAsumsiPage />}
            />
            <Route path="summary/direct-all" element={<DirectAllSummary />} />
            <Route path="input/direct-all" element={<InputDirectAllPage />} />
            <Route
              path="input/pendapatan-non-operasional"
              element={<PendapatanNonOperasionalPage />}
            />
            <Route
              path="input/biaya-non-operasional"
              element={<BiayaNonOperasionalPage />}
            />

            <Route
              path="summary/pendapatan-non-operasional"
              element={<PendapatanNonOperasionalSummary />}
            />
            <Route
              path="summary/biaya-non-operasional"
              element={<BiayaNonOperasionalSummary />}
            />
          </Route>
          <Route path="report">
            <Route path="laba-rugi" element={<LabaRugiPage />} />
            <Route path="cash-flow" element={<CashFlowPage />} />
            <Route path="neraca" element={<NeracaPage />} />
          </Route>
          <Route path="coa">
            <Route path="perusahaan" element={<CompanyPage />} />
            <Route path="produk" element={<ProductPage />} />
            <Route path="lokasi" element={<LocationPage />} />
            <Route path="departement" element={<DepartementPage />} />
            <Route path="akun" element={<AkunPage />} />
            <Route path="project" element={<ProjectPage />} />
            <Route path="icp" element={<IcpPage />} />
            {/* <Route path=":item" element={<CoaPage />} /> */}
          </Route>
          <Route path="akun">
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="management-user" element={<ManagementUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
