import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import PostCard from "../Card/PostCard";

import { UNAUTH_LOGIN_PATH } from "../../constants/routeConstants";
import Login from "../UnAuth/Login";
export default function LandingPage() {
  return (
    <>
      <div>
        <h1>This is unauth home page.</h1>
        <Link to="/login">Login</Link>
      </div>
      <Switch>
        <Route path={UNAUTH_LOGIN_PATH} exact>
          {(props) => <Login {...props} />}
        </Route>
      </Switch>
    </>
  );
}
