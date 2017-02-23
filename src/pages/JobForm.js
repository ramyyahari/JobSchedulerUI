import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

export default class JobForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {value: ''};

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  render() {
  return(  
    <Form>
        <legend>Enter job parameters</legend>
        <Input hint="Job Name" />
        <Input hint="Number of nodes" />
        <Input hint="Memory Size" />
        <Input hint="Walltime[hh:mm:ss]" />
        <Textarea hint="Additional Parameters: " />
        <Button color="primary" variant="raised">Submit</Button>
      </Form>
  );
  }
}