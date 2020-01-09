import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

class Header extends Component {
    static contextType = UserContext;

    handleLogoutClick = () => {
        this.context.processLogout()
      };
    
      renderLogoutLink() {
        return (
          <div className="userLogin">
            <span>
              Hello, {this.context.user.name}
            </span>
            <nav>
              <Link
                onClick={this.handleLogoutClick}
                to='/'>
                Logout
              </Link>
            </nav>
          </div>
        )
      };
    
      renderLoginLink() {
        return (
          <nav className="signUp-login">
            <Link to='/login'>Login</Link>
            {' '}
            <Link to='/register'>Sign up</Link>
          </nav>
        )
      };
    
      render() {
        return (
          <header>
            <h4>
                <Link to='/'>
                    Social Playlist
                </Link>
            </h4>

          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()
            }
      </header>
    );
  };
};

export default Header;