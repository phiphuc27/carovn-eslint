import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { logout } from '../Actions';

export class navUser extends Component {
  Logout(event) {
    const { dispatch, history } = this.props;
    event.preventDefault();
    window.sessionStorage.removeItem('jwtToken');
    dispatch(logout);
    history.push('/');
  }

  render() {
    const { user } = this.props;
    return (
      <>
        {user ? (
          <div className="nav-account">
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-dropdown" id="dropdown-basic">
                <img src={user.avatarURL} alt="avatar" />
                {user.first_name} {user.last_name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link to="/user/profile" className="dropdown-item">
                  Profile
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={e => this.Logout(e)}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
