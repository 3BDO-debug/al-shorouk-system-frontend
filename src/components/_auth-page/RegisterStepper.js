import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Step, Button, Stepper as MaterialStepper, StepContent, StepLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

RegisterStepper.propTypes = {
  steps: PropTypes.array,
  submitHandler: PropTypes.func,
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool
};

function RegisterStepper({ steps, submitHandler, dirty, isSubmitting }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
      <Box sx={{ display: 'flex' }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          السابق
        </Button>
        <Box sx={{ flexGrow: 1 }} />

        {activeStep !== steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            التالي
          </Button>
        ) : (
          <LoadingButton disabled={!dirty} loading={isSubmitting} onClick={submitHandler}>
            انهاء
          </LoadingButton>
        )}
      </Box>
    </>
  );
}

export default RegisterStepper;
