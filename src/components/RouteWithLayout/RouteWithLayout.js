import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from "gatsby"
import { isLoggedIn } from "utils/auth"

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, protect, edit } = props;

  if (protect && !isLoggedIn() && location.pathname !== `app/sign-in`) {
    navigate("app/sign-in")
    return null
  }
 
  return (
    <Layout>
      <Component donorId={props.donorId} edit={edit} />
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
