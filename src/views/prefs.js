import React, {Component} from 'react';

import UserService from '../services/user';

import './css/prefs.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: '',
      repeatPassword: '',
      currentPassword: '',
      errors: []
    }

    this.inputChanged = this.inputChanged.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  inputChanged(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    newState.errors = [];
    this.setState(newState);
  }

  async changePassword(event) {
    event.preventDefault();

    if(this.state.newPassword === this.state.repeatPassword &&
       this.state.newPassword !== '' &&
       this.state.repeatPassword !== '' &&
       this.state.currentPassword !== '') {
      let resp = await UserService.updatePassword(this.state.currentPassword, this.state.newPassword);
      if(resp.errors) {
        this.setState({errors: resp.errors});
      }
    }
  }

  render() {
    return(
      <div>
        <h1>Preferences</h1>

        <form onSubmit={this.changePassword}>
          { this.state.newPassword !== this.state.repeatPassword && 
          <div className="row error">
            New Password and Repeat Password must match
          </div>
          }
          { this.state.errors.map( (error,index) => (
            <div key={index} className="row error">
              {error}
            </div>
          )) }
          <div className="row">
            <div className="labels">
              <label>New Password:</label>
              <label>Repeat Password:</label>
              <label>Current Password:</label>
            </div>
            <div className="passwordControls">
              <input value={this.state.newPassword} name="newPassword" type="password" onChange={this.inputChanged} />
              <input value={this.state.repeatPassword} name="repeatPassword" type="password" onChange={this.inputChanged} />
              <input value={this.state.currentPassword} name="currentPassword" type="password" onChange={this.inputChanged} />
            </div>
          </div>
          <div className="row">
            <input name="submit" type="submit" value="Update Password" />
          </div>
        </form>
      </div>
    )
  }
}