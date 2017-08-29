import React, { Component } from 'react';

import PostView from './post-view';
import PostService from '../services/post';

import './css/post-editor.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: Object.assign({}, this.props.post),
      preview: false,
      errors: []
    };

    this.inputChanged = this.inputChanged.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  /**
   * Controller for managing state of several inputs.
   * @param {object} event The event fired when the value of the input changed
   */
  inputChanged(event) {
    let post = this.state.post;
    post[event.target.name] = event.target.value;
    this.setState({ post });
  }

  /**
   * Controller for managing the saving of a post
   * @param {object} event The event fired when the edit post form is 
   *                       submitted.
   */
  async onSave() {
    this.setState({ errors: [] });
    let result;

    if (this.props.post.id === 0) {
      result = await PostService.newPost(this.state.post);
    }
    else {
      result = await PostService.editPost(this.state.post);
    }

    if (result.errors) {
      this.setState({ errors: result.errors });
    }
    else {
      await this.props.onUpdateMetadata();

      let post = this.state.post;
      post.id = result;

      this.props.onSave(post);
    }
  }

  /**
   * Event that is fired when the preview button is pressed.
   */
  onPreview() {
    this.setState({ preview: true });
  }

  /**
   * Event that is fired when the edit button is pressed.
   */
  onEdit() {
    this.setState({ preview: false });
  }

  /**
   * @Override
   */
  render() {
    if (this.state.preview) {
      return (
        <div className="editView">
          <PostView post={this.state.post} />
          <div className="controls">
            <button className="cancelButton" onClick={this.onEdit}><i className="fa fa-ban" aria-hidden="true"></i> Cancel</button>
          </div>
        </div>
      );
    }
    return (
      <div className="editView">
        {this.state.errors.map((error, index) =>
          <div className="errors" key={index}>{error}</div>
        )}
        <input type="text" name="title" value={this.state.post.title} onChange={this.inputChanged} />
        <textarea name="content" value={this.state.post.content} onChange={this.inputChanged}></textarea>
        <div className="controls">
          <button className="previewButton" onClick={this.onPreview}><i className="fa fa-eye" aria-hidden="true"></i> Preview</button>
          <button className="cancelButton" onClick={this.props.onCancel}><i className="fa fa-ban" aria-hidden="true"></i> Cancel</button>
          <button className="saveButton" onClick={this.onSave}><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
        </div>
      </div>
    );
  }
}