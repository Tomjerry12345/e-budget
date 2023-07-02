import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";
import { useLocation } from "react-router-dom";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import {
  getRootHeaderRow,
  fullNewRow,
  getRows,
  reactgridNewRow,
  updateTotalRow,
} from "./getRows";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [openMDuration, setOpenMDuration] = useState(false);
  const [openMStart, setOpenMStart] = useState(false);

  const isFunctionExecuted = useRef(0);

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

  const ENDPOINT_URL = "detailopex/template4";

  useEffect(() => {
    getDataAccount();
    // eslint-disable-next-line
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

  // const onChangeTable = async (change, i, category) => {
  //   const newRows = category === "pemasaran" ? [...rows.pemasaran] : [...rows.administrasi];

  //   const rowIndex = newRows[i].findIndex((j) => j.rowId === change[0].rowId);
  //   const columnIndex = columns.findIndex((j) => j.columnId === change[0].columnId);

  //   const type = newRows[i][rowIndex].cells[columnIndex].type;

  //   const length = newRows[i].length;

  //   log("change[0].newCell", change[0].newCell);

  //   let value;

  //   if (type === "text") {
  //     newRows[i][rowIndex].cells[columnIndex].text = change[0].newCell.text;
  //     value = change[0].newCell.text;
  //   } else {
  //     if (type === "dropdown") {
  //       newRows[i][rowIndex].cells[columnIndex].isOpen = change[0].newCell.isOpen;

  //       setRows({
  //         ...rows,
  //         [category]: newRows,
  //       });

  //       return;
  //     }

  //     // newRows[i][rowIndex].cells[columnIndex].value = change[0].newCell.value;
  //     // value = change[0].newCell.value;

  //     // let jumlah = newRows[i][rowIndex].cells[3].value;
  //     // let tarifAsuransi = newRows[i][rowIndex].cells[4].value;

  //     // let lamaAsuransi = parseInt(newRows[i][rowIndex].cells[6].value);
  //     // let mulaiAsuransi = parseInt(newRows[i][rowIndex].cells[7].value);

  //     // let totalAsuransi = jumlah * tarifAsuransi;

  //     // let grandTotal = 0;

  //     // const newCell = newRows[i][rowIndex].cells.map((e, j) => {
  //     //   if (j === 5) e.value = totalAsuransi;
  //     //   if (mulaiAsuransi < 1) mulaiAsuransi = 1;
  //     //   if (lamaAsuransi > 12) lamaAsuransi = 12;
  //     //   if (j >= 8 && j <= mulaiAsuransi + 8) e.value = 0;
  //     //   if (j >= mulaiAsuransi + 8 && j < lamaAsuransi + 8 + mulaiAsuransi) {
  //     //     e.value = totalAsuransi;
  //     //     grandTotal += e.value;
  //     //   }
  //     //   if (j >= lamaAsuransi + 8 + mulaiAsuransi && j <= 20) e.value = 0;
  //     //   return e;
  //     // });

  //     // newRows[i][rowIndex].cells[8].value = grandTotal;

  //     // newRows[i][rowIndex].cells = newCell;
  //   }

  //   // try {
  //   //   let formData = new FormData();

  //   //   const id = change[0].rowId;
  //   //   const column_id = change[0].columnId;
  //   //   const isNewRow = newRows[i][rowIndex].newRow;

  //   //   if (isNewRow !== undefined) {
  //   //     const {
  //   //       code_company,
  //   //       code_dept,
  //   //       code_location,
  //   //       code_product,
  //   //       code_project,
  //   //       code_icp,
  //   //       periode,
  //   //     } = codeFilter;

  //   //     const codeAccount =
  //   //       category === "pemasaran"
  //   //         ? items.pemasaran[i]["code_account"]
  //   //         : items.administrasi[i]["code_account"];

  //   //     formData.append("code_account", codeAccount);
  //   //     formData.append("code_company", code_company);
  //   //     formData.append("code_department", code_dept);
  //   //     formData.append("code_location", code_location);
  //   //     formData.append("code_product", code_product);
  //   //     formData.append("code_project", code_project);
  //   //     formData.append("code_icp", code_icp);
  //   //     formData.append("year", periode);
  //   //     formData.append("name", value);
  //   //     formData.append("type", "asuransi");

  //   //     const res = await MainServices.post(`${ENDPOINT_URL}/insert`, formData);

  //   //     log({ res });
  //   //     const rowId = res.data.data.id;

  //   //     newRows[i][rowIndex].rowId = rowId;
  //   //   } else {
  //   //     formData.append("id", id);
  //   //     formData.append("column_id", column_id);
  //   //     formData.append("value", value);
  //   //     formData.append("type", "asuransi");

  //   //     await MainServices.post(`${ENDPOINT_URL}/update`, formData);
  //   //   }

  //   //   delete newRows[i][rowIndex].newRow;

  //   //   showNotif(200, "Sukses update data");

  //   //   const newCell = newRows[i][rowIndex].cells.map((e, i) => {
  //   //     if (i >= 1 && i <= 5) e.nonEditable = false;
  //   //     if (i >= 6 && i <= 8) e.nonEditable = false;
  //   //     return e;
  //   //   });

  //   //   newRows[i][rowIndex].cells = newCell;

  //   //   newRows[i][length - 1] = updateTotalRow(newRows[i]);

  //   //   // log({ newRows });

  //   //   setRows({
  //   //     ...rows,
  //   //     [category]: newRows,
  //   //   });
  //   // } catch (e) {
  //   //   log({ e });
  //   //   // showNotif(400, e);
  //   // }
  // };

  const onChangeTable = async (change, i, category) => {
    const newRows = category === "pemasaran" ? [...rows.pemasaran] : [...rows.administrasi];
    let isChange;

    isFunctionExecuted.current++;

    if (isFunctionExecuted.current >= 3) {
      for (const c of change) {
        const rowIndex = newRows[i].findIndex((j) => j.rowId === c.rowId);
        const columnIndex = parseInt(columns.findIndex((j) => j.columnId === c.columnId));

        const type = c.newCell.type;

        const length = newRows[i].length;

        let value;

        if (type === "text") {
          newRows[i][rowIndex].cells[columnIndex].text = c.newCell.text;
          value = c.newCell.text;
          isChange = true;
        } else if (type === "dropdown") {
          const isOpen = c.newCell.isOpen;
          newRows[i][rowIndex].cells[columnIndex].isOpen = isOpen;

          isChange = !isOpen;

          setRows({
            ...rows,
            [category]: newRows,
          });

          log({ isOpen });
        } else if (type === "number") {
          value = c.newCell.value;
          newRows[i][rowIndex].cells[columnIndex].value = value;

          let jumlah = newRows[i][rowIndex].cells[3].value;
          let tarifAsuransi = newRows[i][rowIndex].cells[4].value;

          let lamaAsuransi = parseInt(newRows[i][rowIndex].cells[6].value);
          let mulaiAsuransi = parseInt(newRows[i][rowIndex].cells[7].value);

          let totalAsuransi = jumlah * tarifAsuransi;

          let grandTotal = 0;

          const newCell = newRows[i][rowIndex].cells.map((e, j) => {
            if (j === 5) e.value = totalAsuransi;
            if (mulaiAsuransi < 1) mulaiAsuransi = 1;
            if (lamaAsuransi > 12) lamaAsuransi = 12;
            if (j >= 8 && j <= mulaiAsuransi + 8) e.value = 0;
            if (j >= mulaiAsuransi + 8 && j < lamaAsuransi + 8 + mulaiAsuransi) {
              e.value = totalAsuransi;
              grandTotal += e.value;
            }
            if (j >= lamaAsuransi + 8 + mulaiAsuransi && j <= 20) e.value = 0;
            return e;
          });

          newRows[i][rowIndex].cells[8].value = grandTotal;
          newRows[i][rowIndex].cells = newCell;

          isChange = true;
        }

        if (isChange) {
          try {
            let formData = new FormData();

            const id = c.rowId;
            const column_id = c.columnId;
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

              const codeAccount = items.pemasaran[i]["code_account"];

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
            const newCell = newRows[i][rowIndex].cells.map((e, i) => {
              if (i >= 1 && i <= 5) e.nonEditable = false;
              if (i >= 6 && i <= 8) e.nonEditable = false;
              return e;
            });

            newRows[i][rowIndex].cells = newCell;

            newRows[i][length - 1] = updateTotalRow(newRows[i]);
          } catch (e) {
            log({ e });
          }
        }
      }

      log({ isChange });

      if (isChange) {
        showNotif(200, "Sukses update data");

        setRows({
          ...rows,
          [category]: newRows,
        });
      }

      isFunctionExecuted.current = 0;
    }

    log("test", isFunctionExecuted.current);
    return;
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
    formData.append("type", "asuransi");

    try {
      const res = await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      const url = `${ENDPOINT_URL}/list?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_department=${code_dept}&code_icp=${code_icp}&code_project=${code_project}&year=${periode}&code_account=${codeAccount}`;
      const { data } = await MainServices.get(url);

      const r = getRows({
        header: getRootHeaderRow(),
        data: data.data,
      });

      const newRow = category === "pemasaran" ? [...rows.pemasaran] : [...rows.administrasi];

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
      openMDuration,
      openMStart,
    },
    func: {
      onFinish,
      onUploadFile,
      setUploadSucces,
      onChangeTable,
      onTambahRow,
      setOpenMDuration,
      setOpenMStart,
    },
  };
};

export default Logic;
