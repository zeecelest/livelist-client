import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingRoute from '../../routes/LandingRoute/LandingRoute';
import UserDashboardRoute from '../../routes/UserDashboard/UserDashboardRoute';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import ListPage from '../../routes/ListPage/ListPage';
import NewPlaylistRoute from '../../routes/NewPlaylistRoute/NewPlaylistRoute';
import NewSpotRoute from '../../routes/NewSpotRoute/NewSpotRoute';
import UpdateSpotPage from '../../components/UpdateSpot/UpdateSpot';
import UpdateListPage from '../../components/UpdateList/UpdateList';
import './App.css';

export default class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    return (
      <div className="App">
        <Header />
        <main>
          {hasError && <p>There was an error! Oh no!</p>}
          <Switch>
            <PublicOnlyRoute path={'/register'} component={RegistrationRoute} />
            <PublicOnlyRoute exact path={'/'} component={LandingRoute} />
            <PrivateRoute
              exact
              path={'/dashboard'}
              component={UserDashboardRoute}
            />
            <PrivateRoute
              exact
              path={'/newlist'}
              component={NewPlaylistRoute}
            />
            <PublicOnlyRoute path={'/login'} component={LoginRoute} />
            <PrivateRoute exact path="/newSpot" component={NewSpotRoute} />
            <PrivateRoute exact path="/updateSpot/:id" component={UpdateSpotPage} />
            <PrivateRoute exact path="/updateList/:id" component={UpdateListPage} />
            <PrivateRoute path="/list/:id" component={ListPage} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
