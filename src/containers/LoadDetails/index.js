import React from 'react';
import {Grid, Typography, Paper, makeStyles, useMediaQuery} from '@material-ui/core';
import { LOAD_STATUS } from '../../constants';
import LoadCard from '../../components/CardView/LoadCard/full';
import Tracker from '../../components/CardView/LoadCard/Tracker/';
import AssetManager from '../AssetManager'
import { getActions } from './actions';
import { getUpdatedRows } from './rows';
import { getByID, getRecordsByIds, save, notifyDispatch } from '../../services';
import { filterRecords } from '../../utils/filterTables';
import './index.scss';

const DRIVER_FILTER = ['Planning', 'Scheduled', 'Billed'];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  headings: {
    margin: theme.spacing(1)
  }
}));

const filteredSteps = LOAD_STATUS.filter(status => {
  return !DRIVER_FILTER.includes(status.type);
})

function CommonBoard(props) {
  const { history, match } = props;
  const [load, setLoad] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState([]);
  const [activity, setActivity] = React.useState('');
  const [nextLabel, setNextLabel] = React.useState('');
  const table = match.params.table;
  const id = match.params.id;
  const actions = getActions(table, history);
  const isMobile = useMediaQuery('(max-width:1023px)');
  const classes = useStyles();
  const getLoadDetails = () => {
    getByID(table, id).then(load => {
      const brokerIds = [load.broker];
      const employeeIds = [load.driver, load.user];
      const equipmentIds = [load.tractor, load.trailer];
      const step = load.status ? filteredSteps.findIndex(x => x.type === load.status) + 1 : 1;
      const driversteps = filteredSteps.reduce((list, step, indx) => {
        list.push(step.description);
        return list;
      }, []);

      setNextLabel(filteredSteps[step] ? filteredSteps[step].description : '')
      setActiveStep(step)
      setActivity(filteredSteps[step] ? filteredSteps[step].activity : '')
      setSteps(driversteps)
      Promise.all([
        getRecordsByIds('brokers', brokerIds),
        getRecordsByIds('employees', employeeIds),
        getRecordsByIds('equipment', equipmentIds)
      ]).then(data => {
        const updatedLoad = data.reduce((upLoad, item) => {
          if(item.brokers && item.brokers.length){
            const broker = item.brokers.filter(broker => broker.id === load.broker)[0]
            upLoad.brokerName = broker.name;
          }else if(item.employees && item.employees.length){
            const driver = item.employees.filter(employee => employee.id === load.driver)[0];
            const dispatch = item.employees.filter(employee => employee.id === load.user)[0]
            upLoad.driverName = `${driver.firstname} ${driver.lastname}`;
            upLoad.dispatchName = `${dispatch.firstname} ${dispatch.lastname}`;
          }else if (item.equipment && item.equipment.length) {
            const tractor = item.equipment.filter(eqt => eqt.id === load.tractor)[0];
            const trailer = item.equipment.filter(eqt => eqt.id === load.trailer)[0];
            upLoad.tractorName = tractor ? tractor.unit_num : '';
            upLoad.trailerName = trailer ? trailer.unit_num : '';
          }

          return upLoad;
        }, {...load})

        updatedLoad.pickupDate = new Date(updatedLoad.pickupDate).toLocaleString()
        updatedLoad.dropoffDate = new Date(updatedLoad.dropoffDate).toLocaleString()
        setLoad(updatedLoad);
      })
    });
  }

  const handleStatus = (index) => {
    return new Promise((resolve, reject) => {
      const status = filteredSteps[index];
      const updatedLoad = {...load, ontime: '', status: status.description};
      const record = {
        id, status: status.type
      }
      if(status.ontime) {
        const pickorDropDate = index < 2 ? updatedLoad.pickupDate : updatedLoad.dropoffDate
        updatedLoad.ontime = status.ontime(pickorDropDate);
      }

      save('loads', record).then(data => {
        notifyDispatch(updatedLoad);
        getLoadDetails();
      })
    })
  }
  React.useEffect(() => {
    const makeRequest = async () => {
      getLoadDetails()
    }
    makeRequest();
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h5" color="textSecondary" component="p" className={classes.headings}>
          Load Tracker
        </Typography>
        <Paper variant="outlined" >
          <Tracker isMobile={isMobile} data={load} handleStatus={handleStatus} activeStep={activeStep} activity={activity} steps={steps} nextLabel={nextLabel}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color="textSecondary" component="p" className={classes.headings}>
          Load Details
        </Typography>
        <LoadCard data={load} isMobile={isMobile} actions={actions} isExpanded={true}/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color="textSecondary" component="p" className={classes.headings}>
          Load Documents
        </Typography>
         <Paper variant="outlined" >
            <AssetManager {...props} isMobile={isMobile}/>
         </Paper>
      </Grid>
    </Grid>

  )
}


export default CommonBoard;
