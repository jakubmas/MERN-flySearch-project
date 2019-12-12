import React, {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Landing from "./components/Landing";
import FlightsSearch from "./components/FlightsSearch";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import ProfileForm from "./components/ProfileForm";
import EditProfile from "./components/ProfileForm/EditProfile";
import Alert from "./components/Alert";

import {Provider} from "react-redux";
import store from "./redux/store";
import {loadUser} from "./redux/actions/auth";

import setAuthToken from "./util/setAuthToken";
import "./sass/main.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <PrivateRoute
              exact
              path="/search-flights"
              component={FlightsSearch}
            />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={ProfileForm}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
