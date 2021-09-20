import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GroupByDateCard from '../../components/GroupByDateCard';
import LoadCard from '../../components/CardView/LoadCard';
import ListToolBar from '../../components/ListToolBar';
import { getActions } from './actions';
import { getUpdatedRows } from './rows';
import { get, getLoadsByKeyValue, getRecordsByIds, save, notifyDispatch } from '../../services';
import { filterRecords } from '../../utils/filterTables';
import { LOAD_STATUS } from '../../constants';
import './index.scss';




function DriverBoard(props) {
  const { history, match } = props;
  const [tables, setTables] = useState({});
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [driverId, setDriverId] = useState('');
  const [driver, setDriver] = useState(match.params.driver);
  const loadId = match.params.id || '';
  const [searchTerm, setSearchTerm] = useState('');
  const actions = getActions(history, driver);
  const isMobile = useMediaQuery('(max-width:1023px)');
  const steps = LOAD_STATUS.reduce((list, step) => {
    list.push(step.description);
    return list;
  }, []);
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
  // const data = searchTerm ? filteredRows : rows;

  React.useEffect(() => {
    const makeRequest = async () => {
      get('employees').then(employees => {
        const theDriver = employees.filter(data => {
          return `${data.firstname} ${data.lastname}` === driver
        })
        if(theDriver && theDriver.length){
          setDriverId(theDriver[0].id);
          getData(theDriver[0].id, employees);
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

      const statusIndex = LOAD_STATUS.findIndex(statusItem => statusItem.type === status);
      const loadStatus = LOAD_STATUS[statusIndex];
      const load = {...rows.filter(row => row.id === id)[0], ...record, ontime: '', status: loadStatus.description};

      if(loadStatus.ontime) {
        const pickorDropDate = statusIndex < 4 ? load.pickupDate : load.dropoffDate
        load.ontime = loadStatus.ontime(pickorDropDate);
      }

      save('loads', record).then(data => {
        notifyDispatch(load);
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
        <ListToolBar actions={actions} searchTerm={searchTerm}/>
        {rows && rows.length && searchTerm ?
          filteredRows.map((row, indx) => {
          return (
              <Grid item xs={12} key={indx} id={row.id}>
                <LoadCard key={indx} data={row} isMobile={isMobile} actions={actions} steps={steps}/>
              </Grid>
            )
          })
           : <GroupByDateCard driverSelect={false} history={history} actions={actions} rows={rows} tables={tables} searchTerm={searchTerm}/> }
      </Grid>
    </Grid>
  )
}


export default DriverBoard;
