export const getDispatchRowData = (rows) => {
  return rows.map(row => {
    const newRow = {...row};
    newRow.name = `${row.firstname} ${row.lastname}`;
    return newRow;
  })
}
