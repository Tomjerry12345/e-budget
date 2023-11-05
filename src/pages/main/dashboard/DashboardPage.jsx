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
import { faker } from "@faker-js/faker";
import { Card, Col, Row, Table, Typography } from "antd";
import FilterComponent from "component/filter/FilterComponent";

import "./style-dashboard.scss";
import Logic from "./Logic";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const DashboardPage = () => {
  const { value, func } = Logic();
  return (
    <>
      <Header />
      <FilterComponent
        // onFinish={func.onFinish}
        form={value.form}
        isCodeIcp
        isCodeProject
        isType
        type="summary"
      />
      <div className="custom-root-layout root-dashboard">
        {/* <div className="root-dashboard"> */}

        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={17}>
            <div
              style={{
                marginBottom: "16px",
              }}
            >
              <Typography.Text>DASHBOARD KALLA GROUP (DALAM JUTAAN)</Typography.Text>
              <Card className="card-section">
                {value.dataMain !== undefined ? (
                  <Bar className="bar-dashboard" options={options} data={value.dataMain} />
                ) : null}
              </Card>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <Typography.Text>GROWTH 2 TAHUN</Typography.Text>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                {value.dataGrowth.map((e, i) => (
                  <Col key={i}>
                    <Card className="card-section">
                      <Bar
                        className="bar-growth"
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                        data={e}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={7}>
            <Card>
              <div style={{ marginBottom: "16px" }}>
                <img className="icon-root" src="icon/ic_revenue.svg" alt="ic_revenue" />
                <Typography.Text>TOP 4 COMPANY REVENUE</Typography.Text>
              </div>
              <Table
                dataSource={value.dataTopRevenue}
                columns={value.columns}
                pagination={false}
              />
            </Card>
            <Card className="card-section">
              <div style={{ marginBottom: "16px" }}>
                <img className="icon-root" src="icon/ic_ebt.svg" alt="ic_ebt" />
                <Typography.Text>TOP 4 COMPANY REVENUE</Typography.Text>
              </div>
              <Table dataSource={value.dataTopEbt} columns={value.columns} pagination={false} />
            </Card>
          </Col>
        </Row>

        {/* </div> */}
      </div>
    </>
  );
};

export default DashboardPage;
