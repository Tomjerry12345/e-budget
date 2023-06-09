import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import MainServices from "services/MainServices";
import { setLocal } from "values/Utilitas";
import { useLocation, useNavigate } from "react-router-dom";
import { fullNewRow, getRows } from "values/react-grid/rows/summary/template-3/getRows";
import { getColumns } from "values/react-grid/rows/summary/template-3/getColumns";
import { getRootHeaderRow } from "./getRows";

const Logic = () => {
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const [items, setItems] = useState({
    pemasaran: [],
    administrasi: [],
  });
  const columns = getColumns();
  const [rows, setRows] = useState({
    pemasaran: [],
    administrasi: [],
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const ENDPOINT_URL = "detailopex/template3";

  useEffect(() => {
    const state = location.state;
    if (state === null) {
      setLocal("index-menu", 0);
      setLocal("name-menu", "Dashboard");
      setLocal("move-page", "/");
      navigate("/");
      return;
    }

    setItems(state.item);
  }, []);

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

    const pemasaran = items.pemasaran;
    const administrasi = items.administrasi;

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

    if (administrasi.length > 0) {
      await Promise.allSettled(
        administrasi.map(async (p, i) => {
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
            listAdministrasi[i] = r;
          } catch (error) {
            // Tangani error jika ada
            console.error(`Error fetching data for code account ${codeAccount}`, error);
            listAdministrasi[i] = fullNewRow(getRootHeaderRow(), i);
          }
        })
      );
    }
    setRows({
      ...rows,
      pemasaran: listPemasaran,
      administrasi: listAdministrasi,
    });
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
      uploadSucces,
      getRootProps,
      getInputProps,
      acceptedFiles,
      items,
    },
    func: {
      onFinish,
      setUploadSucces,
    },
  };
};

export default Logic;
