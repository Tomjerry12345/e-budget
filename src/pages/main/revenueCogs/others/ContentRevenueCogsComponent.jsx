const ContentRevenueCogsComponent = () => {
  return (
    <>
      <Card
        className="card-style"
        // style={{ marginBottom: 16, height: 120 }}
      >
        <Form
          className="form-filter"
          layout="vertical"
          ref={value.ref}
          onFinish={func.onFinish}
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
      {tTable.map((x) => (
        <div
          style={{
            margin: "16px",
          }}
        >
          <Typography.Text strong style={{ fontSize: "14px" }}>
            {x.title}
            {/* {value.params.item} */}
          </Typography.Text>

          <Table
            components={components}
            rowClassName={(record, index) =>
              areEqual(value.listKeyParent, record) ? "parent" : "child"
            }
            bordered
            dataSource={x.data}
            columns={value.tableColumn}
            pagination={false}
            loading={value.loading}
            size="small"
            scroll={{
              x: 2900,
              y: value.size.y,
            }}
          />
        </div>
      ))}
    </>
  );
};

export default ContentRevenueCogsComponent;
