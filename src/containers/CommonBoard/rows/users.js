export const getUserRowData = (rows) => {
  return rows.map(row => {
    const newRow = {...row};
    // newRow.edit = editButton(row.id, actions);
    return newRow;
  })
}
