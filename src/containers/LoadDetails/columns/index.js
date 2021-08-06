import { loads } from './loads';


export const getColumnType = (type) => {
  const types = {
    loads
  }
  return types[type] || [];
}
