// is given access to ALL lists through props
// Filters the array of lists to show those with matching filters
import React, { Component } from 'react';
import PlayListContext from '../../contexts/PlayListContext';
import { Link } from 'react-router-dom';
import TextInput from '../Form/TextInput';
import './ListByTags.css';

export class ListByTags extends Component {
  static contextType = PlayListContext;
  state = {
    lists: [],
    filter: '',
    filteredList: []
  };

  handleFilter = (ev) => {
    ev.preventDefault();
    let filter = document.getElementsByName('filter')[0].value;
    let newList = [];
    let mulFilters = filter.split(' ');
    if (mulFilters.length === 1) {
      this.props.lists.forEach((x) => {
        let newTags = x.tags.split(' ');
        if (newTags.includes(filter)) {
          newList.push(x);
        }
      });
      filter = '';
    } else if (mulFilters.length > 1) {
      this.props.lists.forEach((x) => {
        let newTags = x.tags.split(' ');
        for (let i = 0; i < mulFilters.length; i++) {
          if (newTags.includes(mulFilters[i])) {
            newList.push(x);
          }
        }
        filter = '';
      });
    }
    this.setState({
      filteredList: [...newList]
    });
  };

  renderFilteredList = () => {
    if (this.state.filteredList.length == 0) {
      return this.props.lists.map((list) => {
        return (
          <div key={Math.random()} className="listItem filtered">
            <Link to={`/list/${list.id}`}>
              <h4 className="filteredListName">{list.name}</h4>
            </Link>
            <p className="filteredListTag">{list.tags}</p>
          </div>
        );
      });
    } else if (this.state.filteredList.length > 0) {
      return this.state.filteredList.map((list) => {
        return (
          <div key={Math.random()} className="listItem filtered">
            <Link to={`/list/${list.id}`}>
              <h4 className="filteredListName">{list.name}</h4>
            </Link>
            <p>{list.tags}</p>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <section>
        <form onChange={this.handleFilter} id="filterForm">
          <h2 className="filterFormTitle">Browse All Lists</h2>
          <div className="filterButtonContainer">
            <TextInput
              label="Hashtag"
              attr={{
                type: 'text',
                placeholder: '#saturday',
                name: 'filter',
                className: 'filterField'
              }}
            />
          </div>
        </form>
        <div className="filteredContainer">{this.renderFilteredList()}</div>
      </section>
    );
  }
}

export default ListByTags;
