import React, { Component } from 'react';

import './css/404.css';

export default class extends Component {

  componentDidMount() {
    document.title = 'Page Not Found - TeamClerks';
  }

  render() {
    return(
      <div>404 - Not found!</div>
    );
  }
}