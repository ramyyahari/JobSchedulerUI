import React from 'react';
import ReactDOM from 'react-dom';
import { Router, HomeRoute, IndexRoute, Route, browserHistory } from 'react-router';
import { JobSubmission, NoteBook, JobForm, Toggle, MasterPage, IndexPage } from './pages';
import { LoginPage, RegistrationPage, ProfilePage } from './User';

ReactDOM.render(
	<Router history={browserHistory}>
  	<HomeRoute path='/' component={MasterPage}>
  		<IndexRoute path='/login' component={LoginPage} />
  		<Route path='/register' component={RegistrationPage} />
  		<Route path='/profile' component={ProfilePage} />
  		<Route path='/jobform' component={JobForm} />      
      <Route path='/jobsubmission' component={JobSubmission} />      
      <Route path='/notebook' component={NoteBook} />   
      <Route path='/toggle' component={Toggle} />
    </HomeRoute>
	</Router>,
  	document.getElementById('app-container')
);