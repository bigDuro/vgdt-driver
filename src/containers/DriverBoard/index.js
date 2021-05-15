import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GroupByDateCard from '../../components/GroupByDateCard';
import { getActions } from './actions';
import { getUpdatedRows } from './rows';
import { get, getLoadsByKeyValue, getRecordsByIds, save } from '../../services';
import { filterRecords } from '../../utils/filterTables';
import './index.scss';




function DriverBoard(props) {
  const { history, match } = props;
  const [tables, setTables] = useState({});
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [driverId, setDriverId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const driver = match.params.driver;
  const actions = getActions(history, driver);
  const getData = (id, employees) => {
    getLoadsByKeyValue('driver', id).then(loads => {
      const brokerIds = loads.reverse().map(load => {
        return load.broker
      })
      getRecordsByIds('brokers', brokerIds).then(brokers => {
        const tempData = {
          'employees': employees,
          'brokers': brokers,
          'loads': loads
        }
        setTables(tempData);
        setRows(getUpdatedRows('loads', tempData));
      });
    })
  }
  const data = searchTerm ? filteredRows : rows;

  React.useEffect(() => {
    const makeRequest = async () => {
      get('employees').then(employees => {
        const theDriver = employees.filter(data => {
          return `${data.firstname} ${data.lastname}` === driver
        })
        if(theDriver && theDriver.length){
          setDriverId(theDriver[0].id);
          getData(theDriver[0].id, employees)
        }
      });


    }
    makeRequest();
  }, []);


  actions.handleStatus = (id, status) => {
    return new Promise((resolve, reject) => {
      const record = {
        id, status
      }
      save('loads', record).then(data => {
        getData(driverId, tables.employees)
      })
    })
  }

  actions.handleChange = (e) => {
    const term = e.currentTarget.value;
    setSearchTerm(term)
    setFilteredRows(filterRecords(rows, term));
  }


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {rows && rows.length ? <GroupByDateCard driverSelect={false} history={history} actions={actions} rows={data} tables={tables} searchTerm={searchTerm}/> : ''}
      </Grid>
    </Grid>
  )
}


export default DriverBoard;
