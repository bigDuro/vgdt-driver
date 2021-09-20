import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import DriverBoard from '../containers/DriverBoard';
import LoadDetails from '../containers/LoadDetails';
import AssetManager from '../containers/AssetManager';
import CommonBoard from '../containers/CommonBoard';

export default function RouterComponent(props) {
  const { history } = props
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/vgdt-driver/name/:driver/assets/:table/:id" component={AssetManager} />
          <Route exact path="/vgdt-driver/name/:driver/:table/:id" component={LoadDetails} />
          <Route exact path="/vgdt-driver/name/:driver" component={DriverBoard}/>
          <Route exact path="/vgdt-driver/name/:driver/:table" component={CommonBoard} />
        </Switch>
    </Router>
  );
}
