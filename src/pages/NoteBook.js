import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardMedia, CardTitle , CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

import TextField from 'material-ui/TextField';
import { IconButton } from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';

import { AddLog } from './';

export default class NoteBook extends React.Component {

	constructor() {
     super();
     this.state = {
    	array: [],
      content: '',
    };
  } 
	
	componentDidMount() {
		fetch('/api/comments').then(function(response){
    		return response.json();
    	}).then(function(j) {
			this.setState({array: j});
			//console.log(this.state.array);
		}.bind(this))
		.catch((e) => {
    		console.log(e);
    	});    

	}

  updateContent( e ) {
    var lowerCase = e.target.value;
    this.setState({
      content: lowerCase.toLowerCase()
    })
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
      username: name
      })
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
          return(
            <ListItem key = {x._id}>
              <Card>
                <CardHeader
                    title= {x.username}
                    avatar= "https://goo.gl/ims56t" 
                  />
                  <CardMedia 
                    overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
                    <img src="https://goo.gl/YFP8Sy" />
                  </CardMedia>
                  <CardTitle title= {x.title} subtitle={x.date} />
                <CardText>
                  { x.content}
                  <br/>
                  {x.files}
                </CardText>
                <CardActions>
                    <FlatButton label="Download files"/>
                    <FlatButton label="Delete" onTouchTap={ (e) => this.handleDelete(x._id, x.username) }/>
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
      