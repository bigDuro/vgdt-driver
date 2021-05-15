import { getRowData } from './common';
import { getBrokerRowData } from './brokers';
import { getLoadRowData } from './loads';
import { getDriverRowData } from './driver';
import { getDispatchRowData } from './dispatch';
import { getInvoiceRowData } from './invoices';
import { getEquipmentRowData } from './equipment';


export const getUpdatedRows = (table, tables) => {
  const rows = tables[table];
  const common = rows && rows.length ? getRowData(rows) : [];
  const types = {
    brokers: () => getBrokerRowData(rows, tables),
    loads: () => getLoadRowData(rows, tables),
    driver: () => getDriverRowData(rows, tables),
    dispatch: () => getDispatchRowData(rows, tables),
    invoices: () => getInvoiceRowData(rows, tables),
    tractor: () => getEquipmentRowData(rows, tables),
    trailer: () => getEquipmentRowData(rows, tables),
    equipment: () => getEquipmentRowData(rows, tables),
    employees: () => getDriverRowData(rows, tables)
  }
  return types[table] ? types[table]() : common;
}
