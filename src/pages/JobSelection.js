import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Form from 'muicss/lib/react/form';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';


export default class JobSelection extends React.Component {
  
  constructor(props) {
    super();
    this.state = {
      selected: ''
    }
    this.onChange = this.onChange.bind(this);
   }
  
  onChange(e) {
    this.setState({
      selected: e.target.label,
    });
    this.props.getSelect(e.target.value);
  }  
  
  render() {
    
  return(   
      <Form>    
        <legend>Select job</legend>
        <Select name="jobSelect" value={this.state.selected} onChange={this.onChange}>
              <Option value="" />
              <Option label="Blast Farm" value="blastFarm" />
              <Option label="Fastx Toolkit" value="fastX" />
              <Option label="Default shell" value="defaultShell" />
              <Option label="Option 4" value="opt4" />
        </Select>
       <br />  
      </Form>
    );
  }
}

JobSelection.PropTypes = {
  getSelect: React.PropTypes.func,
}