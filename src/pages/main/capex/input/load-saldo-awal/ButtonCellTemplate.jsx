import React from "react";
import { isAlphaNumericKey, keyCodes, getCellProperty } from "@silevis/reactgrid";
import { Button } from "antd";
import { connect } from "react-redux";
import { changeCellTemplate } from "redux/action/cell.template.reducer";

class ButtonCellTemplate {
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, "text", "string");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value };
  }

  // handleKeyDown(cell, keyCode, ctrl, shift, alt) {
  //   if (!ctrl && !alt && isAlphaNumericKey(keyCode)) return { cell, enableEditMode: true };
  //   return {
  //     cell,
  //     enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
  //   };
  // }

  update(cell, cellToMerge) {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }

  onClicked(cell, onCellChanged, status) {
    onCellChanged(
      this.getCompatibleCell({
        ...cell,
        text: status,
      }),
      true
    );
  }

  render(cell, isInEditMode, onCellChanged) {
    const status = cell.text;
    return (
      <div>
        <Button type="link" onClick={(e) => this.onClicked(cell, onCellChanged, "retire")}>
          retire
        </Button>
        {status === "actived" ? (
          <Button type="link" onClick={(e) => this.onClicked(cell, onCellChanged, "retrive")}>
            retrive
          </Button>
        ) : null}
      </div>
    );
  }
}

export { ButtonCellTemplate };
