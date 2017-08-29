import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserService from '../services/user';

/**
 * Helper function for merging properties of a component.
 */
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

/**
 * Route-style function for passing properties to the underlying component
 * through the PropsRoute JSX element.
 */
export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => renderMergedProps(component, routeProps, rest)} />
  );
};

/**
 * Route-style function for only being a PropsRoute if the user is logged in.
 * @see UserService.isLoggedIn
 */
export const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return UserService.isLoggedIn() ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
          <Redirect to={{ pathname: redirectTo, state: { from: routeProps.location } }} />
        );
    }} />
  );
};