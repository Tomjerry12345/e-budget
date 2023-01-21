import TableInputType1 from "./input/type-1/TableInputType1";
import TableInputTypeCoa from "./input/type-coa/TableInputTypeCoa";
import TableInputCoa from "./input/type-coa/TableInputTypeCoa";
import TableInputTypePotongan from "./input/type-potongan/TableInputTypePotongan";
import TableOutputType1 from "./output/type-1/TableOutputType1";

/**
 *
 * @param {{
 * variant: "input" | "output";
 * type: "default" | "potongan" | "coa";
 * }} props Props for the component
 *
 */

const TableComponent = ({
  variant = "output",
  type = "default",
  dataSource = [],
  columns,
  loading,
  listKeyParent,
  scroll = null,
  form,
}) => {
  let component;

  if (variant === "input") {
    if (type === "default") {
      component = (
        <TableInputType1
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          listKeyParent={listKeyParent}
        />
      );
    } else if (type === "potongan") {
      component = (
        <TableInputTypePotongan
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          listKeyParent={listKeyParent}
        />
      );
    } else if (type === "coa") {
      component = (
        <TableInputTypeCoa
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          scroll={scroll}
          form={form}
        />
      );
    }
  } else {
    if (type === "default") {
      component = (
        <TableOutputType1
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          scroll={scroll}
        />
      );
    }
  }

  return component;
};

export default TableComponent;
