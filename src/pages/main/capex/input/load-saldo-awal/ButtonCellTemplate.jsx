import React from "react";
import { isAlphaNumericKey, keyCodes, getCellProperty } from "@silevis/reactgrid";
import { Button } from "antd";

class ButtonCellTemplate {
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, "text", "string");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value };
  }

  handleKeyDown(cell, keyCode, ctrl, shift, alt) {
    if (!ctrl && !alt && isAlphaNumericKey(keyCode)) return { cell, enableEditMode: true };
    return {
      cell,
      enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  update(cell, cellToMerge) {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }

  onClicked(cell, onCellChanged) {
    onCellChanged(this.getCompatibleCell({ ...cell, text: "test" }), true);
  }

  render(cell, isInEditMode, onCellChanged) {
    const status = cell.text;
    return (
      <Button
        className="btn-tambah-row"
        onClick={(e) => this.onClicked(cell, onCellChanged)}
        disabled={status === "active"}
      >
        {status === "active" ? "retired" : "active"}
      </Button>
    );
  }
}

export { ButtonCellTemplate };
