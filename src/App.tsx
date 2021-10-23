import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Photos } from "./components/Photos";
import "./Modal.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Photos} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };
