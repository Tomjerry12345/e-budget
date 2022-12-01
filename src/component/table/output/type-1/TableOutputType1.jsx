import { Table, Spin } from "antd";

const TableOutputType1 = ({ dataSource, columns, loading }) => {
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
          //   loading={value.loading}
          //   scroll={{
          //     y: value.size.y - 313,
          //   }}
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
