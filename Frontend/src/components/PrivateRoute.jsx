import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login status

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // Redirect to login if not logged in
        )
      }
    />
  );
};

export default PrivateRoute;
