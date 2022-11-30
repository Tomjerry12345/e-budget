import { useState } from "react";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import MainServices from "../../../../services/MainServices";

const LabaRugiLogic = () => {
  const [data, setData] = useState();
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("values", values);
    const { code_company, code_dept, code_location, code_product } = values;
    const { data } = await MainServices.get(`report/labarugi?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`);
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
