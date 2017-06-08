import React from 'react';

import PostService from '../services/post';
import UserService from '../services/user';
import NotFound from './404';
import Post from '../models/post';

import PostView from '../components/post-view';
import PostEditor from '../components/post-editor';

import Page from '../components/page';

import './css/post.css';

export default class extends Page {
  constructor(props) {
    super(props);

    this.state = {
      id:    props.match.params.id,
      post:  new Post(),
      editedPost: null,
      previewPost: null,
      notFound: false
    };

    this.onEdit = this.onEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  /**
   * Gets the post which belongs to the identifier of this page.
   */
  async componentWillMount() {
    try {
      let post = await PostService.getPost(this.state.id);
      this.title = post.title + ' - TeamClerks';
      this.setState({
        post: post,
        notFound: false
      });
    }
    catch(e) {
      this.setState({notFound:true});
    }
  }

  /**
   * Gets the identifier of the next page load and gets the post to which
   * that identifier belongs.
   */
  async componentWillUpdate(nextProps, nextState) {
    if(nextProps.match.params.id !== this.state.id &&
       nextProps.match.params.id !== nextState.id) {
      try {
        let post = await PostService.getPost(nextProps.match.params.id);
        this.title = post.title + ' - TeamClerks';
        this.setState({
          id:    nextProps.match.params.id,
          post:  post,
          notFound: false
        });
      }
      catch(e) {
        this.setState({notFound:true});
      }
    }
  }

  /**
   * Sets state when the edit button is clicked.
   */
  onEdit() {
    this.setState({editedPost:Object.assign(new Post(),this.state.post)});
  }

  /**
   * Sets state when the cancel button is clicked.
   */
  onCancel() {
    this.setState({editedPost:null});
  }

  /**
   * Sets the state after a successful save event to the given post.
   * @param {object} post The post that was successfully saved
   */
  onSave(post) {
    this.setState({post:post,editedPost:null});
  }

  /**
   * @Override
   */
  render() {
    if(this.state.notFound) {
      return (
        <NotFound />
      );
    }

    if(UserService.isLoggedIn() && this.state.editedPost) {
      return (
        <div className="postContainer">
          <PostEditor post={this.state.editedPost} onUpdateMetadata={this.props.onUpdateMetadata} onCancel={this.onCancel} onSave={this.onSave} />
        </div>
      );
    }

    return (
      <div className="postContainer">
        <PostView post={this.state.post} onEdit={this.onEdit} />
      </div>
    );
  }
}