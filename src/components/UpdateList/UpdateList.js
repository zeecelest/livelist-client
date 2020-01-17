import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import { Input, Required, Label } from "../Form/Form";
import Button from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";

class UpdateList extends Component {
    static contextType = PlayListContext;
    constructor(props) {
        super(props);
        this.state ={
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
  
    updateIsPublic(isPub) {
      this.setState({ is_public: { value: isPub, touched: true } });
    }
  
    validateName() {
        const n = this.state.name.value.trim();
        if (n.length === 0) {
          return 'Name is required';
        } else if (n.length < 5) {
          return 'Name must be at least 5 characters long';
        }
      }
  
    validateTags() {
        const n = this.state.tags.value.trim();
        if (n.length === 0) {
          return 'Tags is required';
        } else if (n.length < 5) {
          return 'Tags must be at least 5 characters long';
        }
    }

    validateCity() {
        const n = this.state.city.value.trim();
        if (n.length === 0) {
          return 'City is required';
        } else if (n.length < 3) {
          return 'City must be at least 5 characters long';
        }
    }

    validateState() {
        const n = this.state.state.value.trim();
        if (n.length !== 0) {
          return 'State is required';
        }
    }

    //desc req'd?

    componentDidMount() {
        const lid = this.props.match.params.id;
        this.context.setListId(lid);
        const playList = this.context.playlist
        
        let editPlaylist = playList.find( play => parseInt(play.id) === parseInt(lid));
        
        console.log(editPlaylist.is_public)
        this.setState({
            name: { value: editPlaylist.name, touched: false },
            tags: { value: editPlaylist.tags, touched: false },
            city: { value: editPlaylist.city, touched: false },
            state: { value: editPlaylist.state, touched: false },
            description: { value: editPlaylist.description, touched: false },
            is_public: { value: editPlaylist.is_public ? editPlaylist.is_public : editPlaylist.is_public.checked , touched: false},
          });
    }

    handleSubmit = ev => {
        ev.preventDefault();

        const lid = parseInt(this.props.match.params.id);
        
        this.setState({ redirectToReferrer: true });

        const { name, tags, city, state, description, is_public } = this.state;

        let obj = {name: name.value, tags: tags.value, city: city.value, state: state.value, description: description.value, is_public: !is_public.checked, id: lid }

        console.log('obj is_public', obj.is_public)
        this.context.handleUpdateList(obj);

    }

    render() {
        const {error} = this.state;
        if (this.state.redirectToReferrer) {
          return (<Redirect to="/" />)
        }
        else 
    
        return (
                <form onSubmit={this.handleSubmit} className="updateListForm">
                  <div role="alert">{error && <p>{error}</p>}</div>
                  <div>
                    <Label htmlFor="updateList-name-input">
                      Name
                      <Required />
                    </Label>
                    <Input
                      id="updateList-name-input"
                      name="name"
                      value={this.state.name.value}
                      onChange={ ev => this.updateName(ev.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="updateList-tags-input">
                      Tags
                      <Required />
                    </Label>
                    <Input
                      id="updateList-tags-input"
                      name="tags"
                      value={this.state.tags.value}
                      onChange={ ev => this.updateTags(ev.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="updateList-city-input">
                      city
                      <Required />
                    </Label>
                    <Input
                      id="updateList-city-input"
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
                      id="updateList-state-input"
                      name="state"
                      value={this.state.state.value}
                      onChange={ev => this.updateState(ev.target.value)}
                      required
                    />
                  }
                  </div>
                  <div>
                    <Label htmlFor="updateList-desc-input">
                      Description
                    </Label>
                    <Input
                      id="updateList-desc-input"
                      name="address"
                      value={this.state.description.value}
                      onChange={ ev => this.updateDesc(ev.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="updateList-isPublic-checkbox">
                        Make this list private?
                    </Label>
                    <Input
                       type="checkbox"
                       name="is_public"
                       id="updateList-isPublic-checkbox"
                       style={{transform: 'scale(1.5)'}}
                       value = {this.state.is_public}
                       onChange={ ev => this.updateIsPublic(ev.target.value)}
                    />
                  </div>
                  <footer className="signupBtnLink">
                    <Button><Link to="/dashboard">Cancel</Link></Button>
                    <Button type="submit">Save</Button> <br />{' '}
                  </footer>
                </form>
        );
    }
}
          

export default UpdateList;