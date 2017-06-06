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

    this.inputChanged = this.inputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Sets the title of the page.
   */
  componentDidMount() {
    document.title = 'Login - TeamClerks';
  }

  /**
   * Controller for managing state of several inputs.
   * @param {object} event The event that is fired when an input value changes
   */
  inputChanged(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    newState.errors = [];
    this.setState(newState);
  }

  /**
   * Controller for managing the logging in of a user.
   * @param {*} event The event fired when the login form is submitted
   */
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

  /**
   * @Override
   */
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
          <label>Username: <input name="username" type="text" value={this.state.username} onChange={this.inputChanged} /></label>
          <label>Password: <input name="password" type="password" value={this.state.password} onChange={this.inputChanged} /></label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}