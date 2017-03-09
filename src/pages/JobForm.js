import React from 'react';

import { Toggle } from './';
import { BlastFarm } from './';

export default class JobForm extends React.Component {

	constructor() {
    	super();
    	this.state = {
      		showComponent: false,
      		showBlastFarm: false,
    	};
    }

	componentDidMount() {

    	switch(this.props.choice) {

      	case "blastFarm": {
        	console.log('Option ' + this.props.choice);       
        	this.setState({
          		showBlastFarm: true,
          	});
      	} break;
      
      	case "fastX":  console.log('Option ' + this.props.choice); break;
      
      	case "defaultShell": console.log('Option ' + this.props.choice); break;
      
      	case "opt4": {
        	this.setState({
          		showComponent: true,
          	});
      	} break;        
      
      	case "ls": console.log('Option ' + this.props.choice); break;
    }
  }

  render() {
  	return(   
		<div>      
    	    {this.state.showBlastFarm ? <BlastFarm /> : null}
        	{this.state.showComponent ? <Toggle /> : null}       
        	<br />  
       	</div>
    );
  }
}