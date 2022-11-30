import FilterComponent from "../../../../component/filter/FilterComponent";
import TableComponent from "../../../../component/table/TableComponent";
import LabaRugiLogic from "./LabaRugiLogic";

const LabaRugiPage = () => {
  const { value, func } = LabaRugiLogic();
  return (
    <>
      <FilterComponent isCodeProduct={true} onFinish={func.onFinish} />

      <div className="custom-root-layout">
        <TableComponent dataSource={value.data} columns={value.columns} loading={value.loading} />
      </div>
    </>
  );
};

export default LabaRugiPage;
