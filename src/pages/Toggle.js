import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';


export default class Toggle extends React.Component {
 
 constructor() {
    super();
    this.state = {
      value: null,
    };
  } 
 
  clicked() {
    var query = { command: 'ls'}
    console.log("button clicked");
    fetch("/exec?command=ls")
      .then((response) => {
      return response.json();
      }).then((data) => {
      this.setState({ text: data});
    });
    //this.setState({ text: "Here"});
   }

  render() {
    return (
     <div className="container">
        <h2 className="text-center">Enter LS!</h2>
        <hr />
        <h3> {this.state.text}
        <hr />
        <input type="text" name="inputtext" value={this.state.command}/>
        <button id="button" onClick={ (e) => { this.clicked(); } }> Submit</button>      
        </h3>
      </div>
   );
  }
}
