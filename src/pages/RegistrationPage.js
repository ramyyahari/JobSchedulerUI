import React from 'react';
import DocumentTitle from 'react-document-title';

import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import {browserHistory} from 'react-router';

export default class RegistrationPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
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
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
      })
    });
     browserHistory.push('/login');
  }

  render() {
    return (
      <DocumentTitle title={`Registration`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Registration</h3>
              <hr />
            </div>
          </div>
          <Input hint="Firstname" value={this.state.firstName} onChange={this.handleChange.bind(this, 'firstName')}/>
          <Input hint="Lastname" value={this.state.lastName} onChange={this.handleChange.bind(this, 'lastName')}/>
          <Input hint="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
          <Input type="password" hint="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
          <Button onClick={this.handleSubmit} variant="raised" color="primary">Submit</Button>  
        </div>
      </DocumentTitle>
    );
  }
}
