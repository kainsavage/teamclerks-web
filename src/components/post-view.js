import React, { Component } from 'react';

import UserService from '../services/user';
import { Markdown } from '../components/markdown';
import { formatDatetime } from '../helpers/date-helper';

import './css/post-view.css';

export default class extends Component {
  /**
   * @Override
   */
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
        <div className="dateBar">
          <span className="created">
            {formatDatetime(new Date(this.props.post.created))}
          </span>
          {this.props.post.created !== this.props.post.updated &&
            <span className="edited">
              (edited {formatDatetime(new Date(this.props.post.updated))})
            </span>
          }
        </div>
        <Markdown content={this.props.post.content} />
      </div>
    );
  }
}