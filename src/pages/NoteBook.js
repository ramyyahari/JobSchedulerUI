import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

export default class NoteBook extends React.Component {
  
  onDrop(file) {
    
    var formData = new FormData();
        formData.append('photo', file[0]);
    console.log(formData.get('photo'));
    superagent.post('/upload')
      .send(formData)
      .end(function(err, resp) {
      if (err) { console.error(err); }
      return resp;
    });
}
  render() {
    return (
      <Dropzone onDrop={ (file) => this.onDrop(file)}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    );
 }
}


        