import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log, setLocal } from "values/Utilitas";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { fullNewRow, getRows } from "./getRows";
import { urlRevenue } from "values/Constant";
import { reactgridNewRow } from "./reactgridNewRow";
import { getHeaderRow } from "./getHeaderRow";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const [items, setItems] = useState();
  const columns = getColumns;
  const [rows, setRows] = useState();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const dataGlobalRedux = useSelector((state) => state.data);
  const { clicked } = useSelector((state) => state.revenue);

  const ENDPOINT_URL = "detailopex/template4";

  useEffect(() => {
    // const state = location.state;
    // if (state === null) {
    //   setLocal("index-menu", 0);
    //   setLocal("name-menu", "Dashboard");
    //   setLocal("move-page", "/");
    //   navigate("/");
    //   return;
    // }
    // setItems(state.item);
    log({ clicked });

    if (searchParams.size > 0) {
      log("searchParams", searchParams);
      const currentParams = Object.fromEntries([...searchParams]);
      log("currentParams", currentParams);
      onFinish(currentParams);
    }
  }, [clicked]);

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

    let fCodeCompany = code_company;
    let fCodeProduct = code_product;
    let fCodeLocation = code_location;
    let fCodeDept = code_dept;
    let fCodeIcp = code_icp;
    let fCodeProject = code_project;

    let fPeriode = periode;

    // fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    // fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    // fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    // fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    // fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    // fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    // fPeriode = fPeriode[0];

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
    const listRows = [];

    await Promise.allSettled(
      urlRevenue.map(async (p, i) => {
        const desc = p.description;
        const url = `${p.endpoint}/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}`;
        try {
          const { data } = await MainServices.get(url);
          let r;
          if (data.data.length > 0) {
            r = getRows({
              header: getHeaderRow[desc],
              data: data.data,
              key: desc,
            });
          } else {
            r = fullNewRow(getHeaderRow[desc], i, desc);
          }

          listRows[i] = {
            description: desc,
            insert: p.insert,
            data: r,
          };
        } catch (error) {
          // Tangani error jika ada
          console.error(`Error fetching data ${desc}`, error);
          listRows[i] = {
            description: desc,
            insert: p.insert,
            data: fullNewRow(getHeaderRow[desc], i, desc),
          };
        }
      })
    );
    setRows(listRows);
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);

    // const l = [];

    // dataDummy.list.map((e, i) => {
    //   const r = getRows({
    //     header: getHeaderRow[p.description],
    //     data: e.data,
    //   });

    //   l.push({
    //     title: e.title,
    //     data: r,
    //   });
    // });

    // setRows(l);
  };

  const onTambahRow = (i, key) => {
    const fullRows = [...rows];
    const newRows = [...rows[i].data];

    log({ newRows });

    const lastIndex = newRows.length - 1;
    const id = lastIndex + 1;
    const lastData = newRows[lastIndex];

    newRows[lastIndex] = reactgridNewRow(id, key);
    newRows.push(lastData);

    fullRows[i].data = newRows;

    setRows(fullRows);

    showNotif(200, "Sukses tambah row");
  };

  const stokAkhir = () => {};

  const penjualan = () => {};

  const onChangeTable = async (change, i, key) => {
    const newRows = [...rows];

    for (const c of change) {
      const rowIndex = newRows[i].data.findIndex((j) => j.rowId === c.rowId);
      const columnIndex = columns[key].findIndex((j) => j.columnId === c.columnId);

      const type = newRows[i].data[rowIndex].cells[columnIndex].type;

      const length = newRows[i].data.length;

      let value;

      if (type === "text") {
        newRows[i].data[rowIndex].cells[columnIndex].text = c.newCell.text;
        value = c.newCell.text;
      } else {
        newRows[i].data[rowIndex].cells[columnIndex].value = c.newCell.value;
        value = c.newCell.value;

        let jumlahBulan = 0;
        let tarif = newRows[i].data[rowIndex].cells[16].value;

        const newCell = newRows[i].data[rowIndex].cells.map((e, j) => {
          if (j >= 3 && j <= 14) jumlahBulan += e.value;
          if (j === 15) e.value = jumlahBulan;
          if (j === 17) e.value = jumlahBulan * tarif;
          if (j >= 18) e.value = newRows[i].data[rowIndex].cells[j - 15].value * tarif;
          return e;
        });

        newRows[i].data[rowIndex].cells = newCell;
      }

      // try {
      //   let formData = new FormData();

      //   const id = c.rowId;
      //   const column_id = c.columnId;
      //   const isNewRow = newRows[i].data[rowIndex].newRow;

      //   if (isNewRow !== undefined) {
      //     const {
      //       code_company,
      //       code_dept,
      //       code_location,
      //       code_product,
      //       code_project,
      //       code_icp,
      //       periode,
      //     } = codeFilter;

      //     const codeAccount = items.pemasaran[rowIndex]["code_account"];

      //     formData.append("code_account", codeAccount);
      //     formData.append("code_company", code_company);
      //     formData.append("code_department", code_dept);
      //     formData.append("code_location", code_location);
      //     formData.append("code_product", code_product);
      //     formData.append("code_project", code_project);
      //     formData.append("code_icp", code_icp);
      //     formData.append("year", periode);
      //     formData.append("name", value);

      //     const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

      //     log({ res });
      //     const rowId = res.data.data.id;

      //     newRows[i].data[rowIndex].rowId = rowId;
      //   } else {
      //     formData.append("id", id);
      //     formData.append("column_id", column_id);
      //     formData.append("value", value);

      //     await MainServices.post(`${ENDPOINT_URL}/update`, formData);
      //   }

      //   delete newRows[i].data[rowIndex].newRow;
      //   const newCell = newRows[i].data[rowIndex].cells.map((e, i) => {
      //     if ((i >= 1 && i <= 14) || i === 16) e.nonEditable = false;
      //     return e;
      //   });

      //   newRows[i].data[rowIndex].cells = newCell;

      //   newRows[i].data[length - 1] = updateTotalRow(newRows[i]);
      // } catch (e) {
      //   log({ e });
      // }
    }

    showNotif(200, "Sukses update data");

    setRows(newRows);
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
        header: getHeaderRow["key"],
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
      dispatch(
        actionImport({
          loading: false,
        })
      );
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
