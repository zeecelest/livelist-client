import React, { Component } from 'react';
import './LandingPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import exampleImg from '../Assets/iconBackground.png';
import Button from '../Button/Button';
import config from '../../config';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}`)
      .then((x) => x.json())
      .then((res) => console.log());
  }
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  renderLoginForm() {
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <div className="mobile-view" id="loginFormContainer">
          <a href="/login" className="nav-login">
            Log in
          </a>
          <a href="/register" className="nav-signup">
            Sign up
          </a>
        </div>
      );
    } else {
      return <LoginForm />;
    }
  }

  render() {
    return (
      <>

        <section className="descContainer">
          <p className="descBody">
            Visiting a new city and not sure what to do? <em className="duke">Live List</em> is where to go to get 
            in the know with the <b>locals</b>.  Find out what's going on in a city by connecting 
            with the people who know best.  Search <em className="duke">'Hot Lists'</em> for the best options for food, 
            drinks, dancing, and more. <em className="duke">Live List</em> provides you with customizable lists from 
            users who have the inside track on what's going on in their cities. </p>
            <h2 className="kicker">Live like the locals with <em className="duke">LIVE LIST!</em></h2>
          <div>{this.renderLoginForm()}</div>
        </section>
      </>
    );
  }
}

export default LandingPage;
