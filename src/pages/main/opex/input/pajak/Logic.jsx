import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log, setLocal } from "values/Utilitas";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fullNewRow,
  getRows,
  reactgridNewRow,
  updateTotalRow,
} from "values/react-grid/rows/input/opex/template-2/getRows";
import { getColumns } from "values/react-grid/rows/input/opex/template-2/getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { getRootHeaderRow } from "./getRows";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
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

  const dispatch = useDispatch();
  const location = useLocation();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "detailopex/template2";

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

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
    dispatch(actionData({ loading: false }));
  };

  const showNotif = (status, message) => {
    dispatch(
      val({
        status: status,
        message: message,
      })
    );
  };

  const onSetDataTable = (values) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
    } = values;

    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fPeriode = fPeriode[0];

    getData(
      fCodeCompany,
      fCodeProduct,
      fCodeLocation,
      fCodeDept,
      fCodeIcp,
      fCodeProject,
      fPeriode
    );

    setCodeFilter({
      code_company: fCodeCompany,
      code_dept: fCodeDept,
      code_location: fCodeLocation,
      code_product: fCodeProduct,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
      periode: fPeriode,
    });
  };

  const getData = async (
    codeCompany,
    codeProduct,
    codeLocation,
    codeDept,
    codeIcp,
    codeProject,
    periode
  ) => {
    const listPemasaran = [];
    const listAdministrasi = [];

    let pemasaran = items.pemasaran;
    let administrasi = items.administrasi;

    if (pemasaran.length > 0) {
      await Promise.allSettled(
        pemasaran.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `${ENDPOINT_URL}/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
          try {
            const { data } = await MainServices.get(url);
            let r;
            if (data.data.length > 0) {
              const newRow = data.data.map((d) => {
                return {
                  ...d,
                  rates: d.rates * 100,
                };
              });
              r = getRows({
                header: getRootHeaderRow(),
                data: newRow,
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

      await Promise.allSettled(
        administrasi.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `${ENDPOINT_URL}/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
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

    // getDataTable(data.data);
    // setLoading(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onTambahRow = (i, category) => {
    const newRows = category === "pemasaran" ? [...rows.pemasaran] : [...rows.administrasi];

    const lastIndex = newRows[i].length - 1;
    const id = lastIndex + 1;
    const lastData = newRows[i][lastIndex];

    newRows[i][lastIndex] = reactgridNewRow(id);
    newRows[i].push(lastData);

    setRows({
      ...rows,
      [category]: newRows,
    });

    showNotif(200, "Sukses tambah row");
  };

  const onChangeTable = async (change, i, category) => {
    const newRows = category === "pemasaran" ? [...rows.pemasaran] : [...rows.administrasi];

    const rowIndex = newRows[i].findIndex((j) => j.rowId === change[0].rowId);
    const columnIndex = columns.findIndex((j) => j.columnId === change[0].columnId);

    const type = newRows[i][rowIndex].cells[columnIndex].type;

    const length = newRows[i].length;

    let value;

    if (type === "text") {
      newRows[i][rowIndex].cells[columnIndex].text = change[0].newCell.text;
      value = change[0].newCell.text;
    } else {
      newRows[i][rowIndex].cells[columnIndex].value = change[0].newCell.value;
      value = change[0].newCell.value;
      if (change[0].columnId === "rates") value /= 100;

      let satuan = newRows[i][rowIndex].cells[3].value;
      let tarif = newRows[i][rowIndex].cells[4].value;
      let periodeBayar = newRows[i][rowIndex].cells[6].value;

      let grandTotal = satuan * (tarif / 100);

      log({ tarif });
      log({ satuan });
      log({ grandTotal });
      log({ periodeBayar });

      newRows[i][rowIndex].cells[5].value = grandTotal;
      // newRows[i][rowIndex].cells[periodeBayar + 6].value = grandTotal;

      const newCell = newRows[i][rowIndex].cells.map((e, j) => {
        if (j > 6) {
          if (j === periodeBayar + 6) e.value = grandTotal;
          else e.value = 0;
        }

        return e;
      });

      newRows[i][rowIndex].cells = newCell;
    }

    try {
      let formData = new FormData();

      const id = change[0].rowId;
      const column_id = change[0].columnId;
      const isNewRow = newRows[i][rowIndex].newRow;

      if (isNewRow !== undefined) {
        const {
          code_company,
          code_dept,
          code_location,
          code_product,
          code_project,
          code_icp,
          periode,
        } = codeFilter;

        const codeAccount =
          category === "pemasaran"
            ? items.pemasaran[i]["code_account"]
            : items.administrasi[i]["code_account"];

        formData.append("code_account", codeAccount);
        formData.append("code_company", code_company);
        formData.append("code_department", code_dept);
        formData.append("code_location", code_location);
        formData.append("code_product", code_product);
        formData.append("code_project", code_project);
        formData.append("code_icp", code_icp);
        formData.append("year", periode);
        formData.append("name", value);

        const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

        log({ res });
        const rowId = res.data.data.id;

        newRows[i][rowIndex].rowId = rowId;
      } else {
        formData.append("id", id);
        formData.append("column_id", column_id);
        formData.append("value", value);

        await MainServices.post(`${ENDPOINT_URL}/update`, formData);
      }

      delete newRows[i][rowIndex].newRow;

      showNotif(200, "Sukses update data");

      const newCell = newRows[i][rowIndex].cells.map((e, i) => {
        if ((i >= 1 && i <= 4) || i === 6) e.nonEditable = false;
        return e;
      });

      newRows[i][rowIndex].cells = newCell;

      newRows[i][length - 1] = updateTotalRow(newRows[i]);

      setRows({
        ...rows,
        [category]: newRows,
      });
    } catch (e) {
      log({ e });
      // showNotif(400, e);
    }
  };

  const onSuccess = () => {
    dispatch(resetDataActionImport());
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    // let tahun1 = tahun === undefined ? new Date().getFullYear() : tahun;
    dispatch(
      actionImport({
        loading: true,
      })
    );

    const {
      code_company,
      code_product,
      code_location,
      code_dept,
      code_icp,
      code_project,
      periode,
    } = codeFilter;

    let file1;

    const codeAccount = dataGlobalRedux.indexImport;
    let index, category;

    const checkItem = (items, cat) => {
      items.forEach((e, i) => {
        if (e.code_account === codeAccount) {
          [index, category] = [i, cat];
        }
      });
    };

    checkItem(items.pemasaran, "pemasaran") || checkItem(items.administrasi, "administrasi");

    let formData = new FormData();

    // setLoadingUpload(true);

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    formData.append("file", file1);
    formData.append("code_account", codeAccount);
    formData.append("code_company", code_company);
    formData.append("code_department", code_dept);
    formData.append("code_location", code_location);
    formData.append("code_product", code_product);
    formData.append("code_project", code_project);
    formData.append("code_icp", code_icp);
    formData.append("year", periode);

    try {
      const res = await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      const url = `${ENDPOINT_URL}/list?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_department=${code_dept}&code_icp=${code_icp}&code_project=${code_project}&year=${periode}&code_account=${codeAccount}`;
      const { data } = await MainServices.get(url);

      const r = getRows({
        header: getRootHeaderRow(),
        data: data.data,
      });

      const newRow = [...rows.pemasaran];

      newRow[index] = r;

      setRows({
        ...rows,
        [category]: newRow,
      });

      responseShow(res);

      onSuccess();
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
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
      onUploadFile,
      setUploadSucces,
      onChangeTable,
      onTambahRow,
    },
  };
};

export default Logic;
