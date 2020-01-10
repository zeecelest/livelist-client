// is given access to ALL lists through props
// Filters the array of lists to show those with matching filters
import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import { Link } from 'react-router-dom'

export class ListByTags extends Component {

  static contextType = PlayListContext;
  state = {
    lists: [],
    filter: "",
    filteredList: []
  };
  
  handleFilter = ev => {
    ev.preventDefault();
    let filter = ev.target.filter.value;
    let newList = [];
    let mulFilters = filter.split(" ");
    if (mulFilters.length === 1) {
      this.props.lists.forEach(x => {
        let newTags = x.tags.split(" ");
        if (newTags.includes(filter)) {
          newList.push(x);
        }
      });
      ev.target.filter.value = '';
    } else if(mulFilters.length > 1){
        this.props.lists.forEach(x => {
            let newTags = x.tags.split(' ');
            for(let i=0; i<mulFilters.length; i++){
                if(newTags.includes(mulFilters[i])){
                    newList.push(x);
                }
            }
            ev.target.filter.value = '';
        })
    }

    this.setState({
      filteredList: [...newList]
    });
  };

  renderFilteredList = () => {
    if(this.state.filteredList.length == 0) {
        return this.props.lists.map(list => {
            return (
                <div key={Math.random()}>
                  <Link to={`/list/${list.id}`}>
                      <h4>{list.name}</h4>
                      <p>{list.tags}</p>
                  </Link>
                </div>
            )
        })
    } else if(this.state.filteredList.length > 0) {
        return this.state.filteredList.map(list => {
            return (
                <div key={Math.random()}>
                  <Link to={`/list/${list.id}`}>
                    <h4>{list.name}</h4>
                    <p>{list.tags}</p>
                  </Link>
                    
                </div>
            )
        })
    }
  }


  render() {
    console.log('props in the ListBy Tags component',this.props)
    return (
      <div>
        <form onSubmit={this.handleFilter}>
          <button type="submit">Filter</button>
          <input type="text" placeholder="#abc#123" name="filter"></input>
        </form>
        <h4>Browse Lists</h4>
        {this.renderFilteredList()}
      </div>
    );
  }
}

export default ListByTags;
