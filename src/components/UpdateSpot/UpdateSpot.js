import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import Button from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import possibleLocations from '../Assets/possibleLocations';
import states from '../Assets/states';
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
            redirectToReferrer: false,
            error: null,
            id: '',
            cities: [],
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
      this.setState({ city: { value: city,  touched: true } });
    }

    generateStateOptions = () => {
      return states.map((item) => item.name);
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
  
    onSelectCityChange = (ev) => {
      this.setState({
        city: {
          touched: true,
          value: ev.target.value
        }
      });
    };

    componentDidMount() {
      const lid = this.context.listid;
      const spot = this.context.spots.spots

      let editSpot = spot.find( (s) => parseInt(s.id) === parseInt(this.context.spotid))

      this.setState({
        name: { value: editSpot.name, touched: false },
        address: { value: editSpot.address, touched: false },
        city: { value: editSpot.city, touched: false },
        state: { value: editSpot.state, touched: false },
        cities: possibleLocations[editSpot.state],
        list_id: parseInt(lid)
      });

    }

    handleSubmit = ev => {
      ev.preventDefault();
      const sid = parseInt(this.props.match.params.id);
      const lid = this.context.listid;
      const { name, state, address, city} = this.state;

      this.setState({ redirectToReferrer: true });

      let obj = {name: name.value, address: address.value, city: city.value, state: state.value, id: sid , list_id: lid}
  
      this.context.handleUpdateSpot(
        obj
      )
      this.setState({ state: this.state })
    }
    
render() {
    const {error} = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={`/list/${this.context.listid}`} />)
    }
    else 
    return (
      <form onSubmit={this.handleSubmit} className="updateSpotForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <TextInput
            attr={{ 
              id: "updateSpot-name-input",
              name: "name",
              type: "text",
              value: this.state.name.value,
              onChange: (ev => this.updateName(ev.target.value)),
              label: "Spot name",
              required: true,
            }}
          />
        </div>
        <div>
          <TextInput
            attr={{ 
              id: "updateSpot-address-input",
              name: "address",
              value: this.state.address.value,
              onChange: (ev => this.updateAddress(ev.target.value)),
              type: "text",
              label: "Address",
              required: true,
            }}
          />
        </div>
        <div>
          <Select
            id = "updateSpot-state-input"
            className="state" 
            name="state" 
            label="State"
            helperText="Choose your State"
            value = {this.state.state.value}
            onChange={this.onSelectStateChange}
            options = {this.generateStateOptions()}
            required
          />
        </div>
        <div>
            <Select
              id = "updateSpot-city-input"
              className="location-city"
              name = "city"
              helperText="Choose your City"
              label = "City"
              value = {this.state.city.value}
              onChange={this.onSelectCityChange}
              options={this.state.cities}
              required
            />
        </div>
        <footer className="signupBtnLink">
          <Button><Link to={`/list/${this.context.listid}`}>Cancel</Link></Button>
          <Button type="submit">Save</Button> <br />{' '}
        </footer>
      </form>
    );
  }
}

export default UpdateSpot;