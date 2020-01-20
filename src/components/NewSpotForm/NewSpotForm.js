import React, {Component} from 'react';
import {Input, Required, Label} from '../Form/Form';
import Button from '../Button/Button';
import SpotsApiService from '../../services/spots-api-service';
import PlayListContext from '../../contexts/PlayListContext';
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import possibleLocations from '../Assets/possibleLocations';
import states from '../Assets/states';

class NewSpotForm extends Component {
  static contextType = PlayListContext;

  static defaultProps = {
    onSpotCreation: () => {},
  };

  state = {
    error: null,
    name: '',
    address: '',
    stateCity: { value: null, selected: false },
    stateLocation: '',
    cities: [],
  };

  generateStateOptions = () => {
    return states.map((item) => item.name);
  };

  onSelectStateChange = (ev) => {
    let cities = possibleLocations[ev.target.value];
    this.setState({
      stateLocation: {
        selected: true,
        value: ev.target.value
      },
      cities
    });
  };

  onSelectCityChange = (ev) => {
    this.setState({
      cityLocation: {
        selected: true,
        value: ev.target.value
      }
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    console.log('handle submit', ev.target)
    let name = document.getElementsByName('name')[0];
    let address = document.getElementsByName('address')[0];
    let city =  this.state.cityLocation.value;
    let state = this.state.stateLocation.value;

    // const {name, tags, address, city, state} = ev.target;
    // if (state.value === '') {
    //   return this.setState({error: 'Please select a state.'});
    // }
    // console.log('posting' + name.value);

    SpotsApiService.postSpots({
      name: name.value,
      address: address.value,
      city: city
        .split(' ')
        .join('_')
        .trim(),
      state: state,
      list_id: this.props.location.props ? this.props.location.props.list_id : ''
    })
      .then(spot => {
        this.context.setSpotId(spot.id)
        this.context.setSpots(spot)
        name.value = '';
        address.value = '';
        city.value = '';
        state.value = '';
        this.props.onSpotCreation();
      })
      .catch(res => {
        this.setState({error: res.error});
      });
  };

  render() {
    const {error} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="newSpotForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <Label htmlFor="newSpot-name-input">
            Adding new spot
        </Label>
        <div>
          <TextInput
            attr={{
              id: "newSpot-name-input",
              name: "name",
              type: 'text',
              label: "Spot name",
              // value: {this.state.value},
              // onChange={this.handleChange},
              required: true,
            }}
            
          />
        </div>
        {/*<div>
          <TextInput
            // ref={this.firstInput}
            label="tags"
            attr={{
              id: "newSpot-tags-input",
              name: "tags",
              // value={this.state.value}
              // onChange={this.handleChange}
              placeholder: "#datenight #hotnewspots",
              required: true
            }}
          />
        </div> */}
        <div>
          <TextInput
            attr={{
              id: "newSpot-address-input",
              name: "address",
              label: "Address",
              // value={this.state.value}
              // onChange={this.handleChange}
              required: true,
            }}
          />
        </div>
        <div>
           <Select
            label="State"
            helperText="Choose your State"
            className="location-state"
            name="locationState"
            onChange={this.onSelectStateChange}
            value=""
            id="newSpot-location-state-select"
            options={this.generateStateOptions()}
          />
        </div>
        <div>
          <Select
              id = "newSpot-city-input"
              name = "city"
              helperText="Choose your City"
              label = "City"
              
              className="location-city"
              // value={this.state.value}
              // onChange={this.handleChange}
              onChange={this.onSelectCityChange}
              disabled={!this.state.stateLocation.selected}
              type= "text"
              options={this.state.cities}
          />
      </div>
        <footer className="signupBtnLink">
          <Button type="submit">Submit</Button> <br />{' '}
        </footer>
      </form>
    );
  }
}

export default NewSpotForm;
