import { Form, Typography } from "antd";
import { createRef, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getSizeScreen, log } from "../../../../../../values/Utilitas";
import { useLocation } from "react-router-dom";
import MainServices from "../../../../../../services/MainServices";
import { columnInputType2 } from "../../../../../../component/table/utils/TypeColumn";

const menuReveneue = {
  parentUrl: "blu",
  childUrl: [
    {
      name: "listPendapatanLain",
      endPoint: "listpendapatanlain",
      update: "updatependapatanlain",
    },
    {
      name: "listHppVariable",
      endPoint: "listhppvariable",
      update: "updatehpp",
    },
    {
      name: "listHppLain",
      endPoint: "listhpplain",
      update: "updatehpplain",
    },
  ],
  title: "BLU",
  code: 422,
};

const LainBluLogic = () => {
  const [form] = Form.useForm();
  let params = useParams();
  
  const [searchParams, setSearchParams] = useSearchParams();

  const singleRevenue = menuReveneue;

  const ref = createRef();

  const [dataColumnInput, setDataColumnInput] = useState({
    listPendapatanLain: [],
  });

  const [filterCompany, setFilterCompany] = useState({
    title: "",
    code: 0,
  });

  const [codeFilter, setCodeFilter] = useState(null);
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const date = new Date();
  const year = date.getFullYear();

  const constantTableColums = {
    listPendapatanLain: columnInputType2(year, year + 1, [true, true]),
    listHppVariable: columnInputType2(year, year + 1, [true, true]),
    listHppLain: columnInputType2(year, year + 1, [true, true])
  };

  const onSetColumn = (constColumns) => {
    const columns = constColumns.map((col) => {
      // console.log(`col => ${JSON.stringify(col)}`);
      if (!col.editable) {
        return col;
      }

      let newCol = {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };

      if (col.children) {
        newCol.children = col.children.map((t) => {
          return {
            ...t,
            onCell: (record) => ({
              record,
              editable: t.editable,
              dataIndex: t.dataIndex,
              title: t.title,
              handleSave,
            }),
          };
        });
      }

      return newCol;
    });
    return columns;
  };

  const tableColumn = {
    listPendapatanLain: onSetColumn(constantTableColums["listPendapatanLain"]),
    listHppVariable: onSetColumn(constantTableColums["listHppVariable"]),
    listHppLain: onSetColumn(constantTableColums["listHppLain"]),
  };

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    log("currentParams", currentParams)
    
    if (Object.keys(currentParams).length !== 0) {
      onFinish(currentParams);
      // window.history.replaceState({}, document.title);
    }
  }, [searchParams]);

  const onSetDataTable = async (values) => {
    const { code_company, code_dept, code_location } = values;

    let fCodeCompany = code_company;
    let fCodeLocation = code_location;
    let fCodeDept = code_dept;

    const childUrl = singleRevenue.childUrl;

    const resListPendapatanLain = await getData(
      fCodeCompany,
      fCodeLocation,
      fCodeDept,
      childUrl[0].endPoint,
      childUrl[0].update
    );

    const resListHppVariable = await getData(
      fCodeCompany,
      fCodeLocation,
      fCodeDept,
      childUrl[1].endPoint,
      childUrl[1].update
    );

    const resListHppLain = await getData(
      fCodeCompany,
      fCodeLocation,
      fCodeDept,
      childUrl[2].endPoint,
      childUrl[2].update
    );

    setDataColumnInput({
      ...dataColumnInput,
      [childUrl[0].name]: resListPendapatanLain,
      [childUrl[1].name]: resListHppVariable,
      [childUrl[2].name]: resListHppLain,
    });

    setCodeFilter({
      code_company: fCodeCompany,
      code_dept: fCodeDept,
      code_location: fCodeLocation,
    });
  };

  const getData = async (
    codeCompany,
    codeLocation,
    codeDept,
    endPoint,
    update
  ) => {
    const url = `blu/${endPoint}?code_company=${codeCompany}&code_location=${codeLocation}&code_dept=${codeDept}`;

    const { data } = await MainServices.get(url);

    log("data", data);

    const list = getDataTable(data, update);

    setLoading(false);

    return list;
  };

  const getDataTable = (response, e) => {
    const { data } = response;
    let list = [];
    let year_1 = 0;
    let year_2 = 0;
    let year_total_1 = "";
    let year_total_2 = "";

    data?.list?.forEach((val, i) => {
      year_1 = val.detail[0].year;
      year_2 = val.detail[1].year;

      year_total_1 = 0;
      year_total_2 = 0;

      const potongan = val.potongan;
      const code = `${val.code}`;
      const description = val.description;

      const listYear1 = [];
      const listYear2 = [];

      val.detail[0].list_month?.forEach((month) => {
        listYear1.push(month);
        year_total_1 += month.value;
      });

      val.detail[1].list_month?.forEach((month) => {
        listYear2.push(month);
        year_total_2 += month.value;
      });

      list.push({
        key: i,
        potongan: potongan,
        code: code,
        description: description,
        endpoint: e,
        jan_1: listYear1[0]?.value,
        jan_1_uuid: listYear1[0]?.uuid,
        jan_1_month: listYear1[0]?.month,
        jan_1_year: year_1,
        feb_1: listYear1[1]?.value,
        feb_1_uuid: listYear1[1]?.uuid,
        feb_1_month: listYear1[1]?.month,
        feb_1_year: year_1,
        mar_1: listYear1[2]?.value,
        mar_1_uuid: listYear1[2]?.uuid,
        mar_1_month: listYear1[2]?.month,
        mar_1_year: year_1,
        apr_1: listYear1[3]?.value,
        apr_1_uuid: listYear1[3]?.uuid,
        apr_1_month: listYear1[3]?.month,
        apr_1_year: year_1,
        mei_1: listYear1[4]?.value,
        mei_1_uuid: listYear1[4]?.uuid,
        mei_1_month: listYear1[4]?.month,
        mei_1_year: year_1,
        jun_1: listYear1[5]?.value,
        jun_1_uuid: listYear1[5]?.uuid,
        jun_1_month: listYear1[5]?.month,
        jun_1_year: year_1,
        jul_1: listYear1[6]?.value,
        jul_1_uuid: listYear1[6]?.uuid,
        jul_1_month: listYear1[6]?.month,
        jul_1_year: year_1,
        aug_1: listYear1[7]?.value,
        aug_1_uuid: listYear1[7]?.uuid,
        aug_1_month: listYear1[7]?.month,
        aug_1_year: year_1,
        sep_1: listYear1[8]?.value,
        sep_1_uuid: listYear1[8]?.uuid,
        sep_1_month: listYear1[8]?.month,
        sep_1_year: year_1,
        okt_1: listYear1[9]?.value,
        okt_1_uuid: listYear1[9]?.uuid,
        okt_1_month: listYear1[9]?.month,
        okt_1_year: year_1,
        nov_1: listYear1[10]?.value,
        nov_1_uuid: listYear1[10]?.uuid,
        nov_1_month: listYear1[10]?.month,
        nov_1_year: year_1,
        des_1: listYear1[11]?.value,
        des_1_uuid: listYear1[11]?.uuid,
        des_1_month: listYear1[11]?.month,
        des_1_year: year_1,
        year_total_1: year_total_1,
        jan_2: listYear2[0]?.value,
        jan_2_uuid: listYear2[0]?.uuid,
        jan_2_month: listYear2[0]?.month,
        jan_2_year: year_2,
        feb_2: listYear2[1]?.value,
        feb_2_uuid: listYear2[1]?.uuid,
        feb_2_month: listYear2[1]?.month,
        feb_2_year: year_2,
        mar_2: listYear2[2]?.value,
        mar_2_uuid: listYear2[2]?.uuid,
        mar_2_month: listYear2[2]?.month,
        mar_2_year: year_2,
        apr_2: listYear2[3]?.value,
        apr_2_uuid: listYear2[3]?.uuid,
        apr_2_month: listYear2[3]?.month,
        apr_2_year: year_2,
        mei_2: listYear2[4]?.value,
        mei_2_uuid: listYear2[4]?.uuid,
        mei_2_month: listYear2[4]?.month,
        mei_2_year: year_2,
        jun_2: listYear2[5]?.value,
        jun_2_uuid: listYear2[5]?.uuid,
        jun_2_month: listYear2[5]?.month,
        jun_2_year: year_2,
        jul_2: listYear2[6]?.value,
        jul_2_uuid: listYear2[6]?.uuid,
        jul_2_month: listYear2[6]?.month,
        jul_2_year: year_2,
        aug_2: listYear2[7]?.value,
        aug_2_uuid: listYear2[7]?.uuid,
        aug_2_month: listYear2[7]?.month,
        aug_2_year: year_2,
        sep_2: listYear2[8]?.value,
        sep_2_uuid: listYear2[8]?.uuid,
        sep_2_month: listYear2[8]?.month,
        sep_2_year: year_2,
        okt_2: listYear2[9]?.value,
        okt_2_uuid: listYear2[9]?.uuid,
        okt_2_month: listYear2[9]?.month,
        okt_2_year: year_2,
        nov_2: listYear2[10]?.value,
        nov_2_uuid: listYear2[10]?.uuid,
        nov_2_month: listYear2[10]?.month,
        nov_2_year: year_2,
        des_2: listYear2[11]?.value,
        des_2_uuid: listYear2[11]?.uuid,
        des_2_month: listYear2[11]?.month,
        des_2_year: year_2,
        year_total_2: year_total_2,
      });
    });

    return list;
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const handleSave = async (row, keysEdit, valuesEdit) => {
    let formData = new FormData();
    const { code_company, code_dept, code_location, code_product } = codeFilter;
    const code = row.code;
    const year = row[`${keysEdit}_year`];
    const month = row[`${keysEdit}_month`];
    const uuid = row[`${keysEdit}_uuid`];
    let e = row["endpoint"];

    if (uuid === null) {
      formData.append("code", code);
      formData.append("code_company", code_company);
      formData.append("code_product", code_product);
      formData.append("code_location", code_location);
      formData.append("code_dept", code_dept);
      formData.append("month", month);
      formData.append("year", year);
    } else {
      formData.append("uuid", uuid);
    }

    formData.append("value", valuesEdit);

    const response = await MainServices.post(
      `${singleRevenue.parentUrl}/${e}`,
      formData
    );

    log("response-update", response);

    onSetDataTable(codeFilter);
  };

  return {
    value: {
      dataColumnInput,
      tableColumn,
      params,
      form,
      ref,
      size,
      loading,
      filterCompany,
    },
    func: {
      onFinish,
    },
  };
};

export default LainBluLogic;
