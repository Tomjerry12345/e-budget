import React from "react";
import { getCellProperty } from "@silevis/reactgrid";
import { Button } from "antd";

class ButtonCellTemplate {
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, "text", "string");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value };
  }

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
          Retire
        </Button>
        {status !== "actived" ? (
          <Button
            style={{
              color: "red",
            }}
            type="link"
            onClick={(e) => this.onClicked(cell, onCellChanged, "reinstate")}
          >
            Reinstate
          </Button>
        ) : null}
      </div>
    );
  }
}

export { ButtonCellTemplate };
