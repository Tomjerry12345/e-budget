import React from "react";
import { isAlphaNumericKey, keyCodes, getCellProperty } from "@silevis/reactgrid/dist";
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
    console.log(status);
    // this.props.changeCellTemplate({
    //   clickedActivated: true,
    //   status,
    // });
    onCellChanged(this.getCompatibleCell({ ...cell, text: "test" }), true);
  }

  render(cell, isInEditMode, onCellChanged) {
    const status = cell.text;
    return (
      <div>
        <Button
          // className="btn-tambah-row"
          type="link"
          onClick={(e) => this.onClicked(cell, onCellChanged, status)}
          // disabled={status === "active"}
        >
          {/* {status === "actived" ? "cancel retired" : "retired"} */}
          retired
        </Button>
        {/* <Button
          // className="btn-tambah-row"
          type="link"
          // onClick={(e) => this.onClicked(cell, onCellChanged)}
          // disabled={status === "active"}
        >
          update retired
        </Button> */}
      </div>
    );
  }
}

export { ButtonCellTemplate };
