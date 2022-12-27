import TableInputType1 from "./input/type-1/TableInputType1";
import TableInputTypePotongan from "./input/type-potongan/TableInputTypePotongan";
import TableOutputType1 from "./output/type-1/TableOutputType1";

/**
 *
 * @param {{
 * variant: "input" | "output";
 * }} props Props for the component
 *
 */

const TableComponent = ({ variant = "output", type = 1, dataSource = [], columns, loading, listKeyParent, scroll = null }) => {
  let component;

  if (variant === "input") {
    if (type === 1) {
      component = <TableInputType1 dataSource={dataSource} columns={columns} loading={loading} listKeyParent={listKeyParent} />;
    } else if (type === "potongan") {
      component = <TableInputTypePotongan dataSource={dataSource} columns={columns} loading={loading} listKeyParent={listKeyParent} />;
    }
  } else {
    if (type === 1) {
      component = <TableOutputType1 dataSource={dataSource} columns={columns} loading={loading} scroll={scroll} />;
    }
  }

  return component;
};

export default TableComponent;
