import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import Button from "../Button/Button";
import "./RegistrationForm.css";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  firstInput = React.createRef();

  renderOptions = () => {
    let stateAbr = [
      "AL",
      "AK",
      "AS",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FM",
      "FL",
      "GA",
      "GU",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MH",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "MP",
      "OH",
      "OK",
      "OR",
      "PW",
      "PA",
      "PR",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VI",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY"
    ];

    return stateAbr.map(state => {
      return (
        <option key={state} value={state}>
          {state}
        </option>
      );
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, username, locationCity, locationState, password } = ev.target;
    if (locationState.value === "") {
      return this.setState({ error: "Please select a state." });
    }
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      city: locationCity.value,
      state: locationState.value,
      password: password.value
    })
      .then(user => {
        name.value = "";
        username.value = "";
        locationCity.value = "";
        locationState.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="registerForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <Label htmlFor="registration-name-input">
            Enter your name
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            required
          />
        </div>
        <div>
          <Label htmlFor="registration-username-input">
            Choose a username
            <Required />
          </Label>
          <Input id="registration-username-input" name="username" required />
        </div>
        <div>
          <Label htmlFor="registration-locationCity-input">
            City
            <Required />
          </Label>
          <Input
            id="registration-locationCity-input"
            name="locationCity"
            required
          />
        </div>
        <div className='stateContainer'>
          <Label htmlFor="registration-locationState-input">
            State
            <Required />          
          </Label>
<select className="locationState" name="locationState">
            <option key="none" defaultValue=""></option>
            {this.renderOptions()}
          </select>
        </div>
        <div>
          <Label htmlFor="registration-password-input">
            Choose a password
            <Required />
          </Label>
          <Input
            id="registration-password-input"
            name="password"
            type="password"
            required
          />
        </div>

        <footer className="signupBtnLink">
          <Button type="submit">Sign up</Button> <br />{" "}
          <Link to="/login">Already have an account?</Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;
