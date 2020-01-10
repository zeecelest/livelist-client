import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    if(TokenService.hasAuthToken()) {
      return (
        <div className="userLogin">
          <span>Welcome back, {this.context.user.name}</span>
          <nav>
            <Link onClick={this.handleLogoutClick} to="/">
              Logout
            </Link>
          </nav>
        </div>
      );
    }
  }

  // renderLoginLink() {
  //   return (
  //     <nav className="signUp-login">
  //       <Link to='/login'>Login</Link>
  //       {' '}
  //       <Link to='/register'>Sign up</Link>
  //     </nav>
  //   )
  // };

  render() {
    return (
      <header className="headerContainer">
        <h4>
          <Link to="/" className="titleLink">
            Social Playlist
          </Link>
        </h4>
        
        {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : ''
            }
      </header>
    );
  }
}

export default Header;
