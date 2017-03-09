import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from 'muicss/lib/react/form';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

import { JobSelection } from './';
import { SchedulerForm } from './';
import { JobForm } from './';

class JobSubmission extends React.Component {


  state = {
    finished: false,
    stepIndex: 0,
    selected: '',
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getSelection = (select) => {
    this.setState({
      selected: select,
    });    
  }

  getStepContent(stepIndex) {
    const {selected} = this.state;   
    switch (stepIndex) {
      case 0:
        return <JobSelection getSelect={this.getSelection} />; 
      case 1:
        return <JobForm choice={this.state.selected} />;
      case 2:
        return <SchedulerForm />;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <MuiThemeProvider>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Select Job</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select Job Parameters</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select Scheduler Parameters</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Reset
              </a> 
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default JobSubmission;