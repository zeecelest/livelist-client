import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className="userLogin">
        {/* <span>Hello, {this.context.user.name}</span> */}
        <h4>
          <Link onClick={this.handleLogoutClick} className="logoutLink" to="/">
            Logout
          </Link>
        </h4>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav className="signUp-login">
        <Link to="/login">Login</Link>{' '}
        <Link className="signUp-login" to="/register">
          Sign up
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header className="headerContainer">
        <h1 className="brand">
          <Link to="/" className="titleLink">
            Live List
          </Link>
        </h1>
        <nav>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </header>
    );
  }
}

export default Header;
