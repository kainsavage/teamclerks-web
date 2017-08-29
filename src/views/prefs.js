import React from 'react';

import UserService from '../services/user';

import Page from '../components/page';

import './css/prefs.css';

export default class extends Page {
  constructor(props) {
    super(props, 'Preferences');

    this.state = {
      username: '',
      newPassword: '',
      repeatPassword: '',
      currentPassword: '',
      errors: {
        username: [],
        password: []
      }
    }

    this.inputChanged = this.inputChanged.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  async componentWillMount() {
    let user = await UserService.getUser();

    this.setState({ username: user.username });
  }

  /**
   * Controller for managing state of several inputs.
   * @param {object} event The event fired when the value of the input changed
   */
  inputChanged(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    newState.errors = {
      username: [],
      password: []
    };
    this.setState(newState);
  }

  /**
   * Controller for managing the changing of a username.
   * @param {object} event The event fired with the change username button is
   *                       clicked.
   */
  async changeUsername(event) {
    event.preventDefault();

    let resp = await UserService.updateUsername(this.state.username);

    if (resp.errors) {
      let errors = {
        username: resp.errors,
        password: this.state.errors.password
      };
      this.setState({ errors: errors });
    }
  }

  /**
   * Controller for managing the changing of a password.
   * @param {object} event The event fired when the change password button is 
   *                       clicked.
   */
  async changePassword(event) {
    event.preventDefault();

    let resp = await UserService.updatePassword(this.state.currentPassword,
      this.state.newPassword, this.state.repeatPassword);
    if (resp.errors) {
      let errors = {
        password: resp.errors,
        username: this.state.errors.username
      };
      this.setState({ errors: errors });
    }
  }

  /**
   * @Override
   */
  render() {
    return (
      <div>
        <h1>Preferences</h1>
        {this.state.errors.username.map((error, index) => (
          <div key={index} className="row error">
            {error}
          </div>
        ))}
        <div className="row">
          <div className="labels">
            <label>Username:</label>
          </div>
          <div className="controls">
            <input value={this.state.username} name="username" type="text" onChange={this.inputChanged} />
            <button onClick={this.changeUsername}>Update Username</button>
          </div>
        </div>
        {this.state.errors.password.map((error, index) => (
          <div key={index} className="row error">
            {error}
          </div>
        ))}
        <div className="row">
          <div className="labels">
            <label>New Password:</label>
            <label>Repeat Password:</label>
            <label>Current Password:</label>
          </div>
          <div className="controls">
            <input value={this.state.newPassword} name="newPassword" type="password" onChange={this.inputChanged} />
            <input value={this.state.repeatPassword} name="repeatPassword" type="password" onChange={this.inputChanged} />
            <input value={this.state.currentPassword} name="currentPassword" type="password" onChange={this.inputChanged} />
            <button onClick={this.changePassword}>Update Password</button>
          </div>
        </div>
      </div>
    )
  }
}