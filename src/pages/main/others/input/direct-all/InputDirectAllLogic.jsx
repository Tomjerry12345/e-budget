import { Typography } from "antd";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { columnInputType1 } from "../../../../../component/table/utils/TypeColumn";
import { val } from "../../../../../redux/action/action.reducer";
import MainServices from "../../../../../services/MainServices";
import { log, sumYearTotal } from "../../../../../values/Utilitas";

const InputDirectAllLogic = () => {
  const date = new Date();
  const dispatch = useDispatch();

  const [dataColumnInput, setDataColumnInput] = useState([]);
  const [codeFilter, setCodeFilter] = useState();
  const [listKeyParent, setListKeyParent] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);
  const [filter, setFilter] = useState(false);
  const [tahun, setTahun] = useState();
  const [yearFilter, setYearFilter] = useState(date.getFullYear());

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
  };

  // const constantTableColums = [
  //   {
  //     title: "Account",
  //     dataIndex: "account",
  //     width: "18%",
  //     fixed: "left",
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     width: "30%",
  //     fixed: "left",
  //   },
  //   {
  //     title: `Year ${year}`,
  //     editable: true,
  //     children: [
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Jan.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "jan_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Feb.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "feb_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Mar.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "mar_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Apr.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "apr_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>May.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "mei_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Jun.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "jun_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Jul.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "jul_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Aug.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "aug_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="act-styles">Actual</Typography.Text>
  //             <Typography.Text>Sep.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "sep_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="for-styles">Forecast</Typography.Text>
  //             <Typography.Text>Okt.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "okt_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="for-styles">Forecast</Typography.Text>
  //             <Typography.Text>Nov.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "nov_1",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="for-styles">Forecast</Typography.Text>
  //             <Typography.Text>Des.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "des_1",
  //         editable: true,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Year total",
  //     dataIndex: "year_total_1",
  //     width: "14%",
  //   },
  //   {
  //     title: `Year ${year + 1}`,
  //     editable: true,
  //     children: [
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Jan.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "jan_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Feb.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "feb_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Mar.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "mar_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Apr.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "apr_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>May.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "mei_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Jun.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "jun_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Jul.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "jul_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Aug.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "aug_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Sep.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "sep_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Okt.</Typography.Text>
  //           </div>
  //         ),
  //         width: 100,
  //         dataIndex: "okt_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Nov.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "nov_2",
  //         editable: true,
  //       },
  //       {
  //         title: (
  //           <div className="title-table">
  //             <Typography.Text className="ebu-styles">Budget</Typography.Text>
  //             <Typography.Text>Des.</Typography.Text>
  //           </div>
  //         ),
  //         width: 110,
  //         dataIndex: "des_2",
  //         editable: true,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Year total",
  //     dataIndex: "year_total_2",
  //     width: "14%",
  //   },
  //   // {
  //   //   dataIndex: "operation",
  //   //   fixed: "right",
  //   //   width: "5%",
  //   //   render: (_, record) =>
  //   //     dataColumn.length >= 1 ? (
  //   //       <Dropdown overlay={menu} placement="bottom">
  //   //         <Button icon={<MoreVertIcon />}></Button>
  //   //       </Dropdown>
  //   //     ) : null,
  //   // },
  // ];

  const columns = columnInputType1(yearFilter, parseInt(yearFilter) + 1).map(
    (col) => {
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
    }
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

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
    // const url = `directall/list?code_company=${codeCompany}&code_product=${codeProduct}&code_location=${codeLocation}&code_dept=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&periode=${periode}`;
    // const { data } = await MainServices.get(url);
    // getDataTable(data);
    dispatch(
      val({
        status: 400,
        message: "Fitur ini sementara pengembangan",
      })
    );
    setLoading(false);
  };

  // const getDataTable = (response) => {
  //   const { data } = response;
  //   let list = [];
  //   let year_1 = 0;
  //   let year_2 = 0;
  //   let year_total_1 = "";
  //   let year_total_2 = "";

  //   let keyParent = [];

  //   data?.list?.forEach((val, i) => {
  //     year_1 = val.detail[0].year;
  //     year_2 = val.detail[1].year;

  //     year_total_1 = 0;
  //     year_total_2 = 0;

  //     const account = val.account;
  //     const description = val.description;
  //     const listYear1 = [];
  //     const listYear2 = [];
  //     let parent = val.parent;

  //     if (parent) {
  //       keyParent.push(i);
  //     }

  //     val.detail[0].list_month?.forEach((month) => {
  //       listYear1.push(month);
  //       year_total_1 += month.value;
  //     });

  //     val.detail[1].list_month?.forEach((month) => {
  //       listYear2.push(month);
  //       year_total_2 += month.value;
  //     });

  //     list.push({
  //       key: i,
  //       parent: parent,
  //       account: account,
  //       description: description,
  //       jan_1: listYear1[0]?.value,
  //       jan_1_uuid: listYear1[0]?.uuid,
  //       jan_1_month: listYear1[0]?.month,
  //       jan_1_year: year_1,
  //       feb_1: listYear1[1]?.value,
  //       feb_1_uuid: listYear1[1]?.uuid,
  //       feb_1_month: listYear1[1]?.month,
  //       feb_1_year: year_1,
  //       mar_1: listYear1[2]?.value,
  //       mar_1_uuid: listYear1[2]?.uuid,
  //       mar_1_month: listYear1[2]?.month,
  //       mar_1_year: year_1,
  //       apr_1: listYear1[3]?.value,
  //       apr_1_uuid: listYear1[3]?.uuid,
  //       apr_1_month: listYear1[3]?.month,
  //       apr_1_year: year_1,
  //       mei_1: listYear1[4]?.value,
  //       mei_1_uuid: listYear1[4]?.uuid,
  //       mei_1_month: listYear1[4]?.month,
  //       mei_1_year: year_1,
  //       jun_1: listYear1[5]?.value,
  //       jun_1_uuid: listYear1[5]?.uuid,
  //       jun_1_month: listYear1[5]?.month,
  //       jun_1_year: year_1,
  //       jul_1: listYear1[6]?.value,
  //       jul_1_uuid: listYear1[6]?.uuid,
  //       jul_1_month: listYear1[6]?.month,
  //       jul_1_year: year_1,
  //       aug_1: listYear1[7]?.value,
  //       aug_1_uuid: listYear1[7]?.uuid,
  //       aug_1_month: listYear1[7]?.month,
  //       aug_1_year: year_1,
  //       sep_1: listYear1[8]?.value,
  //       sep_1_uuid: listYear1[8]?.uuid,
  //       sep_1_month: listYear1[8]?.month,
  //       sep_1_year: year_1,
  //       okt_1: listYear1[9]?.value,
  //       okt_1_uuid: listYear1[9]?.uuid,
  //       okt_1_month: listYear1[9]?.month,
  //       okt_1_year: year_1,
  //       nov_1: listYear1[10]?.value,
  //       nov_1_uuid: listYear1[10]?.uuid,
  //       nov_1_month: listYear1[10]?.month,
  //       nov_1_year: year_1,
  //       des_1: listYear1[11]?.value,
  //       des_1_uuid: listYear1[11]?.uuid,
  //       des_1_month: listYear1[11]?.month,
  //       des_1_year: year_1,
  //       year_total_1: year_total_1,
  //       jan_2: listYear2[0]?.value,
  //       jan_2_uuid: listYear2[0]?.uuid,
  //       jan_2_month: listYear2[0]?.month,
  //       jan_2_year: year_2,
  //       feb_2: listYear2[1]?.value,
  //       feb_2_uuid: listYear2[1]?.uuid,
  //       feb_2_month: listYear2[1]?.month,
  //       feb_2_year: year_2,
  //       mar_2: listYear2[2]?.value,
  //       mar_2_uuid: listYear2[2]?.uuid,
  //       mar_2_month: listYear2[2]?.month,
  //       mar_2_year: year_2,
  //       apr_2: listYear2[3]?.value,
  //       apr_2_uuid: listYear2[3]?.uuid,
  //       apr_2_month: listYear2[3]?.month,
  //       apr_2_year: year_2,
  //       mei_2: listYear2[4]?.value,
  //       mei_2_uuid: listYear2[4]?.uuid,
  //       mei_2_month: listYear2[4]?.month,
  //       mei_2_year: year_2,
  //       jun_2: listYear2[5]?.value,
  //       jun_2_uuid: listYear2[5]?.uuid,
  //       jun_2_month: listYear2[5]?.month,
  //       jun_2_year: year_2,
  //       jul_2: listYear2[6]?.value,
  //       jul_2_uuid: listYear2[6]?.uuid,
  //       jul_2_month: listYear2[6]?.month,
  //       jul_2_year: year_2,
  //       aug_2: listYear2[7]?.value,
  //       aug_2_uuid: listYear2[7]?.uuid,
  //       aug_2_month: listYear2[7]?.month,
  //       aug_2_year: year_2,
  //       sep_2: listYear2[8]?.value,
  //       sep_2_uuid: listYear2[8]?.uuid,
  //       sep_2_month: listYear2[8]?.month,
  //       sep_2_year: year_2,
  //       okt_2: listYear2[9]?.value,
  //       okt_2_uuid: listYear2[9]?.uuid,
  //       okt_2_month: listYear2[9]?.month,
  //       okt_2_year: year_2,
  //       nov_2: listYear2[10]?.value,
  //       nov_2_uuid: listYear2[10]?.uuid,
  //       nov_2_month: listYear2[10]?.month,
  //       nov_2_year: year_2,
  //       des_2: listYear2[11]?.value,
  //       des_2_uuid: listYear2[11]?.uuid,
  //       des_2_month: listYear2[11]?.month,
  //       des_2_year: year_2,
  //       year_total_2: year_total_2,
  //     });
  //   });

  //   setListKeyParent(keyParent);
  //   setDataColumnInput(list);
  // };

  const getDataTable = (response) => {
    const { data } = response;

    const list = [];

    data.list.forEach((val, i) => {
      list.push({ ...val, key: i });
    });

    setDataColumnInput(list);
  };

  const onFinish = (values) => {
    setFilter(false);
    setLoading(true);
    onSetDataTable(values);
  };

  const handleSave = async (row, keysEdit, valuesEdit) => {
    const newData = [...dataColumnInput];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    const oldValue = item[`${keysEdit}`];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    for (let x = index - 1; x >= 0; x--) {
      if (newData[x].parent === true) {
        const itemparent = newData[x];
        const itemold = newData[x];

        itemparent[`${keysEdit}`] =
          parseInt(itemparent[`${keysEdit}`]) +
          parseInt(valuesEdit) -
          parseInt(oldValue);

        const { sum, i } = sumYearTotal(itemparent, keysEdit[0]);

        if (i == 1) {
          itemparent.year1 = sum;
        } else {
          itemparent.year2 = sum;
        }

        newData.splice(x, 1, {
          ...itemold,
          ...itemparent,
        });
      }
    }

    const { sum, i } = sumYearTotal(newData[index], keysEdit[0]);

    if (i == 1) {
      newData[index].year1 = sum;
    } else {
      newData[index].year2 = sum;
    }

    setDataColumnInput(newData);

    let formData = new FormData();
    const {
      code_company,
      code_product,
      code_location,
      code_dept,
      code_icp,
      code_project,
      periode,
    } = codeFilter;

    const year = i == 1 ? periode : parseInt(periode) + 1;
    const month = row[`${keysEdit}_month`];
    const uuid = row[`${keysEdit}_uuid`];

    if (uuid === null) {
      formData.append("code", row.code);
      formData.append("code_company", code_company);
      formData.append("code_product", code_product);
      formData.append("code_location", code_location);
      formData.append("code_dept", code_dept);
      formData.append("code_icp", code_icp);
      formData.append("code_project", code_project);
      formData.append("month", month);
      formData.append("year", year);
    } else {
      formData.append("uuid", uuid);
    }

    formData.append("value", valuesEdit);

    await MainServices.post("directall/update", formData);
  };

  const onSuccess = () => {
    setUploadSucces(true);
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    let tahun1 = tahun === undefined ? new Date().getFullYear() : tahun;
    setLoadingUpload(true);

    let file1;

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    let formData = new FormData();

    formData.append("file", file1);
    formData.append("year", tahun1);

    try {
      const res = await MainServices.post("directall/import", formData);

      if (codeFilter !== undefined) {
        const { code_company, code_dept, code_location, code_product } =
          codeFilter;

        getData(code_company, code_product, code_location, code_dept);
      }

      responseShow(res);

      setLoadingUpload(false);

      onSuccess();
    } catch (error) {
      const err = error.response;
      log("error", err);
      responseShow(err);
      setLoadingUpload(false);
    }
  };

  const onChangeTahun = (e) => {
    setTahun(e);
  };

  return {
    value: {
      dataColumnInput,
      columns,
      listKeyParent,
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
    },
  };
};

export default InputDirectAllLogic;
