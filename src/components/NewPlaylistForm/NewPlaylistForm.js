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
    // name: "",
    cities: [],
    state: { value: null, touched: false },
    // tags: " ",
    is_public: false
  };

  onSelectStateChange = (ev) => {
    console.log(possibleLocations);
    let cities = possibleLocations[ev.target.value];
    console.log(cities);
    this.setState({
      state: {
        touched: true,
        value: ev.target.value
      },
      cities: cities.sort()
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
    let is_public = document.getElementsByName('is_public')[0].checked;
    let tags = document.getElementsByName('tags')[0].value;
    console.log(is_public);

    // ListsApiService.postLists({
    //   name: name,
    //   city: city,
    //   state: state,
    //   tags: tags,
    //   is_public
    // })
    //   .then((playlist) => {
    //     this.props.onPlaylistCreation();
    //   })
    //   .catch((res) => {
    //     this.setState({ error: res.error });
    //   });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="newPlaylistForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <Label htmlFor="newPlaylist-name-input">
            Name your playlist
            <Required />
          </Label>
          <TextInput
            attr={{
              id: 'newPlaylist-name-input',

              name: 'name',
              required: true,
              type: 'text',
              label: 'Name'
              //value: this.state.value,
              // onChange: this.handleChange
            }}
          />
        </div>
        <div className="stateContainer">
          <Select
            id="newPlaylist-state-input"
            //ref={this.firstInput}
            label="State"
            name="state"
            onChange={this.onSelectStateChange}
            options={this.generateStateOptions()}
            //value={this.state.value}
          ></Select>
        </div>
        <div>
          <Select
            id="newPlaylist-city-input"
            name="city"
            label="City"
            className="location-city"
            disabled={!this.state.state.touched}
            type="text"
            options={this.state.cities}
            required
          />
        </div>
        <div>
          <TextInput
            attr={{
              id: 'newPlaylist-tags-input',
              //ref: this.firstInput,
              name: 'tags',
              required: true,
              type: 'text',
              label: 'Tags'
              //value: this.state.value,
              //onChange: this.handleChange
            }}
          />
        </div>
        <div>
          <TextField
            id="newPlaylist-desc-text"
            variant="outlined"
            label="Description"
            multiline={true}
            name="description"
          />
        </div>
        <div>
          <label>Make your list private ?</label>
          <SwitchComp
            id="newPlayList-isPublic-checkbox"
            checked={this.state.is_public}
            value={!this.state.is_public}
            onChange={(e) => this.handlePrivSwitch(e)}
          />
        </div>
        <footer className="signupBtnLink">
          <Button type="submit">Submit</Button> <br />{' '}
        </footer>
      </form>
    );
  }
}

export default NewPlaylistForm;
