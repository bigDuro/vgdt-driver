import { getRowData } from './common';
import { getLoadRowData } from './loads';


export const getUpdatedRows = (table, tables) => {

  const rows = tables[table];
  const common = rows && rows.length ? getRowData(rows) : [];
  const types = {
    loads: () => getLoadRowData(rows, tables)
  }
  return types[table] ? types[table]() : common;
}
