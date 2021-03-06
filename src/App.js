import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./pages/admin/admin";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Print from "./pages/print/Print";

/**
 * 应用根组件
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/print/:id" component={Print}></Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
