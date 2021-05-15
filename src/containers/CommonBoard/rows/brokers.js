export const getBrokerRowData = (rows) => {
  return rows.map(row => {
    const newRow = {...row};
    newRow.quickPay = row.quickPay === "0" ? "No" : "Yes"
    return newRow;
  })
}
