import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

export default class JobForm extends React.Component {
  
 
  constructor() {
     super();
     this.state = {
        command:'', 
        memory:'',
        walltime: '',
        additional: '',    
        value: null
      };
  } 

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }
  
  clicked() {
    console.log("button clicked: "+this.state.command);
    
    fetch("/exec?command="+this.state.command)
      .then((response) => {
      return response.json();
      }).then((data) => {
      this.setState({ 
        command: '',
      });

    });
  }

  render() {
  return(  
      <Form>    
        <legend>Enter job parameters</legend>
        <Input hint="Job Name" value={this.state.command} onChange={this.handleChange.bind(this, 'command')}/>
        <Input hint="Memory Size" />
        <Input hint="Walltime[hh:mm:ss]" />
        <Textarea type="text" hint="Additional Parameters: " />
        <Button color="primary" variant="raised" onClick={ (e) => { this.clicked(); } }>Submit</Button>
      </Form>
    );
  }
}