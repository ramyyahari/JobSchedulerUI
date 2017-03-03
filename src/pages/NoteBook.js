import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Input from 'muicss/lib/react/input';


export default class NoteBook extends React.Component {
 
  constructor() {
     super();
     this.state = {
        content:'', 
       };
  } 
   
  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
    console.log("in toggle "+e.target.value);
  }

  render() {
    var total = this.state.content;
      return (
        <div>
          <h3>{total}<br/>
            <Input hint="New element" value={this.state.content} onChange={this.handleChange.bind(this, 'content')} />
          </h3>
        </div>
      );
 }
}
