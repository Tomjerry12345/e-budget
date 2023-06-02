export const emptyTextCell = { type: "text", text: "" };

const numberFormat = new Intl.NumberFormat("de", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const textCell = (text, className = "", style) => ({
  type: "text",
  text,
  className,
  style,
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
    textCell(title, `text-lg font-bold ${additionalClassNames}`, {
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
  isFormat = true
) {
  return nonEditable(
    numberCell(
      title,
      `text-lg font-bold ${additionalClassNames}`,
      {
        background: background,
        color: color,
        border: {
          bottom: { style: "none" },
          left: { style: "none" },
          right: { style: "none" },
        },
      },
      isFormat
    )
  );
}

export function monthHeaderCell(
  month,
  additionalClassNames = "",
  background = "#FFFFFF",
  color = "#003421"
) {
  return nonEditable(
    textCell(month, `text-lg font-bold ${additionalClassNames}`, {
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
