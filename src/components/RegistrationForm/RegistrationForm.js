import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import possibleLocations from '../Assets/possibleLocations';
import states from '../Assets/states';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = {
    error: null,
    state: { value: '', selected: false },
    city: '',
    cities: []
  };

  generateStateOptions = () => {
    return states.map((item) => item.name);
  };

  onSelectStateChange = (ev) => {
    let cities = possibleLocations[ev.target.value];
    this.setState({
      state: {
        selected: true,
        value: ev.target.value
      },
      cities: cities.sort()
    });
  };

  onSelectCityChange = (ev) => {
    this.setState({
      city: ev.target.value
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    let name = document.getElementsByName('name')[0];
    let username = document.getElementsByName('username')[0];
    let password = document.getElementsByName('password')[0];
    let city = this.state.city;
    let state = this.state.state.value;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      city: city,
      state: state,
      password: password.value
    })
      .then((user) => {
        name.value = '';
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="registerForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <TextInput
            label="Enter your name"
            attr={{
              id: 'registration-name-input',
              name: 'name',
              required: true,
              type: 'text'
            }}
          />
        </div>
        <div>
          <TextInput
            label="Enter a username"
            attr={{
              id: 'registration-username-input',
              name: 'username',
              required: true,
              type: 'text',
              autoComplete: 'username'
            }}
          />
        </div>
        <div>
          <Select
            label="State"
            className="location-state"
            name="locationState"
            onChange={this.onSelectStateChange}
            value={this.state.state.value}
            id="registration-location-state-select"
            options={this.generateStateOptions()}
          />
        </div>
        <div>
          <Select
            label="City"
            id="registration-location-city-input"
            className="location-city"
            name="locationCity"
            value={this.state.city}
            onChange={this.onSelectCityChange}
            disabled={!this.state.state.selected}
            type="text"
            options={this.state.cities}
          />
        </div>
        <div>
          <TextInput
            label="Enter a password"
            attr={{
              id: 'registration-password-input',
              name: 'password',
              required: true,
              type: 'password',
              autoComplete: 'current-password'
            }}
          />
        </div>

        <footer className="signupBtnLink">
          <Button type="submit">Sign up</Button> <br />{' '}
          <Link to="/login">Already have an account?</Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;
