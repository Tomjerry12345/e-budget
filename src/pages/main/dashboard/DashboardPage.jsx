import Header from "./header/HeaderComponent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, Col, Row, Table, Typography } from "antd";
import FilterComponent from "component/filter/FilterComponent";
import ChartDataLabels from "chartjs-plugin-datalabels";

import "./style-dashboard.scss";
import Logic from "./Logic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DashboardPage = () => {
  const { value, func } = Logic();
  return (
    <>
      <Header />
      <FilterComponent
        onFinish={func.onFinish}
        isCompanyAll
        form={value.form}
        isCodeIcp
        isCodeProject
        isType
        type="summary"
      />
      <div className="custom-root-layout root-dashboard">
        {/* <div className="root-dashboard"> */}

        {value.dataMain !== undefined ? (
          <Row
            gutter={24}
          >
            <Col span={16}>
              <div className="mb-16">
                <Typography.Title className="title">
                  DASHBOARD KALLA GROUP (DALAM JUTAAN)
                </Typography.Title>
                <Card className="card-section-bar-dashboard">
                  {value.dataMain !== undefined ? (
                    <Bar
                      className="bar-dashboard"
                      options={{
                        responsive: true,
                        scales: {
                          // to remove the labels
                          x: {
                            // ticks: {
                            //   display: false,
                            // },

                            // to remove the x-axis grid
                            grid: {
                              drawBorder: false,
                              display: false,
                            },
                          },
                          // to remove the y-axis labels
                          y: {
                            ticks: {
                              display: false,
                              beginAtZero: true,
                            },
                            // to remove the y-axis grid
                            // grid: {
                            //   drawBorder: false,
                            //   display: false,
                            // },
                          },
                        },
                        plugins: {
                          legend: {
                            display: false,
                          },
                          datalabels: {
                            display: true,
                            color: "black",
                            anchor: "end",
                            align: "top",
                            formatter: (value) => value,
                          },
                        },
                      }}
                      data={value.dataMain}
                    />
                  ) : null}
                </Card>
              </div>
              <div className="mb-16">
                <Typography.Title className="title">GROWTH 2 TAHUN</Typography.Title>
                <Row
                  gutter={[8,8]}
                >
                  {value.dataGrowth.map((e, i) => (
                    <Col key={i} span={6}>
                      <Card className="card-section">
                        <div className="section-header-growth">
                          <Typography.Text
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              lineHeight: "18.86px",
                            }}
                          >
                            {e.title}
                          </Typography.Text>
                          <div>
                            <img
                              src={
                                e.growth >= 10
                                  ? "icon/ic_growth_success.svg"
                                  : "icon/ic_growth_error.svg"
                              }
                              alt="ic_growt_status"
                            />
                            <Typography.Text
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                lineHeight: "18.86px",
                                color:
                                  e.growth >= 10
                                    ? "rgba(0, 157, 80, 1)"
                                    : "rgba(255, 76, 0, 1)",
                              }}
                            >
                              {e.growth}%
                            </Typography.Text>
                          </div>
                        </div>

                        <Bar
                          style={{
                            marginTop: "16px",
                          }}
                          className="bar-growth"
                          options={{
                            scales: {
                              x: {
                                grid: {
                                  drawBorder: false,
                                  display: false,
                                },
                              },
                              y: {
                                max: e.maxValue,
                                ticks: {
                                  display: false,
                                  beginAtZero: true,
                                },

                                grid: {
                                  drawBorder: false,
                                  display: false,
                                },
                              },
                            },
                            plugins: {
                              legend: {
                                display: false,
                              },
                              datalabels: {
                                display: true,
                                color: "black",
                                anchor: "end",
                                align: "top",
                                formatter: (value) => value,
                              },
                            },
                          }}
                          data={e.data}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col span={8}>
              <Card className="card-section-col-2">
                <div className="mb-16">
                  <img className="icon-root" src="icon/ic_revenue.svg" alt="ic_revenue" />
                  <Typography.Text className="title-incard">TOP 4 COMPANY REVENUE</Typography.Text>
                </div>
                <Table
                  size="small"
                  dataSource={value.dataTopRevenue}
                  columns={value.columns}
                  pagination={false}
                />
              </Card>
              <Card className="mt-16 card-section-col-2">
                <div className="mb-16">
                  <img className="icon-root" src="icon/ic_ebt.svg" alt="ic_ebt" />
                  <Typography.Text className="title-incard">TOP 4 COMPANY REVENUE</Typography.Text>
                </div>
                <Table
                  size="small"
                  dataSource={value.dataTopEbt}
                  columns={value.columns}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        ) : null}

        {/* </div> */}
      </div>
    </>
  );
};

export default DashboardPage;
