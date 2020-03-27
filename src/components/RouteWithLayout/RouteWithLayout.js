import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from "gatsby"
import { isLoggedIn } from "utils/auth"

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, protect } = props;

  if(protect && !isLoggedIn() && location.pathname !== `app/sign-in`) {
    navigate("app/sign-in")
    return null
  }
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  protect: PropTypes.bool,
};

export default RouteWithLayout;
