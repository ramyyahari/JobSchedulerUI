import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Header from './Header';

export default class is extends React.Component {
  render() {
    return (
      <DocumentTitle title='Dhingra Lab'>
        <div className='MasterPage'>        
          <Header />
          <br />
          <br />
          <br />
          <br />
          { this.props.children }
        </div>
      </DocumentTitle>
    );
  }
}