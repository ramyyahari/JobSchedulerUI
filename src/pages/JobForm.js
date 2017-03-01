import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

import { Toggle} from './';
import { BlastFarm} from './';

export default class JobForm extends React.Component {
  
 
  constructor() {
    super();
    this.state = {
      command:'ls', 
      jobName: '',
      memory:'',
      walltime: '',
      additional: '',    
      value: null,
      showComponent: false,
      showBlastFarm: false,
      selected: '' ,
      output: 'NULL'
    };
    this.onChange = this.onChange.bind(this);
    this.clicked = this.clicked.bind(this);
  } 

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
 //   console.log(this.state.value);
  }
  
  clicked() {
    console.log("button clicked: "+this.state.command);  
    fetch("/exec?command="+this.state.command)
      .then((response) => {
      return response.json();
      }).then((data) => {
    });
  }

  onChange(e) {
    
    this.setState({
      selected: e.target.label,
    });
    
    switch(e.target.value) {

      case "blastFarm": {
        console.log('Option ' + e.target.value);       
        this.setState({
          showBlastFarm: true,
          showComponent: false,
          command: "ls node_modules"
        });
      } break;
      
      case "fastX":  console.log('Option ' + e.target.value); break;
      
      case "defaultShell": console.log('Option ' + e.target.value); break;
      
      case "opt4": {
        this.setState({
          showComponent: true,
          showBlastFarm: false
        });
      } break;        
      
      case "ls": console.log('Option ' + e.target.value); break;
    }
  }
  
  render() {
    
  return(   
      <Form>    
        <legend>Enter job parameters</legend>
        <Input hint="Job Name" value={this.state.jobName} onChange={this.handleChange.bind(this, 'jobName')}/>
        <Input hint="Memory Size" value={this.state.memory} onChange={this.handleChange.bind(this, 'memory')}/>
        <Input hint="Walltime[hh:mm:ss]" value={this.state.walltime} onChange={this.handleChange.bind(this, 'walltime')}/>
        <Textarea hint="Additional Parameters:" value={this.state.additional} onChange={this.handleChange.bind(this, 'additional')} />
        <legend>Select job</legend>
        <Select name="jobSelect" value={this.state.selected} onChange={this.onChange}>
              <Option value="" />
              <Option label="Blast Farm" value="blastFarm" />
              <Option label="Fastx Toolkit" value="fastX" />
              <Option label="Default shell" value="defaultShell" />
              <Option label="Option 4" value="opt4" />
        </Select>
        {this.state.showBlastFarm ? <BlastFarm /> : null}
        {this.state.showComponent ? <Toggle /> : null}       
        <br />  
        <Button color="primary" variant="raised" onClick={ (e) => { this.clicked(); } }>Submit</Button>
      </Form>
    );
  }
}