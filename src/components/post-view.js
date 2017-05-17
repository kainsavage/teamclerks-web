import React, {Component} from 'react';

import UserService from '../services/user';
import {Markdown} from '../components/markdown';

import './css/post-view.css';

export default class extends Component {
  componentDidMount() {
    if(this.props.post.title) {
      document.title = this.props.post.title + ' - TeamClerks';
    }
  }

  componentDidUpdate() {
    document.title = this.props.post.title + ' - TeamClerks';
  }

  render() {
    return (
      <div className="readView">
        <div className="titleBar">
          <h1>{this.props.post.title}</h1>
          {UserService.isLoggedIn() && this.props.onEdit && (
            <span>
              <a onClick={this.props.onEdit} className="editButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
            </span>
          )}
        </div>
        <Markdown content={this.props.post.content}/>
      </div>
    );
  }
}