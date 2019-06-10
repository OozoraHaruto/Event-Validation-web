import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class ZWrapper extends React.Component{
  PropTypes = {
    classes: PropTypes.object.isRequired,
  };

  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">Event Validator</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {(!jQuery.isEmptyObject(this.props.auth)) && <NavLink className="nav-link" to="/generate" activeClassName="active">Generate QR</NavLink>}
                {(jQuery.isEmptyObject(this.props.auth)) && <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>}
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {(!jQuery.isEmptyObject(this.props.auth)) && <span className="navbar-text">{this.props.auth.name}</span>}
            </ul>
          </div>
        </nav>
        
        <div style={{ marginTop: '56px' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default withRouter(
  connect((state) => {
    return {
      auth: state.authReducer
    }
  })(ZWrapper)
);