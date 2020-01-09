import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import ListsApiService from "../../services/lists-api-service";
import Button from "../Button/Button";

// TODO - clean the input .toLowerCase and _ for spaces in the city
// TODO - clean the tags, must have space between #
// TODO - incorporate the API call to POST the new list

class NewPlaylistForm extends Component {
  static defaultProps = {
    onPlaylistCreation: () => {}
  };
  stateAbr = [
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
  state = {
    error: null,
    name: "",
    city: " ",
    state: "",
    tags: " ",
    is_public: true
  };

  firstInput = React.createRef();
  renderOptions = () => {
    return this.stateAbr.map(state => {
      return (
        <option key={state} value={state} onChange={this.handleChange}>
          {state}
        </option>
      );
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, state, city, tags } = ev.target;
    let is_public = this.state.is_public
    if (state.value === "") {
      return this.setState({ error: "Please select a state." });
    }
    // console.log("name", name.value);
    // console.log("city", city.value);
    // console.log("state", state.value);
    // console.log("tags", tags.value);
    // console.log("is_public", this.state.is_public);
    // TODO needs to be converted to the API call for posting a new Playlist
    ListsApiService.postLists({
      name: name.value,
      city: city.value,
      state: state.value,
      tags: tags.value,
      is_public
    })
      .then(playlist => {
        name.value = "";
        state.value = "";
        city.value = "";
        tags.value = "";
        this.props.onPlaylistCreation();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleChange = ev => {
    const target = ev.target;
    const value = target.type === "checkbox" ? !target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
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
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="newPlaylist-locationCity-input">
            City
            <Required />
          </Label>
          <Input
            id="newPlaylist-city-input"
            name="city"
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="registration-state-input">
            State
            <Required />
          </Label>
          <select className="state" name="state" onChange={this.handleChange}>
            <option key="none" defaultValue={this.state.value}></option>
            {this.renderOptions()}
          </select>
        </div>
        <div>
          <Label htmlFor="newPlaylist-tags-input">
            Tags for your list
            <Required />
          </Label>
          <Input
            id="newPlaylist-tags-input"
            name="tags"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="#datenight #hotnewspots"
          />
        </div>
        <div>
          <Label htmlFor="newPlaylist-public-input">
            Would you like to make this list private?
            <Required />
          </Label>
          <input
            type="checkbox"
            name="is_public"
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
        </div>
        <footer className="signupBtnLink">
          <Button type="submit">Submit</Button> <br />{" "}
        </footer>
      </form>
    );
  }
}

export default NewPlaylistForm;
