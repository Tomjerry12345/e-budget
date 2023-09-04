import React from "react";
import {
  isAlphaNumericKey,
  isNavigationKey,
  keyCodes,
  getCellProperty,
} from "@silevis/reactgrid";
import { logS } from "values/Utilitas";
import { Typography } from "antd";

class InputPercentTemplate {
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

  render(cell, isInEditMode, onCellChanged) {
    if (!isInEditMode) {
      return <Typography.Text>{cell.text} %</Typography.Text>;
    }
    return (
      <input
        ref={(input) => {
          input && input.focus();
        }}
        defaultValue={cell.text}
        onChange={(e) =>
          onCellChanged(this.getCompatibleCell({ ...cell, text: e.currentTarget.value }), false)
        }
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode)) e.stopPropagation();
        }}
      />
    );
  }
}

export { InputPercentTemplate };
