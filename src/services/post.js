import { config } from '../config/config.js';
import Post from '../models/post.js';

export default class {

  /**
   * Gets the default list of posts.
   * @returns {Promise<Post[]>} A promise which is fulfilled with an array
   *          of Posts.
   */
  static async getPosts() {
    let posts = [];

    let response = await fetch(new Request(config.serviceHost + 'posts'));
    let json = await response.json();

    json.forEach((data) => {
      posts.push(new Post(data));
    });

    return posts;
  }

  /**
   * Get the latest post.
   * @returns {Promise<Post>} A promise which is fulfilled with the latest Post
   */
  static async getLatestPost() {
    let response = await fetch(new Request(config.serviceHost + 'posts/latest'));
    return new Post(await response.json());
  }

  /**
   * Gets the metadata for the most recent posts.
   * @returns {Promise<object[]>} A promise which is fulfilled with an array of
   *          objects containing the metadata of the most recent posts
   */
  static async getMetadata() {
    let metas = [];

    let response = await fetch(new Request(config.serviceHost + 'posts/metadata'));
    let json = await response.json();

    json.forEach((data) => {
      metas.push(new Post(data));
    });

    return metas;
  }

  /**
   * Attempts to get a post by its identifier.
   * @param   {number} id The identifier of a specific post
   * @returns {Promise<Post>} A promise which is fulfilled with the Post 
   *          identified by the given identifier
   */
  static async getPost(id) {
    let response = await fetch(new Request(config.serviceHost + 'posts/' + id));
    let json = await response.json();

    return new Post(json);
  }

  /**
   * Attempts to edit the given post.
   * @param   {Post} post The post to edit
   * @returns {Promise<object>} A promise which is fulfilled with the response
   *          of the attempt to edit the given post
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

    return await response.json();
  }

  /**
   * Attempts to create a new post.
   * @param   {Post} post The post to create
   * @returns {Promise<object>} A promise which is fulfilled with the response
   *          of the attempt to edit the given post
   */
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

    return await response.json();
  }
}