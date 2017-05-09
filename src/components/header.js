import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/user';

import './css/header.css';

export default class extends Component {
  render() {
    return (
      <header>
        <nav>
          { !UserService.isLoggedIn() && 
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          }
          { UserService.isLoggedIn() &&
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/post/new">New Post</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          }
        </nav>
      </header>
    );
  }
}