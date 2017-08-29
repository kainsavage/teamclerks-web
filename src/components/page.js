import { Component } from 'react';
import GA from 'react-ga';

// Config
import { production } from '../config/config';

/**
 * Page is a React.Component from which all Page components should inherit.
 * Page overrides `componentDidMount` and `componentDidUpdate` to add analytic
 * tracking to page updates.
 * Note: in order for extensions of Page components to maintain tracking, after
 * extending Page, all calls to `componentDidMount` should call 
 * `super.componentDidMount();` and all calls to `componentDidUpdate` should 
 * call `super.componentDidUpdate(prevProps,prevState);` to ensure tracking is
 * captured.
 */
export default class extends Component {
  constructor(props, title) {
    super(props);
    if (production) {
      GA.initialize('UA-100778358-1');
    }
    this.title = title;
  }

  /**
   * @Override
   */
  componentDidMount() {
    if (this.title !== undefined) {
      document.title = this.title + ' - TeamClerks';
    }
    if (production) {
      GA.set({ page: window.location.pathname });
      GA.pageview(window.location.pathname);
    }
  }

  /**
   * @Override
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.title !== undefined) {
      document.title = this.title + ' - TeamClerks';
    }
    if (production) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        GA.set({ page: window.location.pathname });
        GA.pageview(window.location.pathname);
      }
    }
  }
}