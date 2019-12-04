import React from "react";
import {Provider} from "react-redux";
import store from "./redux/store";

import "./App.css";

import SearchBox from "./components/FlightsSearch";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchBox />
      </div>
    </Provider>
  );
}

export default App;
