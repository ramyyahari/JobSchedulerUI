import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
//import axios from 'axios';

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    /*this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));*/
    //axios.get('/exec');
  }

  render() {
    return (
      <button onClick={this.handleClick}> LS
      </button>
    );
  }
}
