//Modules
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// Personal Modules
// import {startGetUserSession} from 'app/actions/account'
import Router from 'app/router/';

//App CSS
require('applicationStyles');

//App JS
require('myJS/all.jsx');


// For react-redux
import {configure} from 'configureStore';
var store = configure();

// Check for user logged in
export var checkLoggedIn = () =>{ //return if user is logged in
  return !jQuery.isEmptyObject(store.getState().authReducer);
}

//render
ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('app')
);
