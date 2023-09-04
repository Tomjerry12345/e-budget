import { Button, Form, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { log } from "values/Utilitas";
import { useEffect, useState } from "react";
import MainServices from "services/MainServices";

const { Title } = Typography;

const FormItem = ({ label, name, children }) => (
  <Form.Item
    label={label}
    name={name}
    // rules={[
    //   {
    //     required: true,
    //     message: `${name} tidak boleh kosong!`,
    //   },
    // ]}
  >
    {children}
  </Form.Item>
);

const ModalExportSummaryDirectAll = ({
  open,
  onCancel,
  value,
  onOk,
  file,
  loading,
  title,
  type = false,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dataGlobalRedux = useSelector((state) => state.data);

  const [dataPeriode, setDataPeriode] = useState(null);
  // const [disable, setDisable] = useState(true);

  const date = new Date();

  const periode = [
    {
      label: `${date.getFullYear() - 2} - ${date.getFullYear() - 1}`,
      value: `${date.getFullYear() - 1}`,
    },
    {
      label: `${date.getFullYear() - 1} - ${date.getFullYear()}`,
      value: `${date.getFullYear()}`,
    },
    {
      label: `${date.getFullYear()} - ${date.getFullYear() + 1}`,
      value: `${date.getFullYear() + 1}`,
    },
    {
      label: `${date.getFullYear() + 1} - ${date.getFullYear() + 2}`,
      value: `${date.getFullYear() + 2}`,
    },
  ];

  const [listCompany, setListCompany] = useState([]);

  useEffect(() => {
    getListCompany();
  }, []);

  const getListCompany = async () => {
    const { data } = await MainServices.get("company/list-child");

    if (data.responseCode === 200) {
      setListCompany(data.data);
    }
  };

  const onExport = async (values) => {
    log({ values });
    const filename = "data-to-oracle";
    const url = `directall/export-to-oracle`;
    // const url = `directall/export-to-oracle?year=${dataPeriode}&filename=${filename}`;

    const params = {
      ...values,
      filename,
    };
    const res = await MainServices.download(url, params);
    log({ res });
    const fileURL = URL.createObjectURL(res.data);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `summary_${filename}`;
    link.click();
    onCancel();
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <Title level={4}>{title}</Title>
      <Form onFinish={onExport} layout="vertical" form={form}>
        <div className="root-content-upload">
          <div className="layout-upload-file">
            <FormItem label="Periode" name="year" children={<Select options={periode} />} />
            <FormItem
              label="Kode perusahaan"
              name="code_company"
              children={
                <Select
                  onChange={(e) => {
                    form.setFieldsValue({ code_company: e });
                  }}
                  options={listCompany.map((e) => ({
                    value: e.code,
                    label: e.description,
                  }))}
                />
              }
            />
          </div>
          <Form.Item className="footer-custom">
            <Button className="btn-cancel" type="text" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              className="btn-upload"
              type="primary"
              htmlType="submit"
              // loading={loading}
            >
              Export data
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalExportSummaryDirectAll;
