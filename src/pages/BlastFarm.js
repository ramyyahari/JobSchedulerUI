import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Input from 'muicss/lib/react/input';


export default class BlastFarm extends React.Component {
 
  constructor() {
     super();
     this.state = {
        input_name:'', 
       };
  } 
   
  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div>
        <Input hint="Input File Name" value={this.state.input_name} onChange={this.handleChange.bind(this, 'input_name')} />
      </div>
    );
  }
}
