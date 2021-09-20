import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    margin: theme.spacing(4),
    marginBottom: theme.spacing(5)
  }
}));


export default function HorizontalLinearStepper(props) {
  const { data, handleStatus, activeStep, steps, activity, nextLabel, isMobile } = props;
  const { id, status, broker } = data;
  const classes = useStyles();
  const label = steps[activeStep];
  const orientation = isMobile ? 'vertical' : 'horizontal';
  const handleNext = () => {
    handleStatus(activeStep);
  };

  const handleBack = () => {
    handleStatus(activeStep - 2);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation={orientation}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div className={classes.buttonContainer}>
              <Typography variant="body2">
                Deliver is completed - Procede to Upload BOL/POD below.
              </Typography>
            </div>
          ) : (
            <div className={classes.buttonContainer}>
              <Typography variant="body2" className={classes.instructions}>{activity}</Typography>
              <div>
                <Button disabled={activeStep <= 1} onClick={handleBack} className={classes.button}>
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : nextLabel}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
