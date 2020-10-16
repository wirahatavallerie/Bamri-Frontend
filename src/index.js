import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Login from './Components/Login'
import Authorization from './Components/Authorization';

import Bus from './Components/Bus';
import CreateBus from './Components/CreateBus'
import UpdateBus from './Components/UpdateBus'

import Driver from './Components/Driver'
import CreateDriver from './Components/CreateDriver'
import UpdateDriver from './Components/UpdateDriver'

import Order from './Components/Order'
import CreateOrder from './Components/CreateOrder'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <PrivateRoute exact path="/login" component={Login}/>
        <Authorization>
          <Switch>
            <Route exact path="/bus" component={Bus} />
            <Route exact path="/bus/create" component={CreateBus} />
            <Route exact path="/bus/:id" component={UpdateBus} />
            <Route exact path="/driver" component={Driver} />
            <Route exact path="/driver/create" component={CreateDriver} />
            <Route exact path="/driver/:id" component={UpdateDriver} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/order/create" component={CreateOrder} />
          </Switch>
        </Authorization>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
