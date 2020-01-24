import React, { Component } from 'react';
import { Label } from '../Form/Form';
import { Link, Redirect } from 'react-router-dom';
import Button from '../Button/Button';
import SpotsApiService from '../../services/spots-api-service';
import PlayListContext from '../../contexts/PlayListContext';
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import possibleLocations from '../Assets/possibleLocations';
import states from '../Assets/states';
import './NewSpotForm.css';

class NewSpotForm extends Component {
  static contextType = PlayListContext;

  static defaultProps = {
    onSpotCreation: () => {}
  };

  state = {
    error: null,
    name: '',
    address: '',
    state: { value: null, selected: false },
    city: { value: null, selected: false },
    stateLocation: '',
    cities: [],
    redirectToReferrer: false
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
      city: {
        selected: true,
        value: ev.target.value
      }
    });
  };

  componentDidMount() {
    let lid = this.props.location.props.list_id;
    this.context.setListId(lid);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let name = document.getElementsByName('name')[0];
    let address = document.getElementsByName('address')[0];
    let city = this.state.city.value;
    let state = this.state.state.value;

    SpotsApiService.postSpots({
      name: name.value,
      address: address.value,
      city: city
        .split(' ')
        .join('_')
        .trim(),
      state: state,
      list_id: this.props.location.props
        ? this.props.location.props.list_id
        : ''
    })
      .then((spot) => {
        this.context.setSpotId(spot.id);
        this.context.setSpots(spot);

        this.props.onSpotCreation();

        name.value = '';
        address.value = '';
        city.value = '';
        state.value = '';
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="newSpotForm">
        <div role="alert">{error && <p>{error}</p>}</div>

        <div>
          <TextInput
            attr={{
              id: 'newSpot-name-input',
              name: 'name',
              type: 'text',
              label: 'Spot name',
              required: true
            }}
          />
        </div>
        <div>
          <TextInput
            attr={{
              id: 'newSpot-address-input',
              name: 'address',
              label: 'Address',
              required: true
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
            id="newSpot-location-state-select"
            options={this.generateStateOptions()}
            required
          />
        </div>
        <div>
          <Select
            id="newSpot-location-city-select"
            name="city"
            label="City"
            className="location-city"
            onChange={this.onSelectCityChange}
            disabled={!this.state.state.selected}
            type="text"
            options={this.state.cities}
            required
          />
        </div>
        <footer className="newSpotButtons">
          <Button className='newSpotCancelButton'>
            <Link to={`/list/${this.context.listid}`}>Cancel</Link>
          </Button>
          <Button  className='newSpotSaveButton' type="submit">Save</Button> <br />{' '}
        </footer>
      </form>
    );
  }
}

export default NewSpotForm;
