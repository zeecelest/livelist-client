import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import { Input, Required, Label } from "../Form/Form";
import Button from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";

import './UpdateSpot.css';

class UpdateSpot extends Component {
    static contextType = PlayListContext;

    constructor(props) {
        super(props);
        this.state ={
            name: {
              value: '',
              touched: false
            },
            address: {
              value: '',
              touched: false
            },
            state: {
              value: '',
              touched: false
            },
            city: {
              value: '',
              touched: false
            },
            tags: {
              value: '',
              touched: false
            },
            redirectToReferrer: false,
            error: null,
            id: ''
        }
    }

    static defaultProps = {
      match: {
        params: {}
      }
    }

    updateName(name) {
      this.setState({ name: { value: name, touched: true } });
    }

    updateAddress(add) {
      this.setState({ address: { value: add, touched: true } });
    }

    updateState(st) {
      this.setState({ state: { value: st, touched: true } });
    }

    updateCity(city) {
      this.setState({ city: { value: city, touched: true } });
    }

    updateTags(tags) {
      this.setState({ tags: { value: tags, touched: true } });
    }

    validateName() {
      const n = this.state.name.value.trim();
      if (n.length === 0) {
        return 'Name is required';
      } else if (n.length < 3) {
        return 'Name must be at least 3 characters long';
      }
    }

    validateAddress() {
      const add = this.state.address.value.trim();
      if (add.length === 0) {
        return 'Address is required';
      } else if (add.length < 3) {
        return 'Address must be at least 3 characters long';
      }
    }

    validateCity() {
      const c = this.state.city.value.trim();
      if (c.length === 0) {
        return 'City is required';
      } else if (c.length < 3) {
        return 'City must be at least 3 characters long';
      }
    }

    validateTags() {
      const tag = this.state.tags.value.trim();
      if (tag.length === 0) {
        return 'Tags is required';
      } else if (tag.length < 3) {
        return 'Tag must be at least 3 characters long';
      }
    }

    componentDidMount() {
      const listId = this.props.match.params.id;
      const spot = this.context.spots
      console.log('list id', listId)

      console.log('spot context', spot)
      console.log(this.context)

      let editSpot = spot.find( (s) => parseInt(s.id) === parseInt(listId))
      console.log('spot.find' , this.context.spots.find( (s) => parseInt(s.id) === parseInt(listId)));

      this.setState({
        id: parseInt(listId),
        name: { value: editSpot.name, touched: false },
        address: { value: editSpot.address, touched: false },
        city: { value: editSpot.city, touched: false },
        state: { value: editSpot.state, touched: false },
        tags: { value: editSpot.tags, touched: false }
      });
    }

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
      const id = parseInt(this.props.match.params.id);
      console.log(typeof(id));
      const { name, state, address, city, tags} = this.state;
      this.setState({ redirectToReferrer: true });
      this.context.handleUpdateSpot(
        id,
        name.value,
        tags.value,
        address.value,
        city.value,
        state.value,
        
      )
    }

    // handleChange = ev => {
    //   const target = ev.target;
    //   const value = target.type === "checkbox" ? !target.checked : target.value;
    //   const name = target.name;
  
    //    //for testing only
    //   const cityValue = target.name === 'city' ? target.value.split(' ').join('_') : target.value;
    //   console.log('city value' + cityValue)


    //   this.setState({
    //     [name]: value
    //   });
    // };
  
    
render() {
  // let x = this.state.isEditable ? 'form here' : 'x'
  // console.log('editable', this.state.isEditable)

  console.log('state touched', this.state.state.touched )
  console.log('redirectToReferrrer', this.state.redirectToReferrer)

    const {error} = this.state;
    // if (this.state.redirectToReferrer) {
    //   return (<Redirect to={`/list/${this.props.match.params.id}`} />)
    // }
    // else 
    return (
      <form onSubmit={this.handleSubmit} className="updateSpotForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <Label htmlFor="updateSpot-name-input">
            Name
            <Required />
          </Label>
          <Input
            id="updateSpot-name-input"
            name="name"
            value={this.state.name.value}
            onChange={ ev => this.updateName(ev.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="updateSpot-tags-input">
            Tags
            <Required />
          </Label>
          <Input
            id="updateSpot-tags-input"
            name="tags"
            value={this.state.tags.value}
            onChange={ ev => this.updateTags(ev.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="updateSpot-address-input">
            Address
            <Required />
          </Label>
          <Input
            id="updateSpot-address-input"
            name="address"
            value={this.state.address.value}
            onChange={ ev => this.updateAddress(ev.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="updateSpot-city-input">
            city
            <Required />
          </Label>
          <Input
            id="updateSpot-city-input"
            name="city"
            value={this.state.city.value}
            onChange={ev => this.updateCity(ev.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="registration-state-input">
            State
            <Required />
          </Label>
          {/*  */}
          {this.state.state.touched 
          ? <select className="state" name="state" defaultValue={this.state.state.value} onChange={this.handleChange}>
          <option key="none" value={this.state.state.value} defaultValue={this.state.state.value}></option>
          {this.renderOptions()}
        </select>
        :
        <Input
            id="updateSpot-state-input"
            name="state"
            value={this.state.state.value}
            onChange={ev => this.updateState(ev.target.value)}
            required
          />
        }

        </div>
        <footer className="signupBtnLink">
          <Button><Link to={`/list/${this.props.match.params.id}`}>Cancel</Link></Button>
          <Button type="submit">Save</Button> <br />{' '}
        </footer>
      </form>
    );
  }
}

export default UpdateSpot;