// is given access to ALL lists through props
// Filters the array of lists to show those with matching filters
import React, { Component } from "react";
const payload = [
  {
    list_name: "cool santa monica hangouts",
    list_id: 1,
    tags: "#sick #closeToWes #123"
  },
  {
    list_name: "Late Night Taco Bells",
    list_id: 2,
    tags: "#sick #cheapeats #911"
  }
];

export class ListByTags extends Component {
  state = {
    lists: payload,
    filter: "",
    filteredList: []
  };
  //Currently it's able to filter the lists.
  //TODO add more to get a better sample group
  // add functionality to search by more than 1 filter accounting for spaces or no spaces
  // setup a render to show the filtered lists and not show the all lists.
  handleFilter = ev => {
    ev.preventDefault();
    let filter = ev.target.filter.value;
    let newList = [];
    let mulFilters = filter.split(" ");
    if (mulFilters.length === 1) {
      this.state.lists.forEach(x => {
        let newTags = x.tags.split(" ");
        if (newTags.includes(filter)) {
          newList.push(x);
        }
      });
      ev.target.filter.value = '';
    } else if(mulFilters.length > 1){
        this.state.lists.forEach(x => {
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
        return this.state.lists.map(list => {
            return (
                <div key={Math.random()}>
                    <h4>{list.list_name}</h4>
                    <p>{list.tags}</p>
                </div>
            )
        })
    } else if(this.state.filteredList.length > 0) {
        return this.state.filteredList.map(list => {
            return (
                <div key={Math.random()}>
                    <h4>{list.list_name}</h4>
                    <p>{list.tags}</p>
                </div>
            )
        })
    }
  }


  render() {
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
