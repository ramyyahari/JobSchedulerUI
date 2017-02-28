import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';


export default class Toggle extends React.Component {
 
 constructor() {
    super();
    this.state = {
      value: null,
      command: '',
      memory: '',
      walltime: '',
      additional: ''
    };
  } 
 
  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  clicked() {
    console.log("button clicked"+this.refs.command.value);
    fetch("/exec?command="+this.refs.command.value)
      .then((response) => {
      return response.json();
      }).then((data) => {
      this.setState({ 
        text: data,
        command: '',
      });

    });
    //this.setState({ text: "Here"});
   }

  render() {
    return (
     <div className="container">
      <h2 className="text-center">Enter LS!</h2>
      <hr />
      <h3> 
        {this.state.text}
        <hr />
        <input type="text" ref="command" value={this.state.command} onChange={this.handleChange(this, 'command')} />
        <input type="text" ref="memory" value={this.state.memory} onChange={(e) => this.handleChange(e.target.value)} />
        <input type="text" ref="walltime" value={this.state.walltime} onChange={(e) => this.handleChange(e.target.value)} />
        <input type="text" ref="additional" value={this.state.additional} onChange={(e) => this.handleChange(e.target.value)} />
        <button id="button" onClick={ (e) => { this.clicked(); } }> Submit</button>      
      </h3>
    </div>
   );
  }
}
