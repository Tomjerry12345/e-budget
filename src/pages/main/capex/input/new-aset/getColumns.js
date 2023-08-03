export function getColumns() {
  return [
    {
      columnId: "description",
      width: 300,
      type: "text",
    },
    {
      columnId: "quantity",
      width: 200,
      type: "number",
      format: true,
    },
    {
      columnId: "price",
      width: 200,
      type: "number",
      format: true,
    },
    {
      columnId: "asset_category_id",
      width: 200,
      type: "dropdown",
    },
    {
      columnId: "purchase_month",
      width: 200,
      type: "dropdown",
    },
    {
      columnId: "purchase_year",
      width: 200,
      type: "dropdown",
    },
    {
      columnId: "depreciation_month",
      width: 200,
      type: "dropdown",
    },
    {
      columnId: "depreciation_year",
      width: 200,
      type: "dropdown",
    },
    {
      columnId: "asset_life",
      width: 200,
      type: "number",
      format: false,
    },
    {
      columnId: "salvage_value",
      width: 200,
      type: "number",
      format: false,
    },
    {
      columnId: "quantity",
      width: 200,
      type: "number",
      format: true,
    },
    {
      columnId: "depreciation_amount_monthly",
      width: 200,
      type: "dropdown",
    },
    {
      columnId: "depreciation_amount_yearly",
      width: 200,
      type: "dropdown",
    },
    {
      columnId: "asset_account",
      width: 200,
      type: "text",
    },
    {
      columnId: "accumulated_account",
      width: 200,
      type: "text",
    },
    {
      columnId: "depreciation_account",
      width: 200,
      type: "text",
    },
  ];
}
