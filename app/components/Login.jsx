import React from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import bcrypt from 'bcryptjs';

import UserLoginForm from 'app/components/forms/LoginForm';
import { startLogin, startAddSession } from 'actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  addSession = (username) => {
    var { history, dispatch }   = this.props;
    var session                 = { name: username };

    if (dispatch(startAddSession(session))){
      history.replace({ pathname: '/' });
    }else{
      history.push({ pathname: '/error/1010' });
    }
  }

  handleUserLogin = (values, formikBag) => {
    var {username, password}    = values
    var userPassword            = startLogin(username)

    if (userPassword) {
      if (bcrypt.compareSync(password, userPassword)) { // verify password
        this.addSession(username);
      } else {
        formikBag.setErrors({ password: "Password does not match with what we have" })
      }
    } else {
      formikBag.setErrors({ username: "There is no such account registered with us" })
    }
  }

  render() {
    var meta = {
      title: "Login"
    }

    return (
      <DocumentMeta {...meta}>
        <div className="container-fluid p-0">
          <div className="d-flex wholePageWithNav justify-content-center align-items-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-12">
              <UserLoginForm handleFormSubmission={this.handleUserLogin} />
            </div>
          </div>
        </div>
      </DocumentMeta>
    )
  }
}

export default connect()(Login);