import React from 'react';

import PostService from '../services/post';
import PostView from '../components/post-view';
import Post from '../models/post';
import Page from '../components/page';

import './css/home.css';

export default class extends Page {
  constructor(props) {
    super(props, 'Home - TeamClerks');

    this.state = {
      post: new Post()
    }
  }

  /**
   * Gets the latest post and sets state accordingly.
   */
  async componentWillMount() {
    this.setState({
      post:  await PostService.getLatestPost()
    });
  }

  /**
   * @Override
   */
  render() {
    return (
      <div className="postContainer">
        <PostView post={this.state.post} />
      </div>
    );
  }
}