import { Table, Spin } from "antd";

const TableOutputType1 = ({ dataSource, columns, loading, scroll }) => {
  return (
    <>
      {dataSource.length > 0 ? (
        <Table
          rowClassName="child"
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="small"
          // loading={value.loading}
          scroll={scroll}
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
