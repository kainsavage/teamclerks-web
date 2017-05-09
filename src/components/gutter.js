import React, {Component} from 'react';

import './css/gutter.css';

export default class extends Component {
  render() {
    return (
      <aside className={this.props.className}>{this.props.children}</aside>
    );
  }
}