import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardMedia, CardTitle , CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

import { AddLog } from './';

export default class NoteBook extends React.Component {

	constructor() {
     super();
     this.state = {
    	array: []
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

  	render() {
  		var temp = this.state.array.map( (x) => {
  			return(
  					<ListItem>
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
     						</CardText>
     						<CardActions>
      							<FlatButton label="Delete" />
     						</CardActions>
  						</Card>
  					</ListItem>
  				)
  		}); 
    	return (
    		<div>
        		<MuiThemeProvider>
        			<List>
        				{temp}
        				<ListItem>
        					<AddLog />
        				</ListItem>
        			</List>
        		</MuiThemeProvider>
         	</div>
    	);
 	}
}
      