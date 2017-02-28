import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';


export default class Toggle extends React.Component {
 
  constructor() {
     super();
     this.state = {
        command:'', 
        memory:'',
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
    console.log("button clicked"+this.state.command);
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
    var total = this.state.command + this.state.memory + this.state.walltime + this.state.additional;
      return (
        <div>
        <h3>{total}<br/>
          <input type="text" value={this.state.command} onChange={this.handleChange.bind(this, 'command')} />
          <br />
          <input type="text" value={this.state.memory} onChange={this.handleChange.bind(this, 'memory')} />
          <br />
          <input type="text" value={this.state.walltime} onChange={this.handleChange.bind(this, 'walltime')} />
          <br />
          <input type="text" value={this.state.additional} onChange={this.handleChange.bind(this, 'additional')} />                    
          <br />
          <button id="button" onClick={ (e) => { this.clicked(); } }> Submit</button> 
        </h3>
        </div>
      );
 }
}

  //   return (
  //    <div className="container">
  //     <h2 className="text-center">Enter LS!</h2>
  //     <hr />
  //     <h3> 
  //       {this.state.text}
  //       <hr />
  //       <input type="text" ref="command" value={this.state.command} onChange={(e) => this.handleChange(e.target.value)} />
  //       <input type="text" ref="memory" value={this.state.memory} onChange={(e) => this.handleChange(e.target.value)} />
  //      <input type="text" value={this.state.memory} 
          //                    onChange={this.handleChange.bind(this, 'memory')} />
          // <input type="text" value={this.state.memory} 
          //                    onChange={this.handleChange.bind(this, 'memory')} />  <input type="text" ref="walltime" value={this.state.walltime} onChange={(e) => this.handleChange(e.target.value)} />
  //       <input type="text" ref="additional" value={this.state.additional} onChange={(e) => this.handleChange(e.target.value)} />
  //       <button id="button" onClick={ (e) => { this.clicked(); } }> Submit</button>      
  //     </h3>
  //   </div>
  //  );

  // handleChange(value) {
  //   this.setState({
  //     command: value
  //   });
  // }
