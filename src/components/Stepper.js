import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper as MaterialStepper,
  StepContent,
  StepLabel,
  Typography
} from '@mui/material';

// ----------------------------------------------------------------------

Stepper.propTypes = {
  steps: PropTypes.array
};
function Stepper({ steps }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <MaterialStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
              <StepContent>{step.content}</StepContent>
            </Step>
          );
        })}
      </MaterialStepper>
      {activeStep === steps.length ? (
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default Stepper;
