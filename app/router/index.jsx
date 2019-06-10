//Modules
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { checkLoggedIn } from 'app/app';

//Components
// import Error404 from 'app/components/Errors/Error404';
import MainPage from 'MainPage';
import ZWrapper from 'ZWrapper';

import GenerateQR from 'GenerateQR';
import Login from 'Login';

const NoAuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (checkLoggedIn()) ? <Redirect to='/' /> : <Component {...props} />
  )} />
)
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (!checkLoggedIn()) ? <Redirect to='/login' /> : <Component {...props} />
  )} />
)

export default(
  <Router>
    <ZWrapper>
      <Switch>
        <Route exact path='/' component={MainPage}/>
        <AuthRoute exact path='/generate' component={GenerateQR}/>

        <NoAuthRoute exact path='/login' component={Login}/>

        {/* <Route component={Error404} /> */}
      </Switch>
    </ZWrapper>
  </Router>
)
