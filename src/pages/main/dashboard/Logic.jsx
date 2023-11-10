import { Form } from "antd";
import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { log } from "values/Utilitas";

const Logic = () => {
  const dataSource = [
    {
      key: "1",
      no: "1",
      sbu: "PT. Hadji Kalla",
      revenue: "7.000.000.000.000",
    },
    {
      key: "2",
      no: "2",
      sbu: "PT. Gowa Modern Motor",
      revenue: "7.000.000.000",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "SBU",
      dataIndex: "sbu",
      key: "sbu",
    },
    {
      title: "Revenue",
      dataIndex: "value",
      key: "value",
      align: "right",
    },
  ];

  const [dataMain, setDataMain] = useState();
  const [dataGrowth, setDataGrowth] = useState([]);
  const [dataTopRevenue, setDataTopRevenue] = useState([]);
  const [dataTopEbt, setDataTopEbt] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      code_product: "",
      code_location: "",
      code_dept: "",
      code_icp: "",
      code_project: "",
      // periode: "2023 - 2024",
    });
  }, []);

  const formatingFilter = (filter) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
      type,
    } = filter;

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

    return {
      code_company: fCodeCompany,
      code_product: fCodeProduct,
      code_location: fCodeLocation,
      code_department: fCodeDept,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
      year: fPeriode,
      type: type.toLowerCase(),
    };
  };

  const onFinish = (values) => {
    // setLoading(true);
    const formatFilter = formatingFilter(values);

    try {
      onGetData(formatFilter);
      // setCodeFilter(formatFilter);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const onGetData = async (params) => {
    const url = `dashboard`;
    try {
      const { data } = await MainServices.get(url, params);
      const d = data.data;
      onFormatMainChart(d);
      onFormatGrowthChart(d);
      onTopRevenue(d);
      onTopEbt(d);
    } catch (error) {
      console.error(`Error fetching data for code account`, error);
    }
  };

  const onFormatMainChart = (data) => {
    const mainChart = data.main_chart;
    const mainFixChart = {
      labels: mainChart.labels,
      datasets: [
        {
          data: mainChart.datasets.data,
          backgroundColor: mainChart.labels.map((e, i) => {
            return i % 2 === 0
              ? mainChart.datasets.background1
              : mainChart.datasets.background2;
          }),
          borderRadius: 8,
        },
      ],
    };
    setDataMain(mainFixChart);
  };

  function ambilAngka(input) {
    if (input < 100) {
      return 100;
    }

    const ordersOfMagnitude = Math.pow(10, Math.floor(Math.log10(input)));
    const multiplier = ordersOfMagnitude >= 1000 ? 1000 : 100;

    return Math.floor(input / multiplier) * multiplier;
  }

  const onFormatGrowthChart = (data) => {
    const listGrowthFixChart = [];
    const growthChart = data.growth_chart;
    growthChart.forEach((e) => {
      const absGrowth = e.datasets.data.map((element) => {
        if (element < 0) {
          return Math.abs(element); // Mengubah nilai negatif menjadi positif
        }
        return element; // Mempertahankan nilai lainnya
      });
      const maxGrowth = Math.max(...absGrowth);
      const sumGrowth = ambilAngka(maxGrowth);
      const growthFixChart = {
        data: {
          labels: e.labels,
          datasets: [
            {
              data: e.datasets.data,
              backgroundColor: e.labels.map((_, i) => {
                return i % 2 === 0 ? e.datasets.background1 : e.datasets.background2;
              }),
              borderRadius: 8,
            },
          ],
        },
        title: e.chart_name,
        maxValue: maxGrowth + sumGrowth,
        growth: parseInt(e.growth),
        // maxValue: Math.max(...e.datasets.data) + 18000000,
      };

      listGrowthFixChart.push(growthFixChart);
    });

    log({ listGrowthFixChart });

    setDataGrowth(listGrowthFixChart);
  };

  const onTopRevenue = (data) => {
    setDataTopRevenue(data.top_revenue);
  };

  const onTopEbt = (data) => {
    setDataTopEbt(data.top_ebt);
  };

  return {
    value: {
      columns,
      dataSource,
      dataMain,
      dataGrowth,
      dataTopRevenue,
      dataTopEbt,
      form,
    },
    func: {
      onFinish,
    },
  };
};

export default Logic;
