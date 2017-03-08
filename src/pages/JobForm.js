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
    this.onChange = this.onChange.bind(this);
    this.clicked = this.clicked.bind(this);
  }