import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PropsRoute, PrivateRoute } from './routes';

// Services
import UserService from '../services/user';
import PostService from '../services/post';

// Views
import Home from '../views/home';
import HistoryBlock from '../views/historyblock';
import About from '../views/about';
import Prefs from '../views/prefs';
import Login from '../views/login';
import Logout from '../views/logout';
import NewPost from '../views/new-post';
import Post from '../views/post';
import NotFound from '../views/404';

// Components
import Header from './header';
import Footer from './footer';
import Gutter from './gutter';
import PostList from './post-list';

// CSS
import './css/layout.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: UserService.isLoggedIn(),
      meta: []
    }

    this.onUpdateMetadata = this.onUpdateMetadata.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.onUpdateMetadata();
  }

  /**
   * Gets the metadata and updates the state accordingly.
   */
  async onUpdateMetadata() {
    let meta = await PostService.getMetadata();

    this.setState({ meta });
  }

  /**
   * Callback for having successfully logged in.
   */
  onLogin() {
    this.setState({ loggedIn: true });
  }

  /**
   * Callback for having successfully logged out.
   */
  onLogout() {
    this.setState({ loggedIn: false });
  }

  /**
   * @Override
   */
  render() {
    return (
      <BrowserRouter>
        <div className="page">
          <Header />
          <div className="container">
            <Gutter className="left">
              <PostList meta={this.state.meta} />
            </Gutter>
            <article>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/historyblock" component={HistoryBlock} />
                <Route exact path="/about" component={About} />
                <PropsRoute exact path="/login" component={Login} onLoggedIn={this.onLogin} />
                <PropsRoute exact path="/logout" component={Logout} onLoggedOut={this.onLogout} />
                <PrivateRoute exact path="/prefs" component={Prefs} />
                <PrivateRoute exact path="/new-post" component={NewPost} onUpdateMetadata={this.onUpdateMetadata} />
                {/* Dynamic routes must be declared AFTER static routes or they will take precedence */}
                <PropsRoute exact path="/post/:id" component={Post} onUpdateMetadata={this.onUpdateMetadata} />
                {/* Wildcard 404 route */}
                <Route path="*" component={NotFound} />
              </Switch>
            </article>
            <Gutter className="right">
              {/*
                Not a fan of this comment style
              */}
            </Gutter>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}