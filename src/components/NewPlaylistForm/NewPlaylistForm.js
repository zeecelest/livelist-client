import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import Button from "../Button/Button";

class NewPlaylistForm extends Component {
  static defaultProps = {
    onPlaylistCreation: () => {}
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
    const { name, state, city, tags, is_public } = ev.target;
    if (state.value === "") {
      return this.setState({ error: "Please select a state." });
    }

    // TODO needs to be converted to the API call for posting a new Playlist
    AuthApiService.postPlaylist({
      name: name.value,
      city: city.value,
      state: state.value,
      tags: tags.value,
      is_public: is_public.value
    })
      .then(playlist => {
        name.value = "";
        state.value = "";
        city.value = "";
        tags.value = "";
        is_public.value = "";
        this.props.onPlaylistCreation();
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
      <form onSubmit={this.handleSubmit} className="newPlaylistForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <Label htmlFor="newPlaylist-name-input">
            Name your playlist
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="newPlaylist-name-input"
            name="name"
            required
          />
        </div>
        <div>
          <Label htmlFor="newPlaylist-locationCity-input">
            City
            <Required />
          </Label>
          <Input id="newPlaylist-city-input" name="city" required />
        </div>
        <div>
          <Label htmlFor="registration-state-input">
            State
            <Required />
          </Label>
          <select className="state" name="state">
            <option key="none" defaultValue=""></option>
            {this.renderOptions()}
          </select>
        </div>
        <div>
          <Label htmlFor="newPlaylist-tags-input">
            Tags for your list
            <Required />
          </Label>
          <Input id="newPlaylist-tags-input" name="tags" />
        </div>
        <div>
          <Label htmlFor="newPlaylist-public-input">
            Would you like allow others to see your playlist?
            <Required />
          </Label>
          <input type="select" name="is_public"></input>
        </div>

        <footer className="signupBtnLink">
          <Button type="submit">Submit</Button> <br />{" "}
        </footer>
      </form>
    );
  }
}

export default NewPlaylistForm;
