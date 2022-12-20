import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import MainServices from "../../../../services/MainServices";
import { log } from "../../../../values/Utilitas";

const LabaRugiLogic = () => {
  const [data, setData] = useState();
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  let params = useParams();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const onFinish = async (values) => {
    setLoading(true);

    const { code_company, code_dept, code_location, code_product } = values;

    let url;

    let fCodeCompany = code_company.replace(/[^0-9]/g, "");
    let fCodeProduct = code_product.replace(/[^0-9]/g, "");
    let fCodeLocation = code_location.replace(/[^0-9]/g, "");
    let fCodeDept = code_dept.replace(/[^0-9]/g, "");

    // console.log("fCodeCompany", fCodeCompany);
    // console.log("fCodeProduct", fCodeProduct);
    // console.log("fCodeLocation", fCodeLocation);
    // console.log("fCodeDept", fCodeDept);

    url = `report/labarugi?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}`;

    const { data } = await MainServices.get(url);
    log("res", data);
    getData(data.data);
  };

  const getData = (data) => {
    let list = [];
    let year_1 = "";
    let year_2 = "";

    data?.list?.forEach((val) => {
      year_1 = val.detail[0].year;
      year_2 = val.detail[1].year;
      const v1 = parseInt(val.detail[0].value).format(0, 3, ".", ",");
      const v2 = parseInt(val.detail[1].value).format(0, 3, ".", ",");
      list.push({
        account: val.code,
        description: val.description,
        value_1: v1,
        value_2: v2,
      });
    });
    setData(list);
    setColumns(columnOutputType1(year_1, year_2));
    setLoading(false);
  };

  const onOpenUploadModal = () => {
    setOpenUploadModal(true);
  };

  const onCloseUploadModal = () => {
    setOpenUploadModal(false);
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    let file1;
    acceptedFiles.forEach((file) => {
      file1 = file;
    });
    let formData = new FormData();
    formData.append("file", file1);

    const url = "report/tablereport?code_company=200&code_location=110116&code_dept=109&code_product=107";

    const { data } = await MainServices.post(``, formData);
  };

  return {
    value: {
      data,
      columns,
      loading,
      params,
      openUploadModal,
      getRootProps,
      getInputProps,
      acceptedFiles,
    },
    func: {
      onFinish,
      onOpenUploadModal,
      onCloseUploadModal,
      onUploadFile,
    },
  };
};

export default LabaRugiLogic;
