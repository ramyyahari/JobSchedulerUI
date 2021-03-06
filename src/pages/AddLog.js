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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
const style = {
  bottom: 30,
  right: 30,
  position: 'fixed'
};

const styles = {
  marginLeft: '40%',
};

export default class AddLog extends React.Component {
  constructor() {
     super();
     this.state = {
        open: false,
        title: '',
        date: null,
        content: '',
        filename: [],
        showProgress: false 
       };
  } 

  // componentDidMount() {
  //   fetch('*').then(function(response){
  //     console.log( response.json());
  //   }); 
  // }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {

    this.setState({open: false});
     fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      title: this.state.title,
      date: this.state.date,
      content: this.state.content,
      filename: this.state.filename
      })
    });
    window.location.reload(true);
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  setDate(value) {
    this.setState({date: value});
  }

  openFileDialog() {
    var fileUploadDom = React.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  onDrop(file) {
    
    this.setState({showProgress: true});
   
    var formData = new FormData();
        formData.append('photo', file[0]);

    var temp = this.state.filename.slice();    
    temp.push( formData.get('photo')['name']);
    this.setState({ filename: temp });
        
    if( formData.get('photo')['type'].includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") === false
      && formData.get('photo')['type'].includes("application/pdf") === false
      && formData.get('photo')['type'].includes("image/") === false
      && formData.get('photo')['type'].includes("text/") === false
    ) {
      this.setState({open: true});
    } else{
         superagent.post('/upload')
          .send(formData)
          .on('progress', function(e) {
            console.log('Percentage done: ', e.percent);
          })
          .end(function(err, resp) {
            if (err) { console.error(err); }
              return resp;
          });
         // this.setState({showProgress: false});
    }
}
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <MuiThemeProvider> 
        <div> 
          <FloatingActionButton style={style} onTouchTap={this.handleOpen}>
            <ContentAdd />
          </FloatingActionButton>
          <Dialog
            title="Add content"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <TextField
              value={this.state.title}
              onChange={this.handleChange.bind(this, 'title')}
              style= {{width: '100%', margin: 'auto' }}
              errorText="This field is required."
              hintText="Title"
            />
            <DatePicker 
              value={this.state.date}
              onChange={(event, x) => {this.setDate(x);}}
              hintText="Select date" />
              { this.state.showProgress ?  <CircularProgress size={80} thickness={5} style={styles}/> : null }
            <TextField
              multiLine={true}
              value={this.state.content}
              onChange={this.handleChange.bind(this, 'content')}
              style= {{width: '100%', margin: 'auto' }}
              rows={8}
              errorText="This field is required."
            />
            <RaisedButton 
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