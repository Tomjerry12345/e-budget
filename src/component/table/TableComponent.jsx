import TableInputType1 from "./input/type-1/TableInputType1";
import TableOutputType1 from "./output/type-1/TableOutputType1";

const TableComponent = ({ variant = "output", type = 1, dataSource = [], columns, loading }) => {
  let component;

  if (variant === "input") {
    if (type === 1) {
      component = <TableInputType1 dataSource={dataSource} columns={columns} loading={loading} />;
    }
  } else {
    if (type === 1) {
      component = <TableOutputType1 dataSource={dataSource} columns={columns} loading={loading} />;
    }
  }

  return component;
};

export default TableComponent;
