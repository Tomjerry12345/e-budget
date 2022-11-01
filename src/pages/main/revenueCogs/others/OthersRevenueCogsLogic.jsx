import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAsync, postAsync } from "../../../../redux/main/main.thunks";
import { getSizeScreen, log, logObj } from "../../../../values/Utilitas";

const menuReveneue = {
  "Revenue & COGS HK": {
    parentUrl: "hk",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS KIU": {
    parentUrl: "kiu",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
      {
        name: "listDisc",
        endPoint: "listdisc",
        update: "updatedisc",
      },
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
  },
  "Revenue & COGS BTS": {
    parentUrl: "bts",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS KIA": {
    parentUrl: "kia",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS BJU": {
    parentUrl: "bju",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS BLT": {
    parentUrl: "blt",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
      {
        name: "listVolume",
        endPoint: "listvolume",
        update: "updatevolume",
      },
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
  },
  "Revenue & COGS BLU": {
    parentUrl: "blu",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
      {
        name: "listVolume",
        endPoint: "listvolume",
        update: "updatevolume",
      },
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
  },
  "Revenue & COGS BK": {
    parentUrl: "bk",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
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
  },
  "Revenue & COGS BSU": {
    parentUrl: "bsu",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS BSB": {
    parentUrl: "bsb",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS KIK": {
    parentUrl: "kik",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS IKP": {
    parentUrl: "ikp",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
  "Revenue & COGS BAND": {
    parentUrl: "band",
    childUrl: [
      {
        name: "listAsumsi",
        endPoint: "listasumsi",
        update: "update",
      },
      {
        name: "listHarga",
        endPoint: "listharga",
        update: "updateharga",
      },
      {
        name: "listPenjualan",
        endPoint: "listpenjualan",
        update: "updatepenjualan",
      },
      {
        name: "listPotongan",
        endPoint: "listpotongan",
        update: "updatepotongan",
      },
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
  },
};

const OthersRevenueCogsLogic = () => {
  let params = useParams();

  const itemPage = params.item;

  const singleRevenue = menuReveneue[itemPage];

  const [form] = Form.useForm();

  const ref = createRef();

  const dispatch = useDispatch();

  const { isLoading, response, errorMessage, nameReducer } = useSelector(
    (state) => state.reducer
  );

  const [tableColumn, setTableColumn] = useState({
    listAsumsi: [],
    listHarga: [],
    listPenjualan: [],
    listPotongan: [],
    listVolume: [],
    listDisc: [],
    listPendapatanLain: [],
  });

  const [dataColumnInput, setDataColumnInput] = useState({
    listAsumsi: [],
    listHarga: [],
    listPenjualan: [],
    listPotongan: [],
    listVolume: [],
    listDisc: [],
    listPendapatanLain: [],
  });

  const [codeFilter, setCodeFilter] = useState(null);

  const [allCodeFilter, setAllCodeFilter] = useState({
    code_company: [],
    code_dept: [],
    code_location: [],
    code_product: [],
    code_account: [],
  });

  const urlComboBox = [
    {
      name: "code_dept",
      endPoint: "dept/list",
    },
    {
      name: "code_location",
      endPoint: "location",
    },
  ];

  const [urlIndexComboBox, setUrlIndexComboBox] = useState(0);

  const [urlIndex, setUrlIndex] = useState(0);

  const [listKeyParent, setListKeyParent] = useState();

  const [loading, setLoading] = useState(false);

  const [codeCompany, setCodeCompany] = useState(null);

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);

    if (codeFilter === null) {
      onGetCodeFilter();
    } else {
      setUrlIndex(0);
      onSetDataTable(codeFilter);
    }
  }, [itemPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    log("response", response);
    logObj("nameReducer", nameReducer);

    if (response !== null) {
      if (nameReducer === "update") {
        // setDataColumnInput({});
        setUrlIndex(0);
        logObj("urlindex", urlIndex);
        onSetDataTable(codeFilter);
      } else if (nameReducer === "get-data") {
        log(`get Data`);
        const {
          code_company,
          code_dept,
          code_location,
          code_product,
          // code_account,
        } = codeFilter;

        getDataTable(
          response,
          singleRevenue.childUrl[urlIndex].name,
          singleRevenue.childUrl[urlIndex].update
        );

        // alert(singleRevenue.childUrl.length);

        if (urlIndex + 1 <= singleRevenue.childUrl.length - 1) {
          // if (url[urlIndex + 1].endPoint !== undefined) {

          // }
          const path = `${singleRevenue.parentUrl}/${
            singleRevenue.childUrl[urlIndex + 1].endPoint
          }?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`;
          dispatch(getAsync(path, "get-data"));
        }

        if (urlIndex === singleRevenue.childUrl.length - 1) {
          setUrlIndex(0);
        }

        setUrlIndex((current) => current + 1);

        setLoading(false);
      } else {
        log(`setAllCodeFilter`);
        const { data } = response;
        setAllCodeFilter({
          ...allCodeFilter,
          [nameReducer]: data,
        });

        if (codeCompany !== null) {
          let urlComboBox1;

          if (urlIndexComboBox <= 1) {
            if (urlIndexComboBox === 0) {
              urlComboBox1 = urlComboBox[urlIndexComboBox].endPoint;
            } else {
              urlComboBox1 = `${urlComboBox[urlIndexComboBox].endPoint}/list-by-com?code_company=${codeCompany}`;
            }
          }

          if (urlComboBox1 !== undefined) {
            dispatch(
              getAsync(urlComboBox1, urlComboBox[urlIndexComboBox].name)
            );
          }

          setUrlIndexComboBox((current) => current + 1);
        }
      }
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading, response]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = (year_1, year_2, keyParent, name) => {
    // const constantTableColums = [
    //   {
    //     title: "Description",
    //     dataIndex: "description",
    //     width: "30%",
    //     fixed: "left",
    //   },
    //   {
    //     title: `Year ${year_1}`,
    //     editable: true,
    //     children: [
    //       {
    //         title: (
    //           <span>
    //             Jan. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "jan_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Feb. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "feb_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Mar. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "mar_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Apr. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "apr_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             May. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 110,
    //         dataIndex: "mei_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Jun. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "jun_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Jul. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "jul_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Aug. <span className="act-styles">Act</span>
    //           </span>
    //         ),
    //         width: 110,
    //         dataIndex: "aug_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Sep. <span className="for-styles">For</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "sep_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Okt. <span className="for-styles">For</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "okt_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Nov. <span className="for-styles">For</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "nov_1",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Des. <span className="for-styles">For</span>
    //           </span>
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
    //     title: `Year ${year_2}`,
    //     children: [
    //       {
    //         title: (
    //           <span>
    //             Jan. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "jan_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Feb. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "feb_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Mar. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 110,
    //         dataIndex: "mar_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Apr. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "apr_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             May. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 110,
    //         dataIndex: "mei_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Jun. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "jun_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Jul. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "jul_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Aug. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 110,
    //         dataIndex: "aug_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Sep. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 110,
    //         dataIndex: "sep_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Okt. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 100,
    //         dataIndex: "okt_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Nov. <span className="ebu-styles">Ebu</span>
    //           </span>
    //         ),
    //         width: 110,
    //         dataIndex: "nov_2",
    //         editable: true,
    //       },
    //       {
    //         title: (
    //           <span>
    //             Des. <span className="ebu-styles">Ebu</span>
    //           </span>
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

    const constantTableColums = {
      listAsumsi: [
        {
          title: "Kode",
          dataIndex: "code",
          width: "10%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: true,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "mar_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_1",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "sep_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "nov_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "des_1",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_1",
          width: "14%",
        },
        {
          title: `Year ${year_2}`,
          editable: true,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mar_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_2",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "sep_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "nov_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "des_2",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_2",
          width: "14%",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
      listHarga: [
        {
          title: "Kode",
          dataIndex: "code",
          width: "10%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: true,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "mar_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_1",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "sep_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "nov_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "des_1",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_1",
          width: "14%",
        },
        {
          title: `Year ${year_2}`,
          editable: true,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mar_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_2",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "sep_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "nov_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "des_2",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_2",
          width: "14%",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
      listPenjualan: [
        {
          title: "Kode",
          dataIndex: "code",
          width: "10%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: false,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Feb. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Mar. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "mar_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Apr. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_1",
              editable: false,
            },
            {
              title: (
                <span>
                  May. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Jun. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Jul. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Aug. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Sep. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "sep_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Okt. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Nov. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "nov_1",
              editable: false,
            },
            {
              title: (
                <span>
                  Des. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "des_1",
              editable: false,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_1",
          width: "14%",
        },
        {
          title: `Year ${year_2}`,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Feb. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Mar. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mar_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Apr. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_2",
              editable: false,
            },
            {
              title: (
                <span>
                  May. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Jun. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Jul. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Aug. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Sep. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "sep_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Okt. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Nov. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "nov_2",
              editable: false,
            },
            {
              title: (
                <span>
                  Des. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "des_2",
              editable: false,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_2",
          width: "14%",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
      listPotongan: [
        {
          title: "Potongan",
          dataIndex: "potongan",
          width: "20%",
          fixed: "left",
          editable: true,
        },
        {
          title: "Kode",
          dataIndex: "code",
          width: "15%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: false,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "mar_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_1",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "sep_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "nov_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "des_1",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_1",
          width: "14%",
        },
        {
          title: `Year ${year_2}`,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mar_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_2",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "sep_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "nov_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "des_2",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_2",
          width: "14%",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
      listPendapatanLain: [
        {
          title: "Kode",
          dataIndex: "code",
          width: "10%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: true,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "mar_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_1",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "sep_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "nov_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "des_1",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_1",
          width: "14%",
        },
        {
          title: `Year ${year_2}`,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mar_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_2",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "sep_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "nov_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "des_2",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_2",
          width: "14%",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
      listHppVariable: [
        {
          title: "Kode",
          dataIndex: "code",
          width: "10%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: true,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "mar_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_1",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "sep_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "nov_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "des_1",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_1",
          width: "14%",
        },
        {
          title: `Year ${year_2}`,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mar_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_2",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "sep_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "nov_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "des_2",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_2",
          width: "14%",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
      listHppLain: [
        {
          title: "Kode",
          dataIndex: "code",
          width: "10%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: true,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "mar_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_1",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="act-styles">Act</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="act-styles">Act</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "sep_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "nov_1",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="for-styles">For</span>
                </span>
              ),
              width: 100,
              dataIndex: "des_1",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_1",
          width: "14%",
        },
        {
          title: `Year ${year_2}`,
          children: [
            {
              title: (
                <span>
                  Jan. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jan_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Feb. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "feb_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Mar. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mar_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Apr. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "apr_2",
              editable: true,
            },
            {
              title: (
                <span>
                  May. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "mei_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jun. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jun_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Jul. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "jul_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Aug. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "aug_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Sep. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "sep_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Okt. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 100,
              dataIndex: "okt_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Nov. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "nov_2",
              editable: true,
            },
            {
              title: (
                <span>
                  Des. <span className="ebu-styles">Ebu</span>
                </span>
              ),
              width: 110,
              dataIndex: "des_2",
              editable: true,
            },
          ],
        },
        {
          title: "Year total",
          dataIndex: "year_total_2",
          width: "14%",
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
      ],
    };

    const columns = constantTableColums[name].map((col) => {
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
          keyNotEditTable: keyParent,
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
              keyNotEditTable: keyParent,
            }),
          };
        });
      }

      return newCol;
    });

    // setTableColumn(columns);
    setTableColumn({ ...tableColumn, [name]: columns });
  };

  const onSetDataTable = (values) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      // code_account,
    } = values;
    setCodeFilter(values);
    const path = `${singleRevenue.parentUrl}/listasumsi?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`;
    // const path = `capex/list?code_company=${211}&code_product=${107}&code_location=${110117}&code_dept=${116}`;
    dispatch(getAsync(path, "get-data"));
  };

  const getDataTable = (response, name, e) => {
    const { data } = response;
    let list = [];
    let year_1 = 0;
    let year_2 = 0;
    let year_total_1 = "";
    let year_total_2 = "";

    let keyParent = [];

    data?.list?.forEach((val, i) => {
      year_1 = val.detail[0].year;
      year_2 = val.detail[1].year;

      year_total_1 = 0;
      year_total_2 = 0;

      const potongan = val.potongan;
      const code = val.code;
      const description = val.description;

      const listYear1 = [];
      const listYear2 = [];
      let parent = val.detail[0].list_month[0]?.parent;

      if (parent) {
        keyParent.push(i);
      }

      val.detail[0].list_month?.forEach((month) => {
        listYear1.push(month);
        year_total_1 += month.value;
      });

      val.detail[1].list_month?.forEach((month) => {
        listYear2.push(month);
        year_total_2 += month.value;
      });

      // const jan_val_1 = parseInt(listYear1[0]?.value).format(0, 3, ".", ",");

      list.push({
        key: i,
        potongan: potongan,
        code: code,
        // account: account,
        description: description,
        endpoint: e,
        jan_1: listYear1[0]?.value,
        // jan_1: jan_val_1,
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

    setListKeyParent(keyParent);

    logObj(`name`, name);
    setDataColumnInput({ ...dataColumnInput, [name]: list });

    onSetColumn(year_1, year_2, keyParent, name);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    onSetDataTable(values);
    setLoading(true);
    // let formData = new FormData();
    // formData.append("username", values.username);
    // formData.append("password", values.password);
  };

  const handleSave = (row, keysEdit, valuesEdit) => {
    setLoading(true);
    let formData = new FormData();
    const { code_company, code_dept, code_location, code_product } = codeFilter;
    const code = row.code;
    const year = row[`${keysEdit}_year`];
    const month = row[`${keysEdit}_month`];
    const uuid = row[`${keysEdit}_uuid`];
    let e = row["endpoint"];

    logObj("row", row);
    logObj("e", e);
    logObj("year", year);
    logObj("month", month);
    logObj("code", code);
    logObj("valuesEdit", valuesEdit);

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

    dispatch(postAsync(`${singleRevenue.parentUrl}/${e}`, formData, "update"));
  };

  const onGetCodeFilter = () => {
    dispatch(getAsync("company/list-master", "code_company"));
  };

  const onChange = (e) => {
    const urlComboBox = `product/list-by-com?code_company=${e}`;
    setCodeCompany(e);
    dispatch(getAsync(urlComboBox, "code_product"));
  };

  return {
    value: {
      dataColumnInput,
      tableColumn,
      params,
      form,
      ref,
      size,
      listKeyParent,
      allCodeFilter,
      loading,
    },
    func: {
      onFinish,
      onChange,
    },
  };
};

export default OthersRevenueCogsLogic;
