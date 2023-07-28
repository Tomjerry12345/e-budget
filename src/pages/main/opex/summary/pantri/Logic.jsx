import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";
import { useLocation } from "react-router-dom";
import { fullNewRow, getRows } from "values/react-grid/rows/summary/opex/getRows";
import { getColumns } from "values/react-grid/rows/summary/opex/getColumns";
import { getRootHeaderRow } from "./getRows";

const Logic = () => {
  const [loading, setLoading] = useState(false);
  const [linkExport, setLinkExport] = useState(null);
  const [listMenu, setListMenu] = useState();

  const [items, setItems] = useState({
    pemasaran: [],
    administrasi: [],
  });
  const columns = getColumns();
  const [rows, setRows] = useState({
    pemasaran: [],
    administrasi: [],
  });

  const location = useLocation();

  const ENDPOINT_URL = "detailopex/template1";

  useEffect(() => {
    getDataAccount();
  }, []);

  const getDataAccount = async () => {
    try {
      const split = location.pathname.split("/");
      const q = split[split.length - 1];
      const res = await MainServices.get(`config/opex/byalias/${q}`);
      log({ res });
      setItems(res.data.data[0]);
    } catch (e) {
      log({ e });
    }
  };

  const onSetDataTable = (values) => {
    const { code_company, code_dept, code_product, code_project, code_icp, periode } = values;

    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fPeriode = fPeriode[0];

    getData(fCodeCompany, fCodeProduct, fCodeDept, fCodeIcp, fCodeProject, fPeriode);
  };

  const getData = async (codeCompany, codeProduct, codeDept, codeIcp, codeProject, periode) => {
    const listPemasaran = [];
    const listAdministrasi = [];
    let lMenu = [];

    const pemasaran = items.pemasaran;
    const administrasi = items.administrasi;

    if (pemasaran.length > 0) {
      await Promise.allSettled(
        pemasaran.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `${ENDPOINT_URL}/summary?code_company=${codeCompany}&code_product=${codeProduct}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
          try {
            const { data } = await MainServices.get(url);
            let r, d;
            if (data.data.length > 0) {
              r = getRows({
                header: getRootHeaderRow(),
                data: data.data,
              });

              d = false;
            } else {
              r = fullNewRow(getRootHeaderRow(), i);
              d = true;
            }
            listPemasaran[i] = r;
            lMenu.push({
              ...p,
              disabled: d,
            });
          } catch (error) {
            // Tangani error jika ada
            console.error(`Error fetching data for code account ${codeAccount}`, error);
            listPemasaran[i] = fullNewRow(getRootHeaderRow(), i);
            lMenu.push({
              ...p,
              disabled: true,
            });
          }
        })
      );
    }

    if (administrasi.length > 0) {
      await Promise.allSettled(
        administrasi.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `${ENDPOINT_URL}/summary?code_company=${codeCompany}&code_product=${codeProduct}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
          try {
            const { data } = await MainServices.get(url);
            let r, d;
            if (data.data.length > 0) {
              r = getRows({
                header: getRootHeaderRow(),
                data: data.data,
              });
              d = false;
            } else {
              r = fullNewRow(getRootHeaderRow(), i);
              d = true;
            }

            listAdministrasi[i] = r;
            lMenu.push({
              ...p,
              disabled: d,
            });
          } catch (error) {
            // Tangani error jika ada
            console.error(`Error fetching data for code account ${codeAccount}`, error);
            listAdministrasi[i] = fullNewRow(getRootHeaderRow(), i);
            lMenu.push({
              ...p,
              disabled: true,
            });
          }
        })
      );
    }
    setRows({
      ...rows,
      pemasaran: listPemasaran,
      administrasi: listAdministrasi,
    });

    setLinkExport(
      `${ENDPOINT_URL}/export?code_company=${codeCompany}&code_product=${codeProduct}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}`
    );

    setListMenu(lMenu);
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  return {
    value: {
      columns,
      rows,
      loading,
      items,
      linkExport,
      listMenu,
    },
    func: {
      onFinish,
    },
  };
};

export default Logic;
