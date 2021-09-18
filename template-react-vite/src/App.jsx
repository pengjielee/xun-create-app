import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";

import "./assets/styles/base.scss";
import logo from "./assets/svgs/logo.svg";

const App = () => {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" width="100" />
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/counter">Counter</Link>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/counter">
            <Counter />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
