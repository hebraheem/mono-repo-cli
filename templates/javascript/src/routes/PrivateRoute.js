import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "utils/auth";
import { PublicPaths } from "./index";

const PrivateRoute = ({ component: Component, shouldRedirect, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const content = isAuthenticated() ? (
          <Component />
        ) : shouldRedirect !== false ? (
          <Redirect
            to={{
              pathname:
                PublicPaths.LOGIN /* Path to redirect to when an unauthorized user tries to access a protected route */,
              state: { from: props.location },
            }}
          />
        ) : null;
        return content;
      }}
    />
  );
};

export default PrivateRoute;
