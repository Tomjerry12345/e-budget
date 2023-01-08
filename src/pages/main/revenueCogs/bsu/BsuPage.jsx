import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Tabs } from "antd";
import HeaderComponent from "../../../../component/header/HeaderComponent";

const BsuPage = () => {
  const [key, setKey] = useState(1);

  // alert(location.pathname);

  const navigate = useNavigate();

  const tabItemParent = [
    {
      key: 1,
      label: "Input Penjualan dan Potongan penjualan",
      // children: ,
    },
    {
      key: 2,
      label: "Input HPP dan pendapatan lainnya",
      // children: <Outlet />,
    },
  ];

  return (
    <>
      <HeaderComponent
        type="revenue-perusahaan"
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          // set(value.filter);
        }}
        // onChangeLoadingUpload={(set, setImport) => {
        //   set(value.loadingUpload);

        //   if (value.uploadSucces === true) {
        //     setImport(false);
        //   }
        // }}
        // onUploadFile={func.onUploadFile}
        // accesFile={value}
        // downloadFile="file/capex.xlsx"
        // disabledImportExport={value.dataColumnInput.length <= 1}
        // onChangeSelect={func.onChangeTahun}
      />

      <div className="custom-root-layout">
        <Tabs
          className="custom-tabs"
          // defaultActiveKey="1"
          activeKey={key}
          type="card"
          // size={size}
          items={tabItemParent}
          onChange={(key) => {
            setKey(key);
            if (key === 1) {
              navigate(`/main/revenue-cogs/bsu/penjualan`);
            } else {
              navigate(`/main/revenue-cogs/bsu/hpplain`);
            }
          }}
        />
        <Outlet />
      </div>
    </>
  );
};

export default BsuPage;
