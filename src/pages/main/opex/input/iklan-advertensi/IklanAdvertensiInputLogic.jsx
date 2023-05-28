import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { columnInputType1 } from "../../../../../component/table/utils/TypeColumn";
import { val } from "../../../../../redux/action/action.reducer";
import MainServices from "../../../../../services/MainServices";
import {
  log,
  logO,
  setLocal,
  sumYearTotal,
} from "../../../../../values/Utilitas";
import { useLocation, useNavigate } from "react-router-dom";
import { getRows, reactgridNewRow, testData } from "./getRows";
import { getColumns } from "./getColumns";

const IklanAdvertensiInputLogic = () => {
  const date = new Date();

  const [dataColumnInput, setDataColumnInput] = useState([]);
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [filter, setFilter] = useState(false);
  const [tahun, setTahun] = useState();
  const [yearFilter, setYearFilter] = useState(date.getFullYear());

  const [items, setItems] = useState();
  const columns = getColumns();
  const [rows, setRows] = useState({
    pemasaran: [],
    administrasi: [],
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state;
    if (state === null) {
      setLocal("index-menu", 0);
      setLocal("name-menu", "Dashboard");
      setLocal("move-page", "/");
      navigate("/");
      return;
    }

    log("item", state.item);
    setItems(state.item);
  }, []);

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
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

    setYearFilter(fPeriode);

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

    const pemasaran = items.pemasaran;

    if (pemasaran.length > 0) {
      await Promise.all(
        pemasaran.map(async (p, i) => {
          const codeAccount = p.code_account;
          const url = `detailopex/template1/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}&code_account=${codeAccount}`;
          const { data } = await MainServices.get(url);
          logO({ data });

          if (data.data.length > 0) {
            const r = getRows({
              data: data.data,
              titleTotal: "total harga",
            });
            listPemasaran.push(r);
          }
        })
      );
    }

    setRows({
      ...rows,
      pemasaran: listPemasaran,
    });

    // getDataTable(data.data);
    // setLoading(false);
  };

  const onFinish = (values) => {
    setFilter(false);
    setLoading(true);
    onSetDataTable(values);
  };

  const onTambahRow = (i) => {
    const newRows = [...rows.pemasaran];
    const lastIndex = newRows[i].length - 1;
    const id = lastIndex + 1;
    const lastData = newRows[i][lastIndex];

    newRows[i][lastIndex] = reactgridNewRow(id);
    newRows[i].push(lastData);

    log("newRows[i][lastIndex]", `newRows[${i}][${lastIndex}]`);

    logO({ newRows });

    setRows({
      ...rows,
      pemasaran: newRows,
    });

    showNotif(200, "Sukses tambah row");
  };

  const onChangeTable = async (change, i) => {
    const newRows = [...rows.pemasaran];
    logO({ change });
    const rowIndex = newRows[i].findIndex((j) => j.rowId === change[0].rowId);
    const columnIndex = columns.findIndex(
      (j) => j.columnId === change[0].columnId
    );

    const type = newRows[i][rowIndex].cells[columnIndex].type;

    let value;

    if (type === "text") {
      newRows[i][rowIndex].cells[columnIndex].text = change[0].newCell.text;
      value = change[0].newCell.text;
    } else {
      newRows[i][rowIndex].cells[columnIndex].value = change[0].newCell.value;
      value = change[0].newCell.value;
    }

    let jumlahBulan = 0;
    let tarif = newRows[i][rowIndex].cells[16].value;

    const newCell = newRows[i][rowIndex].cells.map((e, i) => {
      // if ((i >= 1 && i <= 14) || i === 16) e.nonEditable = false;
      if (i >= 3 && i <= 14) jumlahBulan += e.value;
      if (i === 15) e.value = jumlahBulan;
      if (i === 17) e.value = jumlahBulan * tarif;
      return e;
    });

    newRows[i][rowIndex].cells = newCell;

    try {
      let formData = new FormData();

      const id = change[0].rowId;
      const column_id = change[0].columnId;

      const isNewRow = newRows[i][rowIndex].newRow;

      logO({ isNewRow });

      if (isNewRow !== undefined) {
        alert("new row");
        const {
          code_company,
          code_dept,
          code_location,
          code_product,
          code_project,
          code_icp,
          periode,
        } = codeFilter;

        formData.append("code_account", id);
        formData.append("code_company", code_company);
        formData.append("code_dept", code_dept);
        formData.append("code_location", code_location);
        formData.append("code_product", code_product);
        formData.append("code_project", code_project);
        formData.append("code_icp", code_icp);
        formData.append("year", periode);
        formData.append("name", value);
      } else {
        alert("not new row");
        formData.append("id", id);
        formData.append("column_id", column_id);
        formData.append("value", value);
      }

      // await MainServices.post("detailopex/template1/update", formData);

      // setRows({
      //   ...rows,
      //   pemasaran: newRows,
      // });

      // delete newRows[i][rowIndex].newRow

      showNotif(200, "Sukses update data");

      const newCell = newRows[i][rowIndex].cells.map((e, i) => {
        // if ((i >= 1 && i <= 14) || i === 16) e.nonEditable = false;
        if (i >= 1 && i <= 14 || i == 16) e.nonEditable = false;
        return e;
      });
      newRows[i][rowIndex].cells = newCell;
      
    } catch (e) {
      logO({e})
      // showNotif(400, e);
    }
  };

  const onSuccess = () => {
    setUploadSucces(true);
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    let tahun1 = tahun === undefined ? new Date().getFullYear() : tahun;
    let file1;
    let formData = new FormData();

    setLoadingUpload(true);

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    formData.append("file", file1);
    formData.append("year", tahun1);

    try {
      const res = await MainServices.post("opex/import", formData);
      if (codeFilter !== undefined) {
        const {
          code_company,
          code_product,
          code_location,
          code_dept,
          code_icp,
          code_project,
          periode,
        } = codeFilter;

        getData(
          code_company,
          code_product,
          code_location,
          code_dept,
          code_icp,
          code_project,
          periode
        );
      }
      responseShow(res);
      setLoadingUpload(false);
      onSuccess();
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const onChangeTahun = (e) => {
    setTahun(e);
  };

  return {
    value: {
      dataColumnInput,
      columns,
      rows,
      loading,
      filter,
      loadingUpload,
      uploadSucces,
      getRootProps,
      getInputProps,
      acceptedFiles,
    },
    func: {
      onFinish,
      onUploadFile,
      onChangeTahun,
      setUploadSucces,
      onChangeTable,
      onTambahRow,
    },
  };
};

export default IklanAdvertensiInputLogic;
