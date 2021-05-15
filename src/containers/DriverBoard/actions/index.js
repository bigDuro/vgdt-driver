import { getCommonActions } from './common';

export const getActions = (history, driver) => {
  const common = getCommonActions(history, driver);

  return common;
}
