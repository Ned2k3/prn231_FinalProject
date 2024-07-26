import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ component: Component, ...rest }) => {
    const isTokenValid = () => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('authUser');
        
        if (!token || !user) {
          return false; // No token found
        }
        return true
      };

  return (
    <Route
      {...rest}
      render={(props) =>
        isTokenValid() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default GuardedRoute;