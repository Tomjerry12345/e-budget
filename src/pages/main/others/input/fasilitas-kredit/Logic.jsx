import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { fullNewRow, getRows } from "./getRows";
import { Form } from "antd";

const Logic = () => {
  const [form] = Form.useForm();

  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [modalTambah, setModalTambah] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const filterYear = useRef();

  const columns = getColumns();
  const [rows, setRows] = useState([]);
  const [urlExport, setUrlExport] = useState("");

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const ENDPOINT_URL = "other/credit-facility";

  const showNotif = (status, message) => {
    dispatch(
      val({
        status: status,
        message: message,
      })
    );
  };

  const formatingFilter = (filter) => {
    const { code_company, periode } = filter;

    let fCodeCompany = code_company.split(" ");
    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    filterYear.current = {
      act: fPeriode[0],
      budget: fPeriode[2],
    };

    return {
      code_company: fCodeCompany,
      year: fPeriode[0],
    };
  };

  const onSetDataTable = (values) => {
    const formatFilter = formatingFilter(values);

    try {
      getData(formatFilter);
      setCodeFilter(formatFilter);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const getData = async (params) => {
    try {
      const { data } = await MainServices.get(`other/credit-facility`, params);

      let r = [];
      let d = data.data;
      const list = [];

      if (d.length > 0) {
        for (let i = 0; i < d.length; i++) {
          list.push({
            ...d[i],
            no: d[i].no.toString(),
          });
        }

        r = getRows({
          data: list,
          act: filterYear.current.act,
          budget: filterYear.current.budget,
        });
      } else {
        r = fullNewRow();
      }
      setRows(r);
    } catch (error) {
      console.error(`Error fetching data for code account`, error);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onChangeTable = async (change) => {
    try {
      const newRows = [...rows];
      let isChange;
      for (const c of change) {
        const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
        if (rowIndex < 0) continue;
        const columnIndex = columns.findIndex((j) => j.columnId === c.columnId);

        const type = newRows[rowIndex].cells[columnIndex].type;

        let value;

        if (type === "text") {
          newRows[rowIndex].cells[columnIndex].text = c.newCell.text;
          value = c.newCell.text;
          isChange = true;
        } else {
          newRows[rowIndex].cells[columnIndex].value = c.newCell.value;
          value = c.newCell.value;

          if (!isNaN(value)) {
            isChange = true;
          } else {
            isChange = false;
          }
        }

        if (isChange) {
          const id = c.rowId;
          const column_id = c.columnId;

          const formData = formDataUtils({
            id,
            column_id,
            value,
          });

          await MainServices.post(`other/credit-facility/update`, formData);
        }
      }

      getData(codeFilter);

      showNotif(200, "Sukses update data");
    } catch (e) {
      log({ e });
      showNotif(400, e.message);
    }
  };

  const onSuccess = () => {
    dispatch(resetDataActionImport());
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    dispatch(
      actionImport({
        loading: true,
      })
    );

    const type = dataGlobalRedux.typeRevenueImport ?? "actual";
    const date = new Date();
    const year = dataGlobalRedux.year ?? `${date.getFullYear()}`;

    let file;

    acceptedFiles.forEach((f) => {
      file = f;
    });

    const formData = formDataUtils({
      // ...codeFilter,
      file,
      type,
      year,
    });

    try {
      await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      getData(codeFilter);

      showNotif(200, "sukses import data");

      onSuccess();
    } catch (error) {
      showNotif(400, error.message);

      dispatch(
        actionImport({
          loading: false,
        })
      );
    }
  };

  const onOpenMenu = () => {
    setOpenMenu(true);
  };

  const onCloseMenu = () => {
    setOpenMenu(false);
  };

  const onOpenModalTambah = () => {
    setModalTambah(true);
  };

  const onCloseModalTambah = () => {
    setModalTambah(false);
    form.resetFields();
  };

  const onOkModalFasilitas = async (values) => {
    try {
      const formData = formDataUtils({
        ...codeFilter,
        account: values.code_account,
      });

      await MainServices.post(`other/credit-facility/insert`, formData);
      getData(codeFilter);
      onCloseModalTambah();
    } catch (e) {
      showNotif(400, e.message);
    }
  };

  const onExport = async () => {
    try {
      const formData = formDataUtils({
        ...codeFilter,
        filename: "export-fasilitas-kredit",
      });
      const res = await MainServices.downloadPost("other/credit-facility/export", formData);
      log({ res });
      const fileURL = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `export-fasilitas-kredit`;
      link.click();
    } catch (e) {
      log({ e });
      showNotif(400, e);
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
      modalTambah,
      form,
      codeFilter,
      openMenu,
    },
    func: {
      onFinish,
      onUploadFile,
      setUploadSucces,
      onChangeTable,
      onOpenModalTambah,
      onCloseModalTambah,
      onOkModalFasilitas,
      onOpenMenu,
      onCloseMenu,
      onExport,
    },
  };
};

export default Logic;
