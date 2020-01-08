import React, { Component } from "react";
import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <>
        <nav role="navigation">
          <ul className="nav-link">
            <li>
              <a href="/login" className="nav-login">
                Log in
              </a>
            </li>
            <li>
              <a href="/register" className="nav-signup">
                Sign up
              </a>
            </li>
          </ul>
        </nav>
        <div className="title">
          <h1>Social Playlist</h1>
        </div>
        <section>
          <p>
            Social Playlist makes it easy for you to find the perfect outing.
            Whether a nite on the town with friends, date night with your love,
            or a day with the family, Social Playlist has what you need!
          </p>
          <p>See what </p>
          <p>placeholder for playlist example</p>
        </section>
      </>
    );
  }
}

export default LandingPage;
