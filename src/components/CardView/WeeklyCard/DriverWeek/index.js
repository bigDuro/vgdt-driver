import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function DriverWeek(props) {
  const { totals, icons, driver } = props;
  const {driverPay, detentionPay, layoverPay, additionPay, breakdownPay} = totals;
  const totalPay = [driverPay, detentionPay, layoverPay, additionPay, breakdownPay].reduce((total, val) => {
    return parseFloat(total) + parseFloat(val)
  }, 0).toFixed(2)



  return (
    <React.Fragment>
      <CardHeader
        avatar={
          <Avatar aria-label="pickup" className={""}>
            {icons('Driver')}
          </Avatar>
        }
        title={`${driver}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Rate: {totals.driverRate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Standard Pay: ${totals.driverPay}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Detention Pay: ${totals.detentionPay}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Layover Pay: ${totals.layoverPay}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Breakdown Pay: ${totals.breakdownPay}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Addtional Pay: ${totals.additionPay}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Total Pay: ${totalPay}
        </Typography>
      </CardContent>
    </React.Fragment>
  )
}
