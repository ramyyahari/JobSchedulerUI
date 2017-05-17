import { Link } from 'react-router';
import React, { PropTypes } from 'react';

export default class IndexPage extends React.Component {

  render() {
    return (
      <div className="container">
        <hr />
        <div className="jumbotron">
          <p>
            <strong>Welcome to Dhingra Lab!</strong>
          </p>
        </div>
      </div>
    );
  }
}