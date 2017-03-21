import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

export default class NoteBook extends React.Component {
  
  render() {
    return (
      <MuiThemeProvider>
        <RaisedButton
          containerElement='label' // <-- Just add me!
          label='My Label'>
          <input type="file" />
        </RaisedButton>
      </MuiThemeProvider>
    );
 }
}


        