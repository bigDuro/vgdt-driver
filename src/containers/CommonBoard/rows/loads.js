export const getLoadRowData = (rows, tables) => {

  return rows.map(row => {
    const newRow = {...row};

    if(tables.brokers && tables.brokers.length) {
      tables.brokers.map(broker => {
        if (broker.id === row.broker) {
          newRow.brokerName = broker.name;
          newRow.hasQuickPay = broker.quickPay !== "0" && broker.quickPay > 0;
          newRow.paymentTerms = broker.paymentTerms;

        }
        return broker
      })
    }

    if(tables.employees && tables.employees.length) {
      tables.employees.map(user => {
        if (user.id === row.driver) {
          newRow.driverName = `${user.firstname} ${user.lastname}`
          newRow.driverRate = user.compensation
          newRow.detentionPay = row.detentionPay !== '' ? parseInt(user.detentionRate) * parseFloat(row.detentionPay).toFixed(2) : 0;
          newRow.breakdownPay = row.breakdownPay !== '' ? parseInt(user.breakdownRate) * parseInt(row.breakdownPay) : 0
          newRow.layoverPay = row.layoverPay !== '' ? parseInt(user.layoverRate) * parseInt(row.layoverPay) : 0;
          newRow.additionPay = row.additionPay !== '' ? parseInt(row.additionPay) : 0;
        }

        if (user.id === row.user) {
          newRow.user = `${user.firstname} ${user.lastname}`
        }
        return user
      })
    }

    if(tables.equipment && tables.equipment.length) {
      tables.equipment.map(tractor => {
        if (tractor.id === row.tractor) {
          newRow.unit_num = tractor.unit_num
        }
        return tractor
      })
    }


    newRow.rate = row.tonu === '1' ? 0 : row.rate;
    newRow.pickupDate = new Date(row.pickupDate).toLocaleString();
    newRow.dropoffDate = new Date(row.dropoffDate).toLocaleString();
    return newRow;
  })
}
