import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import ListsApiService from "../../services/lists-api-service";
import Button from "../Button/Button";
import "./NewPlaylistForm.css";
import TextInput from "../Form/TextInput";
import Select from "../Form/Select";

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
    // name: "",
    // city: " ",
    // state: "",
    // tags: " ",
    // is_public: true
  };

  // firstInput = React.createRef();
  // renderOptions = () => {
  //   return this.stateAbr.map(state => {
  //     return (
  //       <option key={state} value={state} onChange={this.handleChange}>
  //         {state}
  //       </option>
  //     );
  //   });
  // };

  handleSubmit = ev => {
    ev.preventDefault();
    let name = document.getElementsByName('name')[0].value;
    let city = document.getElementsByName('city')[0].value;
    let state = document.getElementsByName('state')[0].value;
    let is_public = !document.getElementsByName('is_public')[0].checked;
    let tags = document.getElementsByName('tags')[0].value;

    ListsApiService.postLists({
      name: name,
      city: city,
      state: state,
      tags: tags,
      is_public
    })
      .then(playlist => {
        this.props.onPlaylistCreation();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  // handleChange = ev => {
  //   const target = ev.target;
  //   const value = target.type === "checkbox" ? !target.checked : target.value;
  //   const name = target.name;
  //   console.log("this is the target on Change", target);
  //   //for testing only
  //   const cityValue = target.value.split(" ").join("_");

  //   this.setState({
  //     [name]: value,
  //     city: cityValue
  //   });
  // };

  // componentDidMount() {
  //   this.firstInput.current.focus();
  // }

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
              id: "newPlaylist-name-input",
              //ref: this.firstInput,
              name: "name",
              required: true,
              type: "text",
              label: "Name",
              //value: this.state.value,
             // onChange: this.handleChange
            }}
          />
        </div>
        <div>
          <TextInput
            attr={{
              id: "newPlaylist-city-input",
              //ref: this.firstInput,
              name: "city",
              required: true,
              type: "text",
              label: "City",
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
            //onChange={this.handleChange}
            options={this.stateAbr}
            //value={this.state.value}
          ></Select>
        </div>
        <div>
          <TextInput
            attr={{
              id: "newPlaylist-tags-input",
              //ref: this.firstInput,
              name: "tags",
              required: true,
              type: "text",
              label: "Tags",
              //value: this.state.value,
              //onChange: this.handleChange
            }}
          />
        </div>
        <div>
          <Label htmlFor="newPlaylist-public-input">
            Make this list private?
            <Required />
          </Label>
          <input
            type="checkbox"
            name="is_public"
            className='isPublicCheckbox'
            id='workDammit'
            style={{transform: 'scale(1.5)'}}
            //value={this.state.value}
            //onChange={this.handleChange}
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
