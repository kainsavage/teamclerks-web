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

  onCancel() {
    this.setState({redirect:"/"});
  }

  onSave(post) {
    this.setState({redirect:`/post/${post.id}`});
  }

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