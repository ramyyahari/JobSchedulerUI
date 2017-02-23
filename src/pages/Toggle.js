import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';


export default class Toggle extends React.Component {
 
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
        <h3> {this.state.text}
        <hr />
        <input type="text" ref="command" value={this.state.command} onChange={(e) => this.handleChange(e.target.value)} />
        <button id="button" onClick={ (e) => { this.clicked(); } }> Submit</button>      
        </h3>
      </div>
   );
  }
}
