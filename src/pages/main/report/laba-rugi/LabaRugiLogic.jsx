import { useState } from "react";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import MainServices from "../../../../services/MainServices";
import { log } from "../../../../values/Utilitas";

const LabaRugiLogic = () => {
  const [data, setData] = useState();
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);

  const type = 2;

  const onFinish = async (values) => {
    setLoading(true);
    console.log("values", values);

    const { code_company, code_dept, code_location, code_product } = values;

    let url;

    if (type === 1) {
      url = `report/labarugi?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`;
    } else if (type === 2) {
      let fCodeCompany = code_company.replace(/[^0-9]/g, "");
      let fCodeProduct = code_product.replace(/[^0-9]/g, "");
      let fCodeLocation = code_location.replace(/[^0-9]/g, "");
      let fCodeDept = code_dept.replace(/[^0-9]/g, "");

      // console.log("fCodeCompany", fCodeCompany);
      // console.log("fCodeProduct", fCodeProduct);
      // console.log("fCodeLocation", fCodeLocation);
      // console.log("fCodeDept", fCodeDept);

      url = `report/labarugi?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}`;
    }

    log("url", url);

    const { data } = await MainServices.get(url);
    console.log("res", data);
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

  return {
    value: {
      data,
      columns,
      loading,
    },
    func: {
      onFinish,
    },
  };
};

export default LabaRugiLogic;
