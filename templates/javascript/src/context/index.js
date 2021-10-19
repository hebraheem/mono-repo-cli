import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryConfigProvider, QueryCache } from "react-query";
import PropTypes from "prop-types";

import { NotificationProvider } from "reusables/NotificationBanner";

const queryCache = new QueryCache();

const reactQueryConfig = {
  queries: {
    // react query refetches on window focus to avoid
    // stale data, but that doesn't apply to us
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === (404 || 401)) return false;
      if (failureCount < 2) return true;
      return false;
    },
    // Setup for this isn't complete, disabling for now
    // useErrorBoundary: true,
  },
  mutations: {
    // in order to avoid unhandled errors, if all you do
    // is show an alert, using the `error` returned from `useMutation`
    // for example
    throwOnError: false,
  },
};

const AppProviders = ({ children }) => (
  <ReactQueryConfigProvider config={reactQueryConfig} queryCache={queryCache}>
    <NotificationProvider>
      <Router>{children}</Router>
    </NotificationProvider>
  </ReactQueryConfigProvider>
);

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProviders };
