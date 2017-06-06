import React, {Component} from 'react';
import UserService from '../services/user';
import { Redirect } from 'react-router-dom';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }

    this.onLoggedOut = props.onLoggedOut;

    this.logout();
  }

  /**
   * Sets state when the logout route is visited.
   */
  async logout() {
    if(UserService.isLoggedIn()) {
      await UserService.logout();
    }

    this.setState({redirect:true});
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
      // Deliberately empty - always redirects after initial render
      <span></span>
    );
  }
}