import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/user';

import './css/header.css';

export default class extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          { UserService.isLoggedIn() && <Link to="/logout">Logout</Link> }
          { UserService.isLoggedIn() && <Link to="/prefs">Preferences</Link> }
          { !UserService.isLoggedIn() && <Link to="/login">Login</Link>  }
        </nav>
      </header>
    );
  }
}