import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import PropTypes from "prop-types";

import { NotificationProvider } from "reusables/NotificationBanner";

// const queryCache = new QueryCache();

const queryClient = new QueryClient();

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

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider config={reactQueryConfig} client={queryClient}>
      <Router>
        <NotificationProvider>{children}</NotificationProvider>
      </Router>
    </QueryClientProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProviders };
