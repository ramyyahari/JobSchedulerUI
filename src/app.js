import ReactStormpath, { Router, HomeRoute, LoginRoute, LogoutLink, AuthenticatedRoute } from 'react-stormpath';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { JobSubmission, NoteBook, JobForm, Toggle, MasterPage, IndexPage, LoginPage, RegistrationPage, ProfilePage } from './pages';


ReactStormpath.init();

ReactDOM.render(
	<Router history={browserHistory}>
  	<HomeRoute path='/' component={MasterPage}>
  		<IndexRoute component={IndexPage} />
  		<LoginRoute path='/login' component={LoginPage} />
  		<Route path='/register' component={RegistrationPage} />
  		<Route path='/profile' component={ProfilePage} />
  		<Route path='/jobform' component={JobForm} />      
      <Route path='/jobsubmission' component={JobSubmission} />      
      <Route path='/notebook' component={NoteBook} />   
      <Route path='/logout' component={LogoutLink} />    
      <Route path='/toggle' component={Toggle} />
      <AuthenticatedRoute>	
        <HomeRoute path='/' component={IndexPage} />
      </AuthenticatedRoute>	
  	</HomeRoute>
	</Router>,
  	document.getElementById('app-container')
);