import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

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

  openFileDialog() {
    var fileUploadDom = React.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  onDrop(file) {
   
    var formData = new FormData();
        formData.append('photo', file[0]);
        
    if( formData.get('photo')['type'].includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") === false
          && formData.get('photo')['type'].includes("application/pdf") === false
     ) {
      this.setState({open: true});
    } else{
         superagent.post('/upload')
          .send(formData)
          .end(function(err, resp) {
            if (err) { console.error(err); }
              return resp;
          });
    }
}
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <MuiThemeProvider> 
        <div> 
          <RaisedButton label="New log" onTouchTap={this.handleOpen} />
          <Dialog
            title="Add content"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <TextField
              style= {{width: '100%', margin: 'auto' }}
              hintText="Title"
            />
            <DatePicker 
              hintText="Select date" />
            <TextField
              multiLine={true}
              style= {{width: '100%', margin: 'auto' }}
              rows={8}
              errorText="This field is required."
            />
            <RaisedButton 
              style={{ marginRight:'2'}} 
              containerElement='label'
              label="Attach file"
              onClick={ (e) => this.openFileDialog}>
              <Dropzone 
                style={{"display" : "none"}}
                onDrop={ (file) => this.onDrop(file)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
            </RaisedButton>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
 }
}
      
        //   <Dialog
        //     title="Add notebook"
        //     actions={actions}
        //     modal={false}
        //     open={this.state.open}
        //     onRequestClose={this.handleClose}
        //     autoScrollBodyContent={true}
        //   >
        //     <TextField
        //     multiLine={true}
        //     style= {{width: '100%', margin: 'auto' }}
        //     rows={15}
        //     errorText="This field is required."
        //   />
        //   <br />
      
        //   <Dialog
        //     title="Incorrect File Type"
        //     actions={actions}
        //     modal={false}
        //     open={this.state.open}
        //     onRequestClose={this.handleClose}
        //   >
        //   The file needs to be a Word document (.doc, .docx) 
        //   </Dialog>
  
        // </Dialog>


    //             <Dropzone onDrop={ (file) => this.onDrop(file)}>
    //          <div>Try dropping some files here, or click to select files to upload.</div>
    //         </Dropzone>
    // 