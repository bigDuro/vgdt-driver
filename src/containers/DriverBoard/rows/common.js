export const getRowData = (rows) => {
  return rows.map(row => {
    const newRow = {...row};
    return newRow;
  })
}
