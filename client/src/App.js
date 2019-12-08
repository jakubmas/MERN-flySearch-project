import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Landing from "./components/Landing";
import FlightsSearch from "./components/FlightsSearch";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import store from "./redux/store";

import "./sass/main.scss";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Router>
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/search-flights" component={FlightsSearch} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
