import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Landing from "./components/Landing";
import FlightsSearch from "./components/FlightsSearch";

import store from "./redux/store";

import "./sass/main.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/search-flights" component={FlightsSearch} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
