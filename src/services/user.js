import {config} from '../config/config.js';

export default class {
  /**
   * Attempts to log in a user.
   * @param   {string} username The username
   * @param   {string} password The password
   * @returns {Promise<boolean>} A promise that is fulfilled with the value of whether
   *          the user was successfully logged in.
   */
  static async login(username,password) {
    let data = new FormData();
    data.append('lhuser', username);
    data.append('lhpass', password);

    let request = new Request(config.serviceHost + 'login', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json'
      }),
      body: data
    });

    let fetched = await fetch(request);
    let json = await fetched.json();

    if(json['access_token']) {
      localStorage.setItem('access_token',json['access_token']);
      return true;
    }

    return false;
  }

  /**
   * Attempts to log the currently logged-in user out.
   * Note: In reality, simply removing the 'access_token' key from localstorage
   * will successfully log out a user, but there is bookkeeping on the server
   * that is helped (though, not strictly necessary) by this call.
   * @returns {Promise<object>} A promise that is fulfilled with the response
   *          from whether the user was successfully logged out.
   */
  static async logout() {
    let request = new Request(config.serviceHost + 'logout', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.access_token
      })
    });

    await fetch(request);

    if(localStorage.access_token) {
      localStorage.removeItem('access_token');
    }
  }

  /**
   * Gets the currently logged in user's details.
   * @returns {Promise<Object>} A promise that is fulfilled with the details of
   *          the currently logged in user.
   */
  static async getUser() {
    let request = new Request(config.serviceHost + 'user', {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.access_token
      })
    });

    let resp = await fetch(request);

    return await resp.json();
  }

  /**
   * Attempts to update the username of the currently logged in user.
   * @param {string} username The proposed username
   * @returns {Promise<object>} A promise that is fulfilled with the response
   *          from the username update attempt
   */
  static async updateUsername(username) {
    let data = new URLSearchParams();
    data.set('username', username);

    let request = new Request(config.serviceHost + 'user/updateUsername', {
      method: 'PUT',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.access_token
      }),
      body: data
    });
    
    let resp = await fetch(request);

    return await resp.json();
  }

  /**
   * Attempts to update the password of the currently logged in user.
   * @param   {string} currentPassword The current password for this user
   * @param   {string} newPassword The proposed password
   * @param   {string} repeatPassword The new password repeated
   * @returns {Promise<object>} A promise that is fulfilled with the response
   *          from the password update attempt
   */
  static async updatePassword(currentPassword, newPassword, repeatPassword) {
    let data = new URLSearchParams();
    data.set('currentPassword', currentPassword);
    data.set('newPassword', newPassword);
    data.set('repeatPassword', repeatPassword)

    let request = new Request(config.serviceHost + 'user/updatePassword', {
      method: 'PUT',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.access_token
      }),
      body: data
    });

    let resp = await fetch(request);

    return await resp.json();
  }

  /**
   * @returns {boolean} Whether the user is logged in
   */
  static isLoggedIn() {
    if(localStorage.access_token) {
      return true;
    }
    return false;
  }
}