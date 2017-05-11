import React, {Component} from 'react';

import PostService from '../services/post';
import UserService from '../services/user';
import NotFound from './404';
import Post from '../models/post';

import PostEditor from '../components/post-editor';
import {Markdown} from '../components/markdown';

import './css/post.css';

export default class extends Component {
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

  async componentWillMount() {
    try {
      this.setState({
        post:  await PostService.getPost(this.state.id),
        notFound: false
      });
    }
    catch(e) {
      this.setState({notFound:true});
    }
  }

  async componentWillUpdate(nextProps, nextState) {
    if(nextProps.match.params.id !== this.state.id &&
       nextProps.match.params.id !== nextState.id) {
      try {
        this.setState({
          id:    nextProps.match.params.id,
          post:  await PostService.getPost(nextProps.match.params.id),
          notFound: false
        });
      }
      catch(e) {
        this.setState({notFound:true});
      }
    }
  }

  onEdit() {
    this.setState({editedPost:Object.assign(new Post(),this.state.post)});
  }

  onCancel() {
    this.setState({editedPost:null});
  }

  onSave(post) {
    this.setState({post:post,editedPost:null});
  }

  render() {
    if(this.state.notFound) {
      return (
        <NotFound />
      );
    }

    if(UserService.isLoggedIn() && this.state.editedPost) {
      return (
        <PostEditor post={this.state.editedPost} onUpdateMetadata={this.props.onUpdateMetadata} onCancel={this.onCancel} onSave={this.onSave} />
      );
    }

    return (
      <div className="postContainer">
        <div className="readView">
          <h1>{this.state.post.title}</h1>
          <Markdown content={this.state.post.content}/>
        </div>
        {UserService.isLoggedIn() && (
          <a onClick={this.onEdit} className="editButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
        )}
      </div>
    );
  }
}