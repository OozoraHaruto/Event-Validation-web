Boilerplate React App
# Table of Contents
1. Packages
   - [Production](#production)
     - [Compiler](#compiler)
     - [Webpack loaders](#webpack-loaders)
     - [Requests](#requests)
     - [Server](#server)
     - [Database](#database)
     - [Security](#security)
     - [Detectors](#detectors)
     - [Middleware](#middleware)
     - [CSS](#css)
     - [JavaScript](#javascript)
     - [Data getter / Setter](#data-getter-setter)
     - [Debbugging](#debugging)
     - [Icons](#icons)
     - [Extensions](#extensions)
   - [Testing](#testing)
# Packages
## Production
These are the packages that I have used in this Git
### Compiler
#### babel
Babel converts JSX syntax and strip out type annotations
[Website](https://babeljs.io)
#### node-sass
Allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware
[GitHub Project](https://github.com/sass/node-sass)
#### React
A JavaScript library for building user interfaces
[Website](https://reactjs.org)
#### react-dom
The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside of the React model if you need to. Most of your components should not need to use this module.
[Website](https://reactjs.org/docs/react-dom.html)
#### react-redux
Official React bindings for Redux
[GitHub Project](https://github.com/reactjs/react-redux)
#### react-router-dom
Declarative routing for React
[GitHub Project](https://github.com/ReactTraining/react-router)
#### redux
Redux is a predictable state container for JavaScript apps.
[Website](https://redux.js.org)
#### webpack
bundle your scripts, images, styles, assets
[Website](https://webpack.js.org)

### Webpack loaders
#### css-loaders
Loads CSS for webpack
#### sass-loader
Loads sass for webpack
#### script-loader
Loads script for webpack
#### style-loader
Loads style for webpack
#### vue-loader
Loads sass for webpack

### Requests
#### axios
Promise based HTTP client for the browser and node.js
```
import axios from 'axios';
```
[GitHub Project](https://github.com/axios/axios)

### Server
#### express
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
[Website](https://expressjs.com)


### Database
#### bookshelf
Bookshelf is a JavaScript ORM for Node.js, built on the Knex SQL query builder. Featuring both promise based and traditional callback interfaces, providing transaction support, eager/nested-eager relation loading, polymorphic associations, and support for one-to-one, one-to-many, and many-to-many relations.

It is designed to work well with PostgreSQL, MySQL, and SQLite3.
```
var bookshelf = require('./bookshelf.jsx');
```
[Website](bookshelfjs.org)  [GitHub Project](https://github.com/bookshelf/bookshelf)
#### knex
Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects.
[Website](knexjs.org) [GitHub Project](https://github.com/tgriesser/knex)
#### mysql
[Website](https://www.mysql.com)


### Security
#### bcryptjs
Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.
```
var bcrypt = require('bcryptjs');
```
[GitHub Project](https://github.com/dcodeIO/bcrypt.js)
#### node-env-file
Parse and load environment files (containing ENV variable exports) into Node.js environment.
[GitHub](https://github.com/grimen/node-env-file)
#### tai-password-strength
Password Strength is a library that calculates the relative strength of a password. This is accomplished by using several techniques. Primarily this relies on letter trigraphs, which check each set of 3 characters in a given password. More information on the trigraph calculations is available. This also calculates the entropy bits based on Claude Shannon's technique on determining the number of bits required to represent a set of characters and multiplying it by the length of the password. There is also a check to see if a password is contained in a list of common passwords.
[GitHub Project](https://github.com/tests-always-included/password-strength)
#### uuid
Generate RFC-compliant UUIDs in JavaScript
[GitHub Project](https://github.com/kelektiv/node-uuid)

### Detector
#### bowser
Browser detector.
```
import bowser from 'bowser';
```
[GitHub Project](https://github.com/lancedikson/bowser)
#### iplocation
A Node.js module for retrieving a request's IP address on the server.
[GitHub Project](https://github.com/roryrjb/iplocation)

### Middleware
#### redux-thunk
Thunk middleware for Redux
[GitHub Project](https://github.com/gaearon/redux-thunk)

### CSS
#### bootstrap
Sleek, intuitive, and powerful front-end framework for faster and easier web development.
[GitHub Project](https://github.com/twbs/bootstrap#whats-included)

### JavaScript
#### jQuery
Query is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility.
[Website](https://jquery.com)

### Data Getter /Setter
#### moment
Parse, validate, manipulate, and display dates and times in JavaScript
[Website](https://momentjs.com)
#### query-string
Parse and stringify URL
[GitHub Project](https://github.com/sindresorhus/query-string)
#### react-document-meta
HTML meta tags for React-based apps. Works for both client- and server-side rendering, and has a strict but flexible API.
[GitHub Project](https://github.com/kodyl/react-document-meta)

### Debugging
#### redux-devtools-extension
Redux DevTools extension.
[Website](extension.remotedev.io)

### Icons
#### Material ui icons
Material icons are beautifully crafted, delightful, and easy to use in your web, Android, and iOS projects.
```
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
<AccessAlarmIcon />
```
[Website](https://material.io/icons/)
####fontawesome
Get vector icons and social logos on your website with Font Awesome, the web’s most popular icon set and toolkit.
```
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-pro-regular/faHome';
<FontAwesomeIcon icon={faHome}/>
```
OR
app.jsx
```
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-pro-regular';

fontawesome.library.add(brands, regular);
```
component
```
<FontAwesomeIcon icon={["fab", "apple"]}/>
<FontAwesomeIcon icon={["far", "home"]}/>
```
[Website](https://fontawesome.com) [GitHub Project](https://github.com/FortAwesome/react-fontawesome)

### Extensions
#### redux-form
The best way to manage your form state in Redux.
[Website](https://redux-form.com/7.2.3/)
#### react-parallax
A React Component for parallax effect (background image)
[GitHub Project](https://github.com/RRutsche/react-parallax)
#### react-parallax-component
Easiest way to add scroll parallax effect on the component.
[GitHub Project](https://github.com/keske/react-parallax-component)
#### react-typing-animation
A fully-featured typing animation in React that supports any valid JSX.
[GitHub Project](https://github.com/adamjking3/react-typing-animation)

## Testing
#### deep-freeze-strict
recursively Object.freeze() on objects and functions
[GitHub Project](https://github.com/jsdf/deep-freeze)
#### expect
Minimalistic BDD-style assertions for Node.JS and the browser.
[GitHub Project](https://github.com/Automattic/expect.js)
#### karma
The main goal for Karma is to bring a productive testing environment to developers. The environment being one where they don't have to set up loads of configurations, but rather a place where developers can just write the code and get instant feedback from their tests.
[Website](https://karma-runner.github.io/2.0/index.html)
#### karma-chrome-launcher
A Karma plugin. Launcher for Chrome and Chrome Canary.
[GitHub Project](https://github.com/karma-runner/karma-chrome-launcher)
#### karma-mocha
Adapter for the Mocha testing framework.
[GitHub Project](https://github.com/karma-runner/karma-mocha)
#### karma-mocha-reporter
Karma reporter plugin with mocha style logging.
[GitHub Project](https://github.com/litixsoft/karma-mocha-reporter)
#### karma-sourcemap-loader
Karma plugin that locates and loads existing javascript source map files.
[GitHub Project](https://github.com/demerzel3/karma-sourcemap-loader)
#### karma-webpack
Use webpack with karma.
[GitHub Project](https://github.com/webpack-contrib/karma-webpack)
#### mocha
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.
[Website](https://mochajs.org)
#### redux-mock-store
A mock store for your testing your redux async action creators and middleware
[GitHub Project](https://github.com/arnaudbenard/redux-mock-store)
