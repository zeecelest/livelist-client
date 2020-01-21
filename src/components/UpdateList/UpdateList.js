import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import { Input, Required, Label } from "../Form/Form";
import Button from "../../components/Button/Button";
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import possibleLocations from '../Assets/possibleLocations';
import states from '../Assets/states';
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
  
    updateName(name) {
        this.setState({ name: { value: name, touched: true } });
    }

    updateTags(tag) {
    this.setState({ tags: { value: tag, touched: true } });
    }

    updateCity(city) {
        this.setState({ city: { value: city, selected: true, touched: true } });
    }
  
    updateState(st) {
    this.setState({ state: { value: st, selected: true , touched: true } });
    }
  
    updateDesc(desc) {
        this.setState({ description: { value: desc, touched: true } });
    }
  
    updateIsPublic(isPub) {
      this.setState({ is_public: { value: isPub, touched: true } });
    }
  
    generateStateOptions = () => {
      return states.map((item) => item.name);
    };
  
    onSelectStateChange = (ev) => {
      let cities = possibleLocations[ev.target.value];
      this.setState({
        state: {
          selected: true,
          touched: true,
          value: ev.target.value
        },
        cities
      });
    };
  
    onSelectCityChange = (ev) => {
      let cities = possibleLocations[ev.target.value];
      this.setState({
        city: {
          selected: true,
          touched: true,
          value: ev.target.value
        },
        cities
      });
    };

    componentDidMount() {
        const lid = this.props.match.params.id;
        this.context.setListId(lid);
        const playList = this.context.playlist
        
        let editPlaylist = playList.find( play => parseInt(play.id) === parseInt(lid));
        
        // console.log(editPlaylist.is_public)
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
                    <TextInput
                      attr={{ 
                        id: "updateList-name-input",
                        name: "name",
                        type: "text",
                        value: this.state.name.value,
                        onChange: (ev => this.updateName(ev.target.value)),
                        label: "List name",
                        required: true,
                      }}
                    />
                  </div>
                  <div>
                    <TextInput
                      attr={{ 
                        id:"updateList-tags-input",
                        name:"tags",
                        type: "text",
                        value: this.state.tags.value,
                        onChange: ( ev => this.updateTags(ev.target.value)),
                        label: "Tags",
                        required: true,
                      }}
                    />
                  </div>
                  <div>
                    {this.state.state.touched 
                    ? 
                    <Select
                      id="updateList-state-input"
                      className="state" 
                      name="state" 
                      helperText="Choose your State"
                      defaultValue={this.state.state.value} 
                      onChange={this.handleChange}
                      options = {this.generateStateOptions()}
                      required
                    />
                  :
                  <TextInput
                    attr={{
                      id: "updateList-state-input",
                      name: "state",
                      type: "text",
                      value: this.state.state.value,
                      onChange: (ev => this.updateState(ev.target.value)),
                      label: "Tags",
                      required: true,
                    }}
                    />
                  }
                  </div>
                  <div>
                    {this.state.city.touched
                      ?
                      <Select
                        id = "updateList-city-input"
                        name = "city"
                        helperText="Choose your City"
                        label = "City"
                        className="location-city"
                        onChange={this.onSelectCityChange}
                        type= "text"
                        options={this.state.cities}
                        required
                      />
                      :
                       <TextInput
                        attr={{
                          id: "updateList-city-input",
                          name: "city",
                          type: "text",
                          value: this.state.city.value,
                          onChange: (ev => this.updateCity(ev.target.value)),
                          label: "City",
                          required: true,
                        }}
                     />
                    }
                   
                  </div>
                  <div>
                    <TextInput
                      attr={{ 
                        id: "updateList-desc-input",
                        name: "address",
                        type: "text",
                        value: this.state.description.value,
                        onChange: (ev => this.updateDesc(ev.target.value)),
                        label: "Description",
                    }}
                    />
                  </div>
                  <div>
                    <TextInput
                      attr={{ 
                        id: "updateList-isPublic-checkbox",
                        type: "checkbox",
                        name: "is_public",
                        style: ({transform: 'scale(1.5)' , textAlign: 'center' }),
                        value : this.state.is_public,
                        onChange: (ev => this.updateIsPublic(ev.target.value)),
                        label: "Make this list private?"
                      }}
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