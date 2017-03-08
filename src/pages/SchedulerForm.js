import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';

export default class SchedulerForm extends React.Component {
  
 
  constructor() {
    super();
    this.state = {
      jobName: '',
      memory:'',
      walltime: '',
      additional: '',    
      value: null,
    };
    this.clicked = this.clicked.bind(this);
  } 

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
 //   console.log(this.state.value);
  }
  
  clicked() {
    console.log("button clicked: "+this.state.jobName);  
    fetch("/exec?command="+this.state.jobName)
      .then((response) => {
      return response.json();
      }).then((data) => {
    });
  }

  render() {
    
  return(   
      <Form>    
        <legend>Enter job parameters</legend>
        <Input hint="Job Name" value={this.state.jobName} onChange={this.handleChange.bind(this, 'jobName')}/>
        <Input hint="Memory Size" value={this.state.memory} onChange={this.handleChange.bind(this, 'memory')}/>
        <Input hint="Walltime[hh:mm:ss]" value={this.state.walltime} onChange={this.handleChange.bind(this, 'walltime')}/>
        <Textarea hint="Additional Parameters:" value={this.state.additional} onChange={this.handleChange.bind(this, 'additional')} />
      </Form>
    );
  }
}