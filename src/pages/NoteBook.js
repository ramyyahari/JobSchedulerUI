import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Input from 'muicss/lib/react/input';
import Dropzone from 'react-dropzone';

export default class NoteBook extends React.Component {
 
  onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
 }
}
