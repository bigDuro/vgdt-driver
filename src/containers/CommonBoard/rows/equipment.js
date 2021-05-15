export const getEquipmentRowData = (rows) => {
  return rows.map(row => {
    const newRow = {...row};
    newRow.description = `${row.year} ${row.make} ${row.model} | ${row.sub_type}`;
    return newRow;
  })
}
