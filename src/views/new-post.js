import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Post from '../models/post';
import PostEditor from '../components/post-editor';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: new Post(),
      redirect: false
    }

    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  /**
   * Sets the title of the page.
   */
  componentDidMount() {
    document.title = 'New Post - TeamClerks';
  }

  /**
   * Sets state when the cancel button is pressed.
   */
  onCancel() {
    this.setState({redirect:"/"});
  }

  /**
   * Sets the state when a post is successfully saved.
   * @param {object} post The post which was saved
   */
  onSave(post) {
    this.setState({redirect:`/post/${post.id}`});
  }

  /**
   * @Override
   */
  render() {
    if(this.state.redirect) {
      return (
        <Redirect to={this.state.redirect} />
      );
    }

    return (
      <PostEditor post={this.state.post} onUpdateMetadata={this.props.onUpdateMetadata} onCancel={this.onCancel} onSave={this.onSave} />
    );
  }
}