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
      value: null,
      command: '',
    }; 
  }
 
  handleChange(value) {
    this.setState({
      command: value
    });
  }

  clicked() {
    console.log("button clicked: "+this.refs.command.value);
    
    fetch("/exec?command="+this.refs.command.value)
      .then((response) => {
      return response.json();
      }).then((data) => {
      this.setState({ 
        command: '',
      });

    });
 //   console.log("button clicked");
  }

  render() {
  return(  
      <Form>    
        <legend>Enter job parameters</legend>
        <Input hint="Job Name" ref="command" value={this.state.command} onChange={(e) => this.handleChange(e.target.value)}/>
        <Input hint="Memory Size" />
        <Input hint="Walltime[hh:mm:ss]" />
        <Textarea type="text" hint="Additional Parameters: " />
        <Button color="primary" variant="raised" onClick={ (e) => { this.clicked(); } }>Submit</Button>
      </Form>
    );
  }
}