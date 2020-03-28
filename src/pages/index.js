import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { Router, Redirect } from "@reach/router"
import {isLoggedIn} from "utils/auth"

export default () => {
  // useEffect(() => {
  //   navigate('/app/');
  // }, []);
  return (
    <Router>
      <Redirect noThrow from="/" to={isLoggedIn() ? "app/dashboard" : "app/sign-in"}/>
    </Router>
  )
};
