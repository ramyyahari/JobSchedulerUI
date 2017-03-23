import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class NoteBook extends React.Component {
 
 state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  onDrop(file) {

    var formData = new FormData();
        formData.append('photo', file[0]);
        console.log(formData.get('photo')['type']);
    // if( formData.get('photo')['type'].includes(".doc") === false ) {
    //     this.setState({open: true});
    // } else{
         superagent.post('/upload')
          .send(formData)
          .end(function(err, resp) {
            if (err) { console.error(err); }
              return resp;
          });
  //    }
}
  render() {
    const actions = [
      <FlatButton
        label="Discard"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
    <div> 
      <Dropzone onDrop={ (file) => this.onDrop(file)}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
     <MuiThemeProvider> 
      <Dialog
          title="Incorrect File Type"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The file needs to be a Word document (.doc, .docx) 
        </Dialog>
    </MuiThemeProvider>
    </div>
    );
 }
}


        