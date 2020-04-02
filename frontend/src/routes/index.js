import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Delivery from '../pages/Delivery';
import DeliveryList from '../pages/Delivery/List';
import DeliveryEdit from '../pages/Delivery/Edit';
import Deliveryman from '../pages/Deliveryman';
import DeliverymanList from '../pages/Deliveryman/List';
import DeliverymanEdit from '../pages/Deliveryman/Edit';
import Recipient from '../pages/Recipient';
import RecipientList from '../pages/Recipient/List';
import RecipientEdit from '../pages/Recipient/Edit';
import DeliveryProblem from '../pages/DeliveryProblem';
import DeliveryProblemList from '../pages/DeliveryProblem/List';
import DeliveryProblemEdit from '../pages/DeliveryProblem/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/delivery" exact component={Delivery} isPrivate />
      <Route path="/delivery/list" exact component={DeliveryList} isPrivate />
      <Route
        path="/delivery/edit/:id"
        exact
        component={DeliveryEdit}
        isPrivate
      />
      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/list"
        exact
        component={DeliverymanList}
        isPrivate
      />
      <Route
        path="/deliveryman/edit/:id"
        exact
        component={DeliverymanEdit}
        isPrivate
      />
      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route path="/recipient/list" exact component={RecipientList} isPrivate />
      <Route
        path="/recipient/edit/:id"
        exact
        component={RecipientEdit}
        isPrivate
      />
      <Route
        path="/deliveryProblem"
        exact
        component={DeliveryProblem}
        isPrivate
      />
      <Route
        path="/deliveryProblem/list"
        component={DeliveryProblemList}
        isPrivate
      />
      <Route
        path="/deliveryProblem/edit/:id"
        component={DeliveryProblemEdit}
        isPrivate
      />

      {/* <Route path="/" component={ () => <h1>404</h1> } /> */}
    </Switch>
  );
}
