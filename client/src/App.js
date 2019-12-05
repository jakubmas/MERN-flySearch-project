import React from "react";
import {Provider} from "react-redux";
import store from "./redux/store";

import "./sass/main.scss";

import SearchBox from "./components/FlightsSearch";
import Header from "./components/Header";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />

        {/* <SearchBox /> */}
      </div>
    </Provider>
  );
}

export default App;
