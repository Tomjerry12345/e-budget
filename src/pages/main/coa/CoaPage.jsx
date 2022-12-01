import { Table, Form, Input, Button, Modal, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CoaInputLogic from "./CoaLogic";
import "./CoaStyle.scss";
import UploadModal from "../../../component/modal/UploadModal";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { classx, fastIf, log } from "../../../values/Utilitas";
// import ResizeObserver from "rc-resize-observer";
// import { VariableSizeGrid as Grid } from "react-window";
// import classNames from "classnames";

const EditableContext = createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const setXColumn = (params) => {
  return params === "Kode perusahaan" || params === "Kode departemen" || params === "Kode akun" || params === "Kode ICP" ? null : 1600;
};

const CustomFooter = ({ onOk, onCancel }) => (
  <>
    <Button onClick={onCancel}>Batal</Button>
    <Button onClick={onOk}>Hapus</Button>
  </>
);

// const VirtualTable = (props) => {
//   const { columns, scroll } = props;
//   const [tableWidth, setTableWidth] = useState(0);
//   const widthColumnCount = columns.filter(({ width }) => !width).length;
//   const mergedColumns = columns.map((column) => {
//     if (column.width) {
//       return column;
//     }

//     return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
//   });
//   const gridRef = useRef();
//   const [connectObject] = useState(() => {
//     const obj = {};
//     Object.defineProperty(obj, "scrollLeft", {
//       get: () => {
//         if (gridRef.current) {
//           return gridRef.current?.state?.scrollLeft;
//         }

//         return null;
//       },
//       set: (scrollLeft) => {
//         if (gridRef.current) {
//           gridRef.current.scrollTo({
//             scrollLeft,
//           });
//         }
//       },
//     });
//     return obj;
//   });

//   const resetVirtualGrid = () => {
//     gridRef.current?.resetAfterIndices({
//       columnIndex: 0,
//       shouldForceUpdate: true,
//     });
//   };

//   useEffect(() => resetVirtualGrid, [tableWidth]);

//   const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
//     ref.current = connectObject;
//     const totalHeight = rawData.length * 54;
//     return (
//       <Grid
//         ref={gridRef}
//         className="virtual-grid"
//         style={{ margin: 20 }}
//         columnCount={mergedColumns.length}
//         columnWidth={(index) => {
//           const { width } = mergedColumns[index];
//           return totalHeight > scroll.y && index === mergedColumns.length - 1
//             ? width - scrollbarSize - 1
//             : width;
//         }}
//         height={scroll.y}
//         rowCount={rawData.length}
//         rowHeight={() => 54}
//         width={tableWidth}
//         onScroll={({ scrollLeft }) => {
//           onScroll({
//             scrollLeft,
//           });
//         }}
//       >
//         {({ columnIndex, rowIndex, style }) => (
//           <div
//             className={classNames("virtual-table-cell", {
//               "virtual-table-cell-last":
//                 columnIndex === mergedColumns.length - 1,
//             })}
//             style={style}
//           >
//             {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
//           </div>
//         )}
//       </Grid>
//     );
//   };

//   return (
//     <ResizeObserver
//       onResize={({ width }) => {
//         setTableWidth(width);
//       }}
//     >
//       <Table
//         {...props}
//         className="virtual-table"
//         columns={mergedColumns}
//         pagination={false}
//         components={{
//           body: renderVirtualList,
//         }}
//       />
//     </ResizeObserver>
//   );
// }; // Usage

// const columns = [
//   {
//     title: "A",
//     dataIndex: "key",
//     width: 150,
//   },
//   {
//     title: "B",
//     dataIndex: "key",
//   },
//   {
//     title: "C",
//     dataIndex: "key",
//   },
//   {
//     title: "D",
//     dataIndex: "key",
//   },
//   {
//     title: "E",
//     dataIndex: "key",
//     width: 200,
//   },
//   {
//     title: "F",
//     dataIndex: "key",
//     width: 100,
//   },
// ];
// const data = Array.from(
//   {
//     length: 100000,
//   },
//   (_, key) => ({
//     key,
//   })
// );

const CoaPage = () => {
  const { value, func } = CoaInputLogic();

  const status = value.openAction.status;

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const customClass = classx({
    "custom-action-modal": status === "edit" ? (setXColumn(value.params.item) === null ? false : true) : false,
  });

  return (
    <div className="custom-root-layout">
      <div className="top-content">
        <Form className="form-cari" layout="vertical">
          <Form.Item>
            <Input placeholder="Cari data di sini..." />
          </Form.Item>
          <Button className="btn-cari" type="primary">
            Cari
          </Button>
        </Form>

        <div className="layout-btn-action">
          <Button className="btn-clear" type="ghost" disabled>
            Clear Data
          </Button>

          <Button className="btn-update" type="primary" icon={<UploadOutlined className="custom-icon" />} onClick={func.onOpenUploadModal}>
            Update
          </Button>
        </div>
      </div>

      <Table
        className="table-custom-root"
        components={components}
        bordered
        dataSource={value.dataColumn}
        columns={value.tableColumn}
        pagination={false}
        loading={value.loading}
        size="small"
        rowClassName="child"
        scroll={{
          x: setXColumn(value.params.item),
          y: value.size.y - 246,
        }}
        rowKey="id"
      />

      {/* <VirtualTable
        columns={value.tableColumn}
        dataSource={value.dataColumn}
        scroll={{
          // y: 300,
          y: value.size.y - 200,
          // x: "100vw",
          x: setXColumn(value.params.item),
        }}
      /> */}

      {/* </Content> */}

      <UploadModal open={value.openUploadModal} onCancel={func.onCloseUploadModal} value={value} onOk={func.onUploadFile} />

      <Modal className={customClass} open={value.openAction.open} onCancel={func.onCancel} closable={true} title="Ubah Data" footer={status === "edit" ? null : <CustomFooter onOk={func.onDelete} onCancel={func.onCancel} />}>
        <Form layout="vertical" ref={value.ref} onFinish={func.onEdit}>
          {value.openAction.status === "edit" ? (
            <>
              {value.req.map((val, i) => (
                <Form.Item key={i} name={val.key} rules={[{ required: true, message: "Tidak Boleh Kosong" }]}>
                  <Input placeholder={val.placeholder} />
                </Form.Item>
              ))}

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Button
                    onClick={func.onCancel}
                    style={{
                      marginRight: "16px",
                    }}
                  >
                    Batal
                  </Button>
                  <Button htmlType="submit">Ubah</Button>
                </div>
              </Form.Item>
            </>
          ) : (
            <Typography.Text>Apakah Anda ingin menghapus item ?</Typography.Text>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CoaPage;
