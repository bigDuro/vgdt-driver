import { getCommonActions } from './common';

export const getActions = (table, history, context) => {
  const common = getCommonActions(table, history, context);

  const types = {}
  return types[table] ? {...common, ...types[table]} : common;
}
