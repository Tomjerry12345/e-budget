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
    },
  ];

  const [dataMain, setDataMain] = useState();
  const [dataGrowth, setDataGrowth] = useState([]);
  const [dataTopRevenue, setDataTopRevenue] = useState([]);
  const [dataTopEbt, setDataTopEbt] = useState([]);

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    const url = `dashboard`;
    try {
      const { data } = await MainServices.get(url);
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
        },
      ],
    };
    setDataMain(mainFixChart);
  };

  const onFormatGrowthChart = (data) => {
    const listGrowthFixChart = [];
    const growthChart = data.growth_chart;
    growthChart.forEach((e, i) => {
      const growthFixChart = {
        labels: e.labels,
        datasets: [
          {
            data: e.datasets.data,
            backgroundColor: e.labels.map((j, i) => {
              return i % 2 === 0 ? e.datasets.background1 : e.datasets.background2;
            }),
          },
        ],
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
    },
    func: {},
  };
};

export default Logic;
