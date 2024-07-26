import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./Authentication/Login/Login";
import Register from "./Authentication/Register/Register";
import Home from "./Home/Home";
import Logout from './Authentication/Logout'
import GuardedRoute from "./Authentication/Guard";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <GuardedRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
