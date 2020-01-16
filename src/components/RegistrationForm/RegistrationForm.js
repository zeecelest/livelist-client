import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Label } from '../Form/Form';
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  //firstInput = React.createRef();

  renderOptions = () => {
    let stateAbr = [
      'AL',
      'AK',
      'AS',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'DC',
      'FM',
      'FL',
      'GA',
      'GU',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MH',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'MP',
      'OH',
      'OK',
      'OR',
      'PW',
      'PA',
      'PR',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VI',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY'
    ];
    return stateAbr;
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, locationCity, locationState, password } = ev.target;
    if (locationState.value === '') {
      return this.setState({ error: 'Please select a state.' });
    }
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
            id="registration-location-state-select"
            options={this.renderOptions()}
          />
        </div>
        <div>
          <TextInput
            label="City"
            attr={{
              id: 'registration-location-city-input',
              name: 'locationCity',
              required: true,
              type: 'text'
            }}
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
