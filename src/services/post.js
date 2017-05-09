import {config} from '../config/config.js';
import Post from '../models/post.js';

export default class {
  
  /**
   * 
   */
  static async getPosts() {
    let posts = [];

    let response = await fetch(new Request(config.service + 'posts'));
    let json = await response.json();

    json.forEach( (data) => {
      posts.push(new Post(data));
    });

    return posts;
  }

  /**
   * 
   */
  static async getMetadata() {
    let metas = [];

    let response = await fetch(new Request(config.serviceHost + 'posts/metadata'));
    let json = await response.json();

    json.forEach( (data) => {
      metas.push(new Post(data));
    });

    return metas;
  }

  /**
   * 
   * @param {Number} id 
   */
  static async getPost(id) {
    let response = await fetch(new Request(config.serviceHost + 'posts/' + id));
    let json = await response.json();
    
    return new Post(json);
  }

  /**
   * 
   * @param {Object} post 
   */
  static async editPost(post) {
    let data = new URLSearchParams();
    data.set('title', post.title);
    data.set('content', post.content);

    let response = await fetch(new Request(config.serviceHost + 'posts/' + post.id, {
      method: 'PUT',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.access_token
      }),
      body: data
    }));

    return new Post(await response.json());
  }

  static async newPost(post) {
    let data = new URLSearchParams();
    data.set('title', post.title);
    data.set('content', post.content);

    let response = await fetch(new Request(config.serviceHost + 'posts'), {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.access_token
      }),
      body: data
    });

    return new Post(await response.json());
  }
}