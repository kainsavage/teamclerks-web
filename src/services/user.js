import {config} from '../config/config.js';

export default class {

  /**
   * 
   * @param  {String} user 
   * @param  {String} password 
   */
  static async login(user,password) {
    let data = new FormData();
    data.append('lhuser', user);
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
   * 
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
   * 
   */
  static async updatePassword(currentPassword, newPassword) {
    let data = new URLSearchParams();
    data.set('currentPassword', currentPassword);
    data.set('newPassword', newPassword);

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
   * 
   */
  static isLoggedIn() {
    if(localStorage.access_token) {
      return true;
    }
    return false;
  }

  /**
   * 
   */
  static getAuthToken() {
    return localStorage.access_token;
  }
}