export const emptyTextCell = { type: "text", text: "" };

const numberFormat = new Intl.NumberFormat("de", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const customCell = ({ text, type, className, style }) => ({
  type,
  text,
  className,
  style,
  // renderer: (text) => widget,
});

export const textCell = (text, className = "", style) => ({
  type: "text",
  text,
  className,
  style,
});

export const headerCell = ({ text, className = "", style, colspan, rowspan }) => ({
  type: "header",
  text,
  className,
  style,
  colspan,
  rowspan,
});

export const chevronCell = (text, hasChildren, parentId, className = "", style) => ({
  type: "chevron",
  text,
  isExpanded: false,
  hasChildren,
  parentId,
  className,
  style,
});

export const numberCell = (value, className = "", style, isFormat = true) => ({
  type: "number",
  value,
  className,
  style,
  format: isFormat ? numberFormat : null,
});

export const dropDownCell = (value, selectedValue, className = "", style, isOpen) => ({
  type: "dropdown",
  values: value,
  inputValue: `${selectedValue}`,
  selectedValue: `${selectedValue}`,
  // className,
  // style,
  isOpen,
});

export const nonEditable = (cell) => ({
  ...cell,
  nonEditable: true,
});

export const showZero = (cell) => ({
  ...cell,
  nanToZero: true,
  hideZero: false,
});

export const bottomLine = (cell) => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      bottom: {
        width: "1px",
        color: "#A6A6A6",
        style: "solid",
      },
    },
  },
});

export const noSideBorders = (cell) => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      left: {
        style: "none",
      },
      right: {
        style: "none",
      },
    },
  },
});

export function rootHeaderCell(
  title,
  additionalClassNames = "",
  background = "#107C41",
  color = "white"
) {
  return nonEditable(
    textCell(title, `font-bold ${additionalClassNames}`, {
      background: background,
      color: color,
      border: {
        bottom: { style: "none" },
        left: { style: "none" },
        right: { style: "none" },
      },
    })
  );
}

export function totalCell(
  title,
  additionalClassNames = "",
  background = "#107C41",
  color = "black",
  isFormat = true,
  style
) {
  return nonEditable(
    typeof title === "number"
      ? numberCell(
          title,
          `font-bold ${additionalClassNames}`,
          {
            background: background,
            color: color,
            ...style,
          },
          isFormat
        )
      : textCell(title, `font-bold ${additionalClassNames}`, {
          background: background,
          color: color,
          ...style,
        })
  );
}

export function monthHeaderCell(
  month,
  additionalClassNames = "",
  background = "#FFFFFF",
  color = "#003421"
) {
  return nonEditable(
    textCell(month, `font-bold ${additionalClassNames}`, {
      background: background,
      color: color,
      border: {
        bottom: { style: "none" },
        left: { style: "none" },
        right: { style: "none" },
      },
    })
  );
}

export const dropDownCustomCell = (selectedValue, values, isOpen) => ({
  type: "dropdown",
  selectedValue: `${selectedValue}`,
  values,
  isOpen,
});
