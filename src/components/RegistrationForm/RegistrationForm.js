import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Label } from '../Form/Form';
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
    stateLocation: { value: null, selected: false },
    cities: []
  };

  //firstInput = React.createRef();

  generateStateOptions = () => {
    return states.map((item) => item.name);
  };

  onSelectStateChange = (ev) => {
    let cities = possibleLocations[ev.target.value];
    console.log(cities);
    this.setState({
      stateLocation: {
        selected: true,
        value: ev.target.value
      },
      cities
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(ev.target);
    const { name, username, locationCity, locationState, password } = ev.target;
    console.log(name, username, locationCity, locationState, password);
    // if (locationState.value === '') {
    //   return this.setState({ error: 'Please select a state.' });
    // }
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      city: locationCity.value,
      state: locationState.value,
      password: password.value
    })
      .then((user) => {
        name.value = '';
        username.value = '';
        locationCity.value = '';
        locationState.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  // componentDidMount() {
  //   this.firstInput.current.focus();
  // }

  render() {
    console.log(this.state);
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
            label="Choose a username"
            attr={{
              id: 'registration-username-input',
              name: 'username',
              required: true,
              type: 'text'
            }}
          />
        </div>
        <div className="state-container">
          <Select
            helperText="Please Choose a State"
            className="location-state"
            name="locationState"
            onChange={this.onSelectStateChange}
            value=""
            id="registration-location-state-select"
            options={this.generateStateOptions()}
          />
        </div>
        <div>
          <Select
            helperText="Please Choose a City"
            id="registration-location-city-input"
            name="locationCity"
            onChange={this.onSelectChange}
            disabled={!this.state.stateLocation.selected}
            type="text"
            options={this.state.cities}
          />
        </div>
        <div>
          <TextInput
            label="Choose a password"
            attr={{
              id: 'registration-password-input',
              name: 'password',
              required: true,
              type: 'password'
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
