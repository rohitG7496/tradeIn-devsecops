import React, { Component } from "react";
import Root from "./Root";
import { BrowserRouter as Router } from "react-router-dom";
import { BreakpointProvider } from "react-socks";
import { Provider } from "react-redux";
import store from "./redux/store";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <BreakpointProvider>
            <Root />
          </BreakpointProvider>
        </Provider>
      </Router>
    );
  }
}
