import React from "react";
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
import { getCellProperty } from "@silevis/reactgrid";

class ActionCellTemplate {
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, "text", "string");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value };
  }

  update(cell, cellToMerge) {
    return this.getCompatibleCell({ ...cell, text: 'test' });
  }

  onClicked(cell, onCellChanged, status) {
    onCellChanged(
      this.getCompatibleCell({
        ...cell,
        text: 'test'
      }),
      true
    );
  }

  render(cell, isInEditMode, onCellChanged){
    return (
      <div>
        <Button className="btn-delete-row" size="small" icon={<DeleteOutlined />} onClick={(e) => this.onClicked(cell, onCellChanged)}/>
      </div>
    )
  }
}

export { ActionCellTemplate }