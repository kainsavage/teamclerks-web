import React from 'react';

import Page from '../components/page';

import './css/404.css';

export default class extends Page {
  constructor(props) {
    super(props,'Page Not Found - TeamClerks');
  }

  /**
   * @Override
   */
  render() {
    return(
      <div>404 - Not found!</div>
    );
  }
}