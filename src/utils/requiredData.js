export const requiredData = {
  loads: [
    {
      type: 'broker',
      table: 'brokers',
      field: 'name'
    },
    {
      type: 'user',
      table: 'employees',
      field: 'lastname'
    },
    {
      type: 'driver',
      table: 'employees',
      field: 'lastname'
    },
    {
      type: 'tractor',
      table: 'equipment',
      field: 'unit_num'
    },
    {
      type: 'trailer',
      table: 'equipment',
      field: 'unit_num'
    }
  ]
}
