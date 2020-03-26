import React from "react"
import { Router } from "@reach/router"

import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';
import Layout from "../components/Layout";
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

const Admin = () => {
  return (
    <Layout>
      <Router basepath="/admin">
        <RouteWithLayout
          component={DashboardView}
          // exact
          layout={MainLayout}
          path="/dashboard"
        />
        <RouteWithLayout
          component={UserListView}
          // exact
          layout={MainLayout}
          path="/users"
        />
        <RouteWithLayout
          component={ProductListView}
          // exact
          layout={MainLayout}
          path="/products"
        />
        <RouteWithLayout
          component={TypographyView}
          // exact
          layout={MainLayout}
          path="/typography"
        />
        <RouteWithLayout
          component={IconsView}
          // exact
          layout={MainLayout}
          path="/icons"
        />
        <RouteWithLayout
          component={AccountView}
          // exact
          layout={MainLayout}
          path="/account"
        />
        <RouteWithLayout
          component={SettingsView}
          // exact
          layout={MainLayout}
          path="/settings"
        />
        <RouteWithLayout
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
        />
        <RouteWithLayout
          component={NotFoundView}
          // exact
          layout={MinimalLayout}
          path="/not-found"
        />
      </Router>
    </Layout>
  )
}