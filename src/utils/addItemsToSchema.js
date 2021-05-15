
const requiredData = {
  loads: [
    {
      type: 'broker',
      table: 'brokers',
      field: 'name',
      filterBy: '',
      alias: '',
      loadAll: true
    },
    {
      type: 'user',
      table: 'employees',
      field: 'lastname',
      filterBy: 'position',
      alias: 'dispatch',
      loadAll: false
    },
    {
      type: 'driver',
      table: 'employees',
      field: 'lastname',
      filterBy: 'position',
      alias: '',
      loadAll: false
    },
    {
      type: 'tractor',
      table: 'equipment',
      field: 'unit_num',
      filterBy: 'type',
      alias: '',
      loadAll: false
    },
    {
      type: 'trailer',
      table: 'equipment',
      field: 'unit_num',
      filterBy: 'type',
      alias: '',
      loadAll: false
    }
  ]
}

export const addItemsToSchema = (schemaPropType, reequiredData, tables) => {
  const { type, table, field, filterBy, alias, loadAll } = reequiredData;
  const dataType = alias || type
  const data = tables[table];

  data.map(item => {
    if(!schemaPropType.enum.includes(item.id)) {
      if((filterBy && dataType === item[filterBy]) || loadAll) {
        schemaPropType.enum.push(item.id);
        schemaPropType.enumNames.push(item[field])
      }
    }

    return schemaPropType
  });
  return schemaPropType
}


export const addValues = (schema, tables, tbl) => {
   const addedSchemaValues = !tables[tbl] ? schema : requiredData[tbl].map(rd => {
    return addItemsToSchema(schema.properties[rd.type], rd, tables);
  })
  return schema
}
