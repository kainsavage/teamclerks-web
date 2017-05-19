import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/user';

import {formatDate} from '../helpers/date-helper';

import './css/post-list.css';

export default class extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.meta.map( (meta, index) => (
            <li key={index} className="post">
              <Link to={`/post/${meta.id}`}>{meta.title}</Link>
              <span className="created">{formatDate(new Date(meta.created))}</span>
            </li>
          ))}
        </ul>
        { UserService.isLoggedIn() && <Link to="/new-post">New Post</Link> }
      </div>
    );
  }
}