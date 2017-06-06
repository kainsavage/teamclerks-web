import React, {Component} from 'react';

import PostService from '../services/post';
import PostView from '../components/post-view';
import Post from '../models/post';

import './css/home.css';

export default class extends Component {
  constructor(props) {
    super(props);

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
   * Sets the title of the page.
   */
  componentDidMount() {
    document.title = 'Home - TeamClerks';
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