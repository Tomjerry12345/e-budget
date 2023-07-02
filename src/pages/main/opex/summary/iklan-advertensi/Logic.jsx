import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";
import { useLocation } from "react-router-dom";
import { getRootHeaderRow } from "./getRows";
import { fullNewRow, getRows } from "values/react-grid/rows/summary/opex/getRows";
import { getColumns } from "values/react-grid/rows/summary/opex/getColumns";

const Logic = () => {
  const [loading, setLoading] = useState(false);
  const [linkExport, setLinkExport] = useState(null);

  const [items, setItems] = useState({
    pemasaran: [],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const pemasaran = items.pemasaran;

    if (pemasaran.length > 0) {
      await Promise.allSettled(
        pemasaran.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `${ENDPOINT_URL}/summary?code_company=${codeCompany}&code_product=${codeProduct}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
          try {
            const { data } = await MainServices.get(url);
            let r;
            if (data.data.length > 0) {
              r = getRows({
                header: getRootHeaderRow(),
                data: data.data,
              });
            } else {
              r = fullNewRow(getRootHeaderRow(), i);
            }
            listPemasaran[i] = r;
          } catch (error) {
            // Tangani error jika ada
            console.error(`Error fetching data for code account ${codeAccount}`, error);
            listPemasaran[i] = fullNewRow(getRootHeaderRow(), i);
          }
        })
      );
    }

    setRows({
      ...rows,
      pemasaran: listPemasaran,
    });

    setLinkExport(
      `${ENDPOINT_URL}/export?code_company=${codeCompany}&code_product=${codeProduct}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}`
    );
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
    },
    func: {
      onFinish,
    },
  };
};

export default Logic;
