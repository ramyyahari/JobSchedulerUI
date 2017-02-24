import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { JobSelection, JobForm, Toggle, MasterPage, IndexPage, LoginPage, RegistrationPage, ProfilePage } from './pages';

ReactStormpath.init();

ReactDOM.render(
	<Router history={browserHistory}>
  	<HomeRoute path='/' component={MasterPage}>
  		<IndexRoute component={IndexPage} />
  		<LoginRoute path='/login' component={LoginPage} />
  		<Route path='/register' component={RegistrationPage} />
  		<Route path='/profile' component={ProfilePage} />
  		<AuthenticatedRoute>	
        <HomeRoute path='/jobform' component={JobForm} />
  		</AuthenticatedRoute>	
  	</HomeRoute>
	</Router>,
  	document.getElementById('app-container')
);