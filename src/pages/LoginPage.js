import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';

export default class LoginPage extends React.Component {
 constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  handleSubmit = () => {

     fetch('/api/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
      })
    });
     browserHistory.push('/');
  }

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
          <Input hint="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
          <Input type="password" hint="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
          <Button onClick={this.handleSubmit} variant="raised" color="primary">Submit</Button>  
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
