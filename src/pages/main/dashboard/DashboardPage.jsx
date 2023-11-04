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
import { UpSquareOutlined } from "@ant-design/icons";
import Logic from "./Logic";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const labels1 = ["January", "feb", "mar"];

const data1 = {
  labels1,
  datasets: [
    {
      data: labels1.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      data: labels1.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const DashboardPage = () => {
  const { value, func } = Logic();
  return (
    <>
      <Header />
      <FilterComponent
        // onFinish={func.onFinish}
        isCodeIcp
        isCodeProject
        type="input"
      />
      <div className="custom-root-layout">
        {/* <div className="root-dashboard"> */}
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={16}>
            <div
              style={{
                marginBottom: "16px",
              }}
            >
              <Typography.Text>DASHBOARD KALLA GROUP (DALAM JUTAAN)</Typography.Text>
              <Card className="card-section">
                <Bar options={options} data={data1} />
              </Card>
            </div>
            <div>
              <Typography.Text>GROWTH 2 TAHUN</Typography.Text>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col>
                  <Card className="card-section ">
                    <Bar
                      options={{ maintainAspectRatio: false }}
                      width="200px"
                      height="200px"
                      data={data1}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card className="card-section ">
                    <Bar
                      options={{ maintainAspectRatio: false }}
                      width="200px"
                      height="200px"
                      data={data1}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card className="card-section ">
                    <Bar
                      options={{ maintainAspectRatio: false }}
                      width="200px"
                      height="200px"
                      data={data1}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card className="card-section">
                    <Bar
                      options={{ maintainAspectRatio: false }}
                      width="200px"
                      height="200px"
                      data={data1}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <Card>
              <div style={{ marginBottom: "16px" }}>
                <UpSquareOutlined />
                <Typography.Text>TOP 4 COMPANY REVENUE</Typography.Text>
              </div>
              <Table dataSource={value.dataSource} columns={value.columns} pagination={false} />
            </Card>
            <Card className="card-section">
              <div style={{ marginBottom: "16px" }}>
                <UpSquareOutlined />
                <Typography.Text>TOP 4 COMPANY REVENUE</Typography.Text>
              </div>
              <Table dataSource={value.dataSource} columns={value.columns} pagination={false} />
            </Card>
          </Col>
        </Row>
        {/* </div> */}
      </div>
    </>
  );
};

export default DashboardPage;
