import { Table, Spin } from "antd";
import { useEffect, useState } from "react";
import { getSizeScreen } from "../../../../values/Utilitas";

const TableOutputType1 = ({ dataSource, columns, loading, scroll }) => {
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {dataSource.length > 1 ? (
        <Table
          rowClassName="child"
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="small"
          // loading={value.loading}
          scroll={scroll === null ? { y: size.y - 366 } : scroll}
          rowKey="id"
        />
      ) : loading === true ? (
        <div className="style-progress">
          <Spin />
        </div>
      ) : null}
    </>
  );
};

export default TableOutputType1;
