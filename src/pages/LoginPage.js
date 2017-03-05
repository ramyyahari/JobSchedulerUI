import React from 'react';
import DocumentTitle from 'react-document-title';
import { LoginForm, NotAuthenticated } from 'react-stormpath';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';

export default class LoginPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`Login`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Login</h3>
              <hr />
            </div>
          </div>
          <LoginForm />
          <div className="row">
            <div className="col-md-2 col-md-offset-5">
              <Link to="/register"> Create account </Link>
            </div>
          </div>  
        </div>
      </DocumentTitle>
    );
  }
}
