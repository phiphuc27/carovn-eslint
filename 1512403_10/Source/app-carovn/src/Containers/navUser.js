import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../Actions';

export class navUser extends Component {
  Logout(event) {
    const { dispatch, history } = this.props;
    event.preventDefault();
    dispatch(logout);
    history.push('/');
  }

  render() {
    const { user } = this.props;
    return (
      <>
        {user ? (
          <div className="nav-account">
            <p style={{ color: 'white', fontSize: '1rem', margin: '0 1em' }}>
              Hello, {user[0].user_name}
            </p>
            <button
              type="button"
              className="btn btn-signup"
              onClick={e => this.Logout(e)}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="nav-account">
            <Link to="/user/register" className="btn btn-signup">
              Sign Up
            </Link>
            <Link to="/user/login" className="btn btn-login">
              Log In
            </Link>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Login.user
});

export default withRouter(connect(mapStateToProps)(navUser));
