import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import CommonBoard from '../containers/CommonBoard';
import DriverBoard from '../containers/DriverBoard';
import LoadDetails from '../containers/LoadDetails';
import AssetManager from '../containers/AssetManager';

export default function RouterComponent(props) {
  const { history } = props
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/vgdt-driver/assets/:table/:id" component={AssetManager} />
          <Route exact path="/vgdt-driver/:table" component={CommonBoard} />
          <Route exact path="/vgdt-driver/name/:driver" component={DriverBoard} />
          <Route exact path="/vgdt-driver/name/:driver/load/:id" component={LoadDetails} />
        </Switch>
    </Router>
  );
}
