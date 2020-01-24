import React, { Component } from 'react';
import { Required, Label } from '../Form/Form';
import ListsApiService from '../../services/lists-api-service';
import SwitchComp from '../Form/Switch';
import possibleLocations from '../Assets/possibleLocations';
import states from '../Assets/states';
import Button from '../Button/Button';
import './NewPlaylistForm.css';
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import TextField from '@material-ui/core/TextField';

// TODO - clean the input .toLowerCase and _ for spaces in the city
// TODO - clean the tags, must have space between #
// TODO - incorporate the API call to POST the new list

class NewPlaylistForm extends Component {
  static defaultProps = {
    onPlaylistCreation: () => {}
  };
  state = {
    error: null,
    name: '',
    cities: [],
    city: '',
    state: { value: '', touched: false },
    tags: '',
    description: '',
    is_public: false
  };

  onSelectStateChange = (ev) => {
    let cities = possibleLocations[ev.target.value];
    this.setState({
      state: {
        touched: true,
        value: ev.target.value
      },
      cities: cities.sort()
    });
  };
  updateDesc(desc) {
    this.setState({ description: desc });
  }

  onSelectCityChange = (ev) => {
    this.setState({
      city: ev.target.value
    });
  };

  generateStateOptions = () => {
    return states.map((item) => item.name);
  };

  handlePrivSwitch = () => {
    this.setState({ is_public: !this.state.is_public });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    let name = document.getElementsByName('name')[0].value;
    let city = document.getElementsByName('city')[0].value;
    let state = document.getElementsByName('state')[0].value;
    let is_public = document.getElementsByName('is_public')[0].value;
    let tags = document.getElementsByName('tags')[0].value;
    let description = this.state.description;
    console.log(description);
    ListsApiService.postLists({
      name: name,
      city: city,
      state: state,
      tags: tags,
      is_public,
      description
    })
      .then(() => {
        this.props.onPlaylistCreation();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="newPlaylistForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>

       
          <TextInput
            attr={{ id: 'newPlaylist-name-input', name: 'name', label: 'Name' }}
          />
        </div>
        <div className="stateContainer">
          <Select
            id="newPlaylist-state-input"
            label="State"
            name="state"
            value={this.state.state.value}
            onChange={this.onSelectStateChange}
            options={this.generateStateOptions()}></Select>
        </div>
        <div>
          <Select
            id="newPlaylist-city-input"
            name="city"
            label="City"
            value={this.state.city}
            className="location-city"
            onChange={this.onSelectCityChange}
            disabled={!this.state.state.touched}
            options={this.state.cities}
            required
          />
        </div>
        <div>
          <TextInput
            attr={{
              id: 'newPlaylist-tags-input',
              name: 'tags',
              required: true,
              type: 'text',
              label: 'Tags'
            }}
          />
        </div>
        <div>
          <TextField
            id="newPlaylist-desc-text"
            variant="outlined"
            label="Description"
            multiline={true}
            onChange={(ev) => this.updateDesc(ev.target.value)}
            name="description"
          />
        </div>
        <div>
          <label>
            <span className='privateListText'>Make your list private ?</span>
          </label>
          <SwitchComp
            id="newPlayList-isPublic-checkbox"
            checked={this.state.is_public}
            value={!this.state.is_public}
            name="is_public"
            onChange={(e) => this.handlePrivSwitch(e)}
          />
        </div>
        <footer className="signupBtnLink">
          <Button type="submit" className='newPlaylistSubmitButton'>Submit</Button> <br />{' '}
        </footer>
      </form>
    );
  }
}

export default NewPlaylistForm;
