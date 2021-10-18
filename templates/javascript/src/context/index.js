import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";

import { NotificationProvider } from "reusables/NotificationBanner";

const AppProviders = ({ children }) => (
  <NotificationProvider>
    <Router>{children}</Router>
  </NotificationProvider>
);

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProviders };
