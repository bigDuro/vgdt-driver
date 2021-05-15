import React from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import WeeklyCard from '../CardView/WeeklyCard';
import DriverSelect from './DriverSelect';
import { getMomentWeeks } from '../../utils/dates';

export default function GroupByDateCard(props) {
  const { rows, tables, actions, searchTerm, driverSelect } = props;
  const isMobile = useMediaQuery('(max-width:1023px)');
  const [ selected, setSelected ] = React.useState([]);
  const handleSelected = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };


  const getWeeklyTotals = (data, key) => {
    const results = data[key].reduce((total, record) => {
      const weeksRateToDate = total.rate ? parseFloat(record.rate) + parseFloat(total.rate) : parseFloat(record.rate);
      const driverWeekPayToDate = (weeksRateToDate * record.driverRate).toFixed(2);
      const weekyDetentionPayToDate = total.detentionPay ? parseFloat(record.detentionPay) + parseFloat(total.detentionPay) : parseFloat(record.detentionPay).toFixed(2);
      const weeklyloadedMiles = total.loadedMiles ? parseFloat(record.loadedMiles) + parseFloat(total.loadedMiles) : parseFloat(record.loadedMiles);
      const weeklyDeadheadMiles = total.deadHead ? parseFloat(record.deadHead) + parseFloat(total.deadHead) : parseFloat(record.deadHead);
      const weekyAdditionPayToDate = total.additionPay ? parseFloat(record.additionPay) + parseFloat(total.additionPay) : parseFloat(record.additionPay).toFixed(2);
      const weekylayoverPayToDate = total.layoverPay ? parseFloat(record.layoverPay) + parseFloat(total.layoverPay) : parseFloat(record.layoverPay).toFixed(2);
      const weekyBreakdownPayToDate = total.breakdownPay ? parseFloat(record.breakdownPay) + parseFloat(total.breakdownPay) : parseFloat(record.breakdownPay).toFixed(2);

      return {
        ...total,
        rate: weeksRateToDate,
        driverPay: driverWeekPayToDate,
        driverName: record.driverName,
        driverRate: `${record.driverRate * 100}%`,
        detentionPay: weekyDetentionPayToDate,
        additionPay: weekyAdditionPayToDate,
        layoverPay: weekylayoverPayToDate,
        breakdownPay: weekyBreakdownPayToDate,
        week: key,
        loadedMiles: weeklyloadedMiles,
        deadHead: weeklyDeadheadMiles
      }
    }, {});

    return results;
  }

  const getCards = (rows) => {
    const weeks = getMomentWeeks(rows, 'dropoffDate');
    return Object.keys(weeks).map((week, idx) => {
      const totals = getWeeklyTotals(weeks, week)
      return (
        <Grid item xs={12} key={idx} id={week}>
        {weeks[week] && weeks[week].length ?
          <WeeklyCard actions={actions} key={idx} expand={idx} totals={totals} data={weeks[week]} week={week} isMobile={isMobile} selected={selected} handleSelected={handleSelected}/> : ""}
        </Grid>
      )
    })
  }


  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>{driverSelect ? <DriverSelect employees={tables.employees} actions={actions}/> : ''}</Grid>
      {rows && rows.length ? getCards(rows) : ''}

     </Grid>
    </React.Fragment>
  )
}
