import React, { Component } from 'react';

import './css/404.css';

export default class extends Component {
  /**
   * Sets the title of the page.
   */
  componentDidMount() {
    document.title = 'Page Not Found - TeamClerks';
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