import React, {Component} from 'react';
import PostService from '../services/post';
import UserService from '../services/user';
import NotFound from './404';
import Post from '../models/post';

import './css/post.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:    props.match.params.id,
      post:  new Post(),
      newPost: props.newPost,
      editedPost: null,
      previewPost: null,
      notFound: false,
      errors: []
    };

    this.edit = this.edit.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
  }

  async componentWillMount() {
    if(this.state.newPost) {
      this.edit();
    }
    else {
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

  edit() {
    this.setState({editedPost:Object.assign(new Post(),this.state.post)});
  }

  inputChanged(event) {
    let editedPost = this.state.editedPost;
    editedPost[event.target.name] = event.target.value;
    this.setState({editedPost});
  }

  cancel() {
    this.setState({editedPost:null,errors:[]});
  }

  async save() {
    this.setState({errors:[]});
    let result;
    
    if(this.state.newPost) {
      result = await PostService.newPost(this.state.editedPost);
    }
    else {
      result = await PostService.editPost(this.state.editedPost);
    }

    if(result.errors) {
      this.setState({errors: result.errors});
    }
    else {
      await this.props.onUpdateMetadata();

      this.setState({post:this.state.editedPost,editedPost:null});
    }
  }

  render() {
    if(this.state.notFound) {
      return (
        <NotFound />
      );
    }

    if(UserService.isLoggedIn() && this.state.editedPost) {
      return (
        <div className="postContainer">
          <div className="editView">
            {this.state.errors.map( (error, index) => 
              <div className="errors" key={index}>{error}</div>
            )}
            <input type="text" name="title" value={this.state.editedPost.title} onChange={this.inputChanged} />
            <textarea name="content" value={this.state.editedPost.content} onChange={this.inputChanged}></textarea>
            <div className="controls">
              <button className="cancelButton" onClick={this.cancel}><i className="fa fa-ban" aria-hidden="true"></i> Cancel</button>
              <button className="saveButton" onClick={this.save}><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="postContainer">
        <div className="readView">
          <h1>{this.state.post.title}</h1>
          <div>{this.state.post.content}</div>
        </div>
        {UserService.isLoggedIn() && (
          <a onClick={this.edit} className="editButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
        )}
      </div>
    );
  }
}