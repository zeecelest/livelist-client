import React, { Component } from 'react';
import PlayListContext from '../../contexts/PlayListContext';
import { Label } from '../Form/Form';
import SwitchComp from '../Form/Switch';
import Button from '../../components/Button/Button';
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import possibleLocations from '../Assets/possibleLocations';
import states from '../Assets/states';
import { Link, Redirect } from 'react-router-dom';
import './UpdateList.css';

class UpdateList extends Component {
  static contextType = PlayListContext;
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      },
      tags: {
        value: '',
        touched: false
      },
      city: {
        value: '',
        touched: false
      },
      state: {
        value: '',
        touched: false
      },
      description: {
        value: '',
        touched: false
      },
      is_public: {
        value: false,
        touched: false
      },
      cities: [],
      redirectToReferrer: false,
      error: null,
      id: ''
    };
  }

  static defaultProps = {
    match: {
      params: {}
    }
  };

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateTags(tag) {
    this.setState({ tags: { value: tag, touched: true } });
  }

  updateCity(city) {
    this.setState({ city: { value: city, touched: true } });
  }

  updateState(st) {
    this.setState({ state: { value: st, touched: true } });
  }

  updateDesc(desc) {
    this.setState({ description: { value: desc, touched: true } });
  }

  updateIsPublic() {
    this.setState({
      is_public: { value: !this.state.is_public.value, touched: true }
    });
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
    const list_id = this.props.match.params.id;
    this.context.setListId(list_id);
    const playList = this.context.playlist;
    let editPlaylist = playList.find(
      (play) => parseInt(play.id) === parseInt(list_id)
    );
    console.log(editPlaylist);
    this.setState({
      name: { value: editPlaylist.name, touched: false },
      tags: { value: editPlaylist.tags, touched: false },
      city: { value: editPlaylist.city, touched: false },
      state: { value: editPlaylist.state, touched: false },
      description: { value: editPlaylist.description, touched: false },
      is_public: { value: editPlaylist.is_public, touched: false },
      cities: possibleLocations[editPlaylist.state]
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const list_id = parseInt(this.props.match.params.id);
    this.setState({ redirectToReferrer: true });
    const { name, tags, city, state, description, is_public } = this.state;
    let obj = {
      name: name.value,
      tags: tags.value,
      city: city.value,
      state: state.value,
      description: description.value,
      is_public: is_public.value,
      id: list_id
    };
    this.context.handleUpdateList(obj);
  };

  render() {
    const { error } = this.state;
    if (this.state.redirectToReferrer) {
      return <Redirect to="/" />;
    } else
      return (
        <form onSubmit={this.handleSubmit} className="updateListForm">
          <div role="alert">{error && <p>{error}</p>}</div>
          <div>
            <TextInput
              attr={{
                id: 'updateList-name-input',
                name: 'name',
                value: this.state.name.value,
                onChange: (ev) => this.updateName(ev.target.value),
                label: 'List name',
                required: true
              }}
            />
          </div>
          <div>
            <TextInput
              attr={{
                id: 'updateList-tags-input',
                name: 'tags',
                value: this.state.tags.value,
                onChange: (ev) => this.updateTags(ev.target.value),
                label: 'Tags',
                required: true
              }}
            />
          </div>
          <div>
            <Select
              id="updateList-state-input"
              className="state"
              name="state"
              label="State"
              value={this.state.state.value}
              helperText="Choose your State"
              onChange={this.onSelectStateChange}
              options={this.generateStateOptions()}
              required
            />
          </div>
          <div>
            <Select
              id="updateList-city-input"
              name="city"
              helperText="Choose your City"
              value={this.state.city.value}
              label="City"
              className="location-city"
              onChange={this.onSelectCityChange}
              options={this.state.cities}
              required
            />
          </div>
          <div>
            <TextInput
              attr={{
                id: 'updateList-desc-input',
                name: 'address',
                value: this.state.description.value,
                onChange: (ev) => this.updateDesc(ev.target.value),
                label: 'Description'
              }}
            />
          </div>
          <div>
            <Label>
              <span>Make Your List Private ?</span>
            </Label>
            <SwitchComp
              id="updateList-isPublic-checkbox"
              checked={!this.state.is_public.value}
              value={this.state.is_public.value}
              onChange={(e) => this.updateIsPublic(e)}
            />
          </div>
          <footer className="signupBtnLink">
            <Button>
              <Link to="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit">Save</Button> <br />{' '}
          </footer>
        </form>
      );
  }
}

export default UpdateList;