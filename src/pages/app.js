import React from "react"
import { Router, Redirect } from "@reach/router"

import { RouteWithLayout } from 'components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';
// import Layout from "components/Layout/Layout";
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from '../views';
import { isLoggedIn } from "utils/auth"

const App = () => {
  return (
      <Router basepath="/app">
        <RouteWithLayout
          component={SignInView}
          layout={MinimalLayout}
          path="/sign-in"
        />
        <Redirect noThrow from="/" to={isLoggedIn() ? "dashboard" : "sign-in"} />
        <RouteWithLayout
          component={DashboardView}
          layout={MainLayout}
          path="/dashboard"
          protect
        />
        <RouteWithLayout
          component={UserListView}
          layout={MainLayout}
          path="/users"
          protect
        />
        <RouteWithLayout
          component={ProductListView}
          // exact
          layout={MainLayout}
          path="/products"
          protect
        />
        <RouteWithLayout
          component={TypographyView}
          // exact
          layout={MainLayout}
          path="/typography"
          protect
        />
        <RouteWithLayout
          component={IconsView}
          // exact
          layout={MainLayout}
          path="/icons"
          protect
        />
        <RouteWithLayout
          component={AccountView}
          // exact
          layout={MainLayout}
          path="/account"
          protect
        />
        <RouteWithLayout
          component={SettingsView}
          // exact
          layout={MainLayout}
          path="/settings"
          protect
        />
        {/* <RouteWithLayout
          component={SignUpView}
          // exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={SignInView}
          // exact
          layout={MinimalLayout}
          path="/sign-in"
        /> */}
        <RouteWithLayout
          component={NotFoundView}
          layout={MinimalLayout}
          path="/404"
        />
      </Router>
  )
}

export default App
