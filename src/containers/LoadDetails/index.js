import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GroupByDateCard from '../../components/GroupByDateCard';
import LoadCard from '../../components/CardView/LoadCard';
import AssetManager from '../../components/AssetManager';
import ListToolBar from '../../components/ListToolBar';
import { getActions } from './actions';
import { getUpdatedRows } from './rows';
import { get, getLoadsByKeyValue, getRecordsByIds, save, notifyDispatch, getByID } from '../../services';
import { filterRecords } from '../../utils/filterTables';
import { LOAD_STATUS } from '../../constants';
import './index.scss';




function DriverBoard(props) {
  const { history, match } = props;
  const [tables, setTables] = useState({});
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [driverId, setDriverId] = useState('');
  const loadId = match.params.id || '';
  const [searchTerm, setSearchTerm] = useState('');
  const driver = match.params.driver;
  const actions = getActions(history, driver);
  const isMobile = useMediaQuery('(max-width:1023px)');
  const getData = (id) => {
    // getLoadsByKeyValue('driver', id).then(loads => {
    //   const brokerIds = loads.reverse().map(load => {
    //     return load.broker
    //   })
    //   getRecordsByIds('brokers', brokerIds).then(brokers => {
    //     const tempData = {
    //       'employees': employees,
    //       'brokers': brokers,
    //       'loads': loads
    //     }
    //     setTables(tempData);
    //     setRows(getUpdatedRows('loads', tempData));
    //   });
    // })

    getByID('loads', id).then(load => {
      console.log('load:: ', load);
      getByID('brokers', load.broker).then(broker => {
        console.log('broker: ', broker);
      })
      getByID('employees', load.driver).then(driver => {
        console.log('driver: ', driver);
      })
    })
  }
  // const data = searchTerm ? filteredRows : rows;

  React.useEffect(() => {
    const makeRequest = async () => {

      console.log('loadId: ', loadId);
      getData(loadId);


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

        <Grid item xs={12}id={row.id}>
          <AssetManager/>
        </Grid>
      </Grid>
    </Grid>
  )
}


// <Grid item xs={12} id={row.id}>
//   <LoadCard data={row} isMobile={isMobile} actions={actions}/>
// </Grid>

export default DriverBoard;
