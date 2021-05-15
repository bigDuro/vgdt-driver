import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green, grey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LoadCard from '../LoadCard';
import DriverWeek from './DriverWeek';
import { getMomentWeek, getDateRangeOfWeek } from '../../../utils/dates';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0px auto'
  },
  CardContainer: {
    backgroundColor: '#fff'
  },
  CardContent: {
    margin: '0px auto',
    borderTop: 'solid 1px #ddd'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  green: {
    color: green[500]
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  iconStatus: {
    backgroundColor: grey[100]
  },
  status: {
    backgroundColor: '#009be5',
  },
  status_bg: {
    backgroundColor: '#fff'
  },
  cardActions: {
    backgroundColor: '#fff'
  }
}));

const icons = (type, classes) => {
  const types = {
    Week: <WatchLaterIcon/>,
    Driver: <LocalShippingIcon/>
  }

  return types[type] || false
}

export default function WeeklyCard(props) {
  const { data, actions, isMobile, selected, handleSelected, totals, week } = props;
  const { getDriver } = actions;
  const driver = getDriver();
  const currentWeek = getMomentWeek(new Date());
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(week === currentWeek);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const partsOfWeek = week.split('-')
  const theDateRange = getDateRangeOfWeek(partsOfWeek[1], partsOfWeek[0])

  return (
    <Card className={classes.root}>
      <Grid container spacing={0} justify="space-between">
        <Grid item  xs={12} sm={12} md={6} className={""}>
            <CardHeader
            avatar={
              <Avatar aria-label="status" className={""}>
                {icons('Week')}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
              </IconButton>
            }
            title={`${week === currentWeek ? 'Current Week: ' + theDateRange : week < currentWeek ? 'Week: ' + theDateRange  :  'Upcoming Week: ' + theDateRange}`}
          />
          <CardContent>
           {//<Typography variant="body2" color="textSecondary" component="p">
             //Total: ${totals.rate}.00
           //</Typography>
          }
           <Typography variant="body2" color="textSecondary" component="p">
             Total Miles: {parseInt(totals.loadedMiles) + parseInt(totals.deadHead)}
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
             Total Rate Per Mile: ${(parseInt(totals.rate) / (parseInt(totals.loadedMiles) + parseInt(totals.deadHead))).toFixed(2)}
           </Typography>
          </CardContent>
        </Grid>
        <Grid item  xs={12} sm={12} md={6}>
        {driver !== '' ?
          <DriverWeek driver={driver} totals={totals} icons={icons}/> : '' }

        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="View Loads"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.CardContainer}>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.CardContent}>
                {data.map((row, indx) => {
                return (
                    <Grid item xs={12} key={indx} id={row.id}>
                      <LoadCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected} actions={actions}/>
                    </Grid>
                  )
                })}
            </CardContent>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
