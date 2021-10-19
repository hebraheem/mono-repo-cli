import history from "./history";
import React, { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";

export const PublicPaths = {
  LOGIN: "/login",
};

export const PrivatePaths = {
  INSTITUTIONS: "/institutions",
};

const publicRoutes = [
  /* Add paths for unauthorized users */
];

const privateRoutes = [
  /* Add paths for authorized users */
  {
    path: PrivatePaths.LOGGEDINUSER,
    exact: false,
    component: lazy(() => import("./logged-in-user")),
  },
];

const Routes = () => (
  <Splashscreen>
    <Suspense fallback={"...loading"}>
      <Router history={history}>
        <Switch>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          {privateRoutes.map((route, index) => (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          <Route path="*" component={Redirects} />
        </Switch>
      </Router>
    </Suspense>
  </Splashscreen>
);

export default Routes;
