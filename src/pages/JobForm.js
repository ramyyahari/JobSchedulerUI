import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

export default class JobForm extends React.Component {
  
 
  constructor() {
     super();
     this.state = {
        command:'', 
        memory:'',
        walltime: '',
        additional: '',    
        val: null,
      };
  } 

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
    console.log(this.state.val);
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
        <Input hint="Memory Size" value={this.state.memory} onChange={this.handleChange.bind(this, 'memory')}/>
        <Input hint="Walltime[hh:mm:ss]" value={this.state.walltime} onChange={this.handleChange.bind(this, 'walltime')}/>
        <Textarea type="text" hint="Additional Parameters: " value={this.state.additional} onChange={this.handleChange.bind(this, 'additional')} />
        <legend>Select job</legend>
        <Dropdown color="accent" label="Dropdown" onSelect={function(val) {console.log(val); }} >
          <DropdownItem value= 'a'>Option 1</DropdownItem>
          <DropdownItem value= 'b'>Option 2</DropdownItem>
          <DropdownItem value= 'c'>Option 3</DropdownItem>
          <DropdownItem value= 'd'>Option 4</DropdownItem>
        </Dropdown>
      <br />  
      <Button color="primary" variant="raised" onClick={ (e) => { this.clicked(); } }>Submit</Button>
      </Form>
    );
  }
}