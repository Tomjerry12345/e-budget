import React from "react";
import {
  CellTemplate,
  isAlphaNumericKey,
  isNavigationKey,
  keyCodes,
  getCellProperty,
} from "@silevis/reactgrid";
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
    // if (!isInEditMode) {
    //   const flagISO = cell.text.toLowerCase(); // ISO 3166-1, 2/3 letters
    //   const flagURL = `https://flagcdn.com/${flagISO}.svg`;
    //   const alternativeURL = `https://upload.wikimedia.org/wikipedia/commons/0/04/Nuvola_unknown_flag.svg`;
    //   return <Button className="btn-tambah-row">d["status"]</Button>;
    // }
    // return (
    //   <input
    //     ref={(input) => input?.focus()}
    //     defaultValue={cell.text}
    //     onChange={(e) =>
    //       onCellChanged(this.getCompatibleCell({ ...cell, text: e.currentTarget.value }), false)
    //     }
    //     onCopy={(e) => e.stopPropagation()}
    //     onCut={(e) => e.stopPropagation()}
    //     onPaste={(e) => e.stopPropagation()}
    //     onPointerDown={(e) => e.stopPropagation()}
    //     onKeyDown={(e) => {
    //       if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode)) e.stopPropagation();
    //     }}
    //   />
    // );
    return (
      <Button className="btn-tambah-row" onClick={(e) => this.onClicked(cell, onCellChanged)}>
        {status}
      </Button>
    );
  }
}

export { ButtonCellTemplate };
