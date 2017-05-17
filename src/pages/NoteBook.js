import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardMedia, CardTitle , CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Option from 'muicss/lib/react/option';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search';

import { AddLog } from './';

export default class NoteBook extends React.Component {

	constructor() {
     super();
     this.state = {
    	array: [],
      content: '',
      updateValue: '',
      selectedFileValue: null,
    };
  } 
	
	componentDidMount() {
		fetch('/api/comments').then(function(response){
    		return response.json();
    }).then(function(j) {
			this.setState({array: j});
		}.bind(this))
		.catch((e) => {
    	console.log(e);
    });    

	}

  updateContent( e ) {
    var lowerCase = e.target.value;
    this.setState({
      content: lowerCase.toLowerCase()
    });
  }

  handleFileChange(value) {
   //console.log(value);
    this.setState({
      selectedFileValue: value
    });
    fetch("/download?filename="+value)
      .then((response) => {
        return response.blob;
      }).then((blob) => {
        console.log(blob);
      }).catch((e) => {
          console.log(e);
    });
  }


  handleChange(e) {
    this.setState({ updateValue: e.target.value});
  }

  handleDelete( data, name ) {
    fetch('/api/comments', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      _id: data,
      content: name+"\nUpdates: "+this.state.updateValue
      })
    }).catch((e) => {
        console.log(e);
    });    
    window.location.reload(true);
  }


  render() {
    
    const holder = this.state.array
      .filter( x => {
        var concatPost = (x.title + " " + x.content + " " + x.username).toLowerCase();      
          return  concatPost.indexOf(this.state.content) >=0 
        })
        .map( (x) => {
          let temp = x.files.split(",");

          return(
            <ListItem key = {x._id}>
              <Card>
                <CardHeader
                    title= {x.username}
                    avatar= "https://goo.gl/ims56t" 
                  />
                  <CardTitle title={x.title} subtitle={x.date} />
                <CardText style={{ whiteSpace: 'pre-wrap'}}>
                  {x.content}
                </CardText>
                <CardActions>
                  <TextField
                    value= {this.state.updateValue}
                    onChange={this.handleChange.bind(this)}
                    floatingLabelText="Click here to update content"
                    floatingLabelFocusStyle={{ color: '#2196f3' }}
                    style={{ fill: '#eeeeee' }}
                    fullWidth
                    multiLine
                  />
                  <br />
                  <IconMenu
                    iconButtonElement={<IconButton> <FileFileDownload /> </IconButton>}
                    value={this.state.selectedFileValue}
                    >
                      {temp.map((name, index) =>
                        <MenuItem onClick={e => {this.handleFileChange(name);} } key={index} value={name}  primaryText={name} />
                      )}
                  </IconMenu>
                   <FlatButton label="Update" style={{ float: 'right'}} onTouchTap={ (e) => this.handleDelete(x._id, x.content) }/>
                 
                  </CardActions>
              </Card>
            </ListItem>
          )
      }); 
    	return (
    		<div>
        	<MuiThemeProvider>
            <div>
              <TextField
                floatingLabelText= "Search"
                id="text-field-default"
                value= {this.state.content}
                onChange={ this.updateContent.bind(this) }
                style={{ padding: '20px', width: '95%' }}
              />
        			<List>
        				{holder}
                <ListItem>
        					<AddLog />
        				</ListItem>
        			</List>
        		</div>
          </MuiThemeProvider>
         </div>
    	);
  }
 	
}
      