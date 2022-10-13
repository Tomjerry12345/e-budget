import { Form, Select, Button, Tabs } from "antd";
import { Card } from "@mui/material";

const ParentRevenueCogsComponent = ({ value, func, child }) => {
  return (
    <>
      <div
        className="custom-root-card"
        style={{
          padding: "0px",
          marginTop: "8px",
          marginBottom: "16px",
        }}
      >
        <Card className="card-style">
          <Form
            className="form-filter"
            layout="vertical"
            ref={value.ref}
            onFinish={func.onFinish}
            form={value.form}
          >
            <Form.Item
              label="Kode Perusahaan"
              name="code_company"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select onChange={func.onChange}>
                {value.allCodeFilter.code_company.map((val, i) => (
                  <Select.Option key={i} value={val.code}>
                    {`${val.code} (${val.title})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kode Produk"
              name="code_product"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {value.allCodeFilter.code_product.map((val, i) => (
                  <Select.Option key={i} value={val.code_product}>
                    {`${val.code_product} (${val.description})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kode Lokasi"
              name="code_location"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {value.allCodeFilter.code_location.map((val, i) => (
                  <Select.Option key={i} value={val.code_location}>
                    {`${val.code_location} (${val.description})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kode Dept"
              name="code_dept"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {value.allCodeFilter.code_dept.map((val, i) => (
                  <Select.Option key={i} value={val.code_dept}>
                    {`${val.code_dept} (${val.description})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button className="btn-tampilkan" htmlType="submit">
                Tampilkan
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* <div className="custom-root-layout"> */}
      <Tabs
        defaultActiveKey="1"
        type="card"
        // size={size}
        items={child}
      />
      {/* </div> */}
    </>
  );
};

export default ParentRevenueCogsComponent;
