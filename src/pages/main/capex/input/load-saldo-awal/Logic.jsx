import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { actionImport, resetDataActionImport, val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, generateUID, log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { actionData } from "redux/data-global/data.reducer";
import { fullNewRow, getRows } from "./getRows";
import { Form } from "antd";

const Logic = () => {
  const [codeFilter, setCodeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [openModalRetired, setOpenModalRetired] = useState(false);
  const [totalData, setTotalData] = useState(0);

  const [formRetired] = Form.useForm();

  const [dataRetired, setDataRetired] = useState({});
  const date = new Date();

  const columns = getColumns();
  const [rows, setRows] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const dispatch = useDispatch();

  const ENDPOINT_URL = "detailcapex";

  const responseShow = (res) => {
    log({ res });
    dispatch(
      val({
        status: res.responseCode,
        message: res.responseDescription,
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

  const formatingFilter = (filter) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
      status,
    } = filter;

    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");
    let fPeriode = periode.split(" ");
    let fStatus = status.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fPeriode = fPeriode[0];
    fStatus = fStatus[0].toLowerCase();

    return {
      code_company: fCodeCompany,
      code_product: fCodeProduct,
      code_location: fCodeLocation,
      code_department: fCodeDept,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
      year: fPeriode,
      filter: fStatus,
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
    const url = `${ENDPOINT_URL}/load`;
    const { data } = await MainServices.get(url, params);
    log("data.data", data.data.data);
    let r;
    if (data.data.data.length > 0) {
      r = getRows({
        data: data.data.data,
      });
      setTotalData(data.data.total);
    } else {
      r = fullNewRow({ id: generateUID() });
    }
    setRows(r);
  };

  const onFinish = (values) => {
    setLoading(true);

    onSetDataTable(values);
  };

  const updateData = async (cell) => {
    if (Object.keys(cell).length === 3) {
      try {
        const formData = new FormData();
        for (var item in cell) {
          formData.append(item, cell[item]);
        }
        const res = await MainServices.post(`${ENDPOINT_URL}/update`, formData);

        if (res.data.responseCode === 200) {
          showNotif(200, "Sukses update data");
        } else {
          showNotif(500, "Error");
        }
      } catch (e) {
        log({ e });
      }
    }
  };

  const onChangeTable = async (change) => {
    let newRows = [...rows];

    for (const c of change) {
      const rowIndex = newRows.findIndex((j) => j.rowId === c.rowId);
      const columnIndex = parseInt(columns.findIndex((j) => j.columnId === c.columnId));
      const type = c.newCell.type;

      const id = newRows[rowIndex].rowId;
      const column_id = c.columnId;

      if (type === "text") {
        newRows[rowIndex].cells[columnIndex].text = c.newCell.text;

        updateData({
          id,
          column_id,
          value: c.newCell.value,
        });
      } else if (type === "number") {
        newRows[rowIndex].cells[columnIndex].value = c.newCell.value;

        updateData({
          id,
          column_id,
          value: c.newCell.value,
        });
      } else if (type === "dropdown") {
        if (c.previousCell.selectedValue !== c.newCell.selectedValue) {
          newRows[rowIndex].cells[columnIndex].selectedValue = c.newCell.selectedValue;

          updateData({
            id,
            column_id,
            value: c.newCell.selectedValue,
          });
        }

        if (c.newCell.inputValue) {
          newRows[rowIndex].cells[columnIndex].selectedValue = c.newCell.inputValue;

          updateData({
            id,
            column_id,
            value: c.newCell.inputValue,
          });
        }

        // CHANGED: set the isOpen property to the value received.
        newRows[rowIndex].cells[columnIndex].isOpen = c.newCell.isOpen;
      } else if (type === "button") {
        setOpenModalRetired(true);
        setDataRetired({
          id,
          column_id,
        });
      } else {
        log({ error: `Error on cell column ${columnIndex} & row ${rowIndex}` });
      }
    }

    setRows(newRows);
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

    let file1;

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    const formData = new FormData();

    for (let item in codeFilter) {
      formData.append(item, codeFilter[item]);
    }

    formData.append("file", file1);

    try {
      const res = await MainServices.post(`${ENDPOINT_URL}/import`, formData);

      await getData(codeFilter);

      responseShow(res.data);

      onSuccess();
    } catch (error) {
      log({ error });
      showNotif("404", JSON.stringify(error));
      dispatch(
        actionImport({
          loading: false,
        })
      );
    }
  };

  const onChangePagination = (page, pageSize) => {
    log({ page });
    log({ pageSize });
    const uFilter = {
      ...codeFilter,
      page,
    };
    getData(uFilter);
  };

  const onFinishModalRetired = async (params) => {
    try {
      const newParams = {
        ...params,
        disposal_month: params.disposal_month ?? "1",
        disposal_year: params.disposal_year ?? `${date.getFullYear()}`,
      };

      log({ newParams });
      log({ dataRetired });

      const formData = formDataUtils({
        ...dataRetired,
        ...newParams,
      });
      const res = await MainServices.post(`${ENDPOINT_URL}/update`, formData);
      showNotif(200, "Sukses update data");
    } catch (e) {
      showNotif(400, e.message);
    }
  };

  const onCancelModalRetired = () => {
    setOpenModalRetired(false);
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
      totalData,
      openModalRetired,
      formRetired,
    },
    func: {
      onFinish,
      onUploadFile,
      setUploadSucces,
      onChangeTable,
      onChangePagination,
      onFinishModalRetired,
      onCancelModalRetired,
    },
  };
};

export default Logic;
