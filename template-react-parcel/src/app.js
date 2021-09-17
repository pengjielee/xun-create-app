import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Counter from "./pages/counter";
import Intro from "./components/Intro";

import "./assets/styles/base.scss";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/counter">Counter</Link>
      </nav>

      <Intro name="peng" age={20} />
      <br />

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
  );
};

export default App;
