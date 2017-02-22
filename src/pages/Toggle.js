import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';


export default class Toggle extends React.Component {
  
 
  clicked() {
    fetch("/exec").then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ text: data});
    });
   }

  render() {
    return (
      <div>
        {this.state.text}
        <input ref="textBox" type="text" />
        <button id="button" onClick={ (e) => { this.clicked(); } }> Submit</button>      
      </div>
    );
  }
}
