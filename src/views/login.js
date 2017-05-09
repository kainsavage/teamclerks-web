import React, {Component} from 'react';
import UserService from '../services/user';
import { Redirect } from 'react-router-dom';

import './css/login.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.onLoggedIn = props.onLoggedIn;

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      redirect: UserService.isLoggedIn()
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value, errorMessage: ''});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, errorMessage: ''});
  }

  async onSubmit(event) {
    event.preventDefault();

    let success = await UserService.login(this.state.username, this.state.password);
    if(success) {
      this.onLoggedIn();
      this.setState({redirect:true});
    }
    else {
      this.setState({errorMessage: "Invalid Login"});
    }
  }

  render() {
    if(this.state.redirect) {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      return (
        <Redirect to={from}/>
      );
    }

    return (
      <div>
        { this.state.errorMessage && (
          <span>{this.state.errorMessage}</span>
        )}
        <form onSubmit={this.onSubmit}>
          <label>Username: <input type="text" value={this.state.username} onChange={this.handleUsernameChange} /></label>
          <label>Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange} /></label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}