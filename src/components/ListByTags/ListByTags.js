// is given access to ALL lists through props
// Filters the array of lists to show those with matching filters
import React, { Component } from "react";
const payload = {
  list_name: "cool santa monica hangouts",
  list_id: 1,
  tags: "#sick #closeToWes #123",
  created_by: "admin",
  liked: 10,
  tried: 100,
  spots: [
    {
      id: 1,
      name: "Chips Fries Hut",
      tags: "#bestdrinks #goodmusic",
      address: "1214 Idaho Ave",
      city: "Santa Monica",
      state: "CA",
      lat: 34.029494,
      lng: -118.494998
    },
    {
      id: 2,
      name: "Dales Gun Hut",
      tags: "#goodAmmo",
      address: "914 Arizona Ave",
      city: "Santa Monica",
      state: "CA",
      lat: 34.021921,
      lng: -118.491421
    },
    {
      id: 3,
      name: "Tongva Park",
      tags: "#views #parking",
      address: "123 2nd st.",
      city: "Santa Monica",
      state: "CA",
      lat: 34.010173,
      lng: -118.493236
    },
    {
      id: 4,
      name: "Tent city",
      tags: "#tents",
      address: "1814 10th St",
      city: "Santa Monica",
      state: "CA",
      lat: 34.014723,
      lng: -118.482605
    },
    {
      id: 5,
      name: "Tent city",
      tags: "#tents",
      address: "1814 10th St",
      city: "Santa Monica",
      state: "CA",
      lat: 34.014723,
      lng: -118.482605
    },
    {
      id: 6,
      name: "UCLA hospital",
      tags: "#needles",
      address: "1256 15th st.",
      city: "Santa Monica",
      state: "CA",
      lat: 34.026924,
      lng: -118.487266
    }
  ]
};

export class ListByTags extends Component {
  state = {
    lists: [payload],
    filter: "",
    filteredList:[]
  };

  handleFilter = ev => {
    ev.preventDefault();
    const filter = ev.target.filter.value;
    let newList = []
    console.log(this.state.lists)
    this.state.lists.forEach(x =>{
        let newTags = x.tags.split(' ')
        console.log(newTags)
        if(newTags.includes(`#${filter}`)){
            newList.push(x)
        } else {
            newList.push('ytho')
        }
    })
   this.setState({
       filteredList: newList
   }) 
  };

  render() {
    return (
      <div>
          {console.log(this.state)}
        <form onSubmit={this.handleFilter}>
          <button type="submit">Filter</button>
          <input type="text" placeholder="#abc#123" name="filter"></input>
        </form>
      </div>
    );
  }
}

export default ListByTags;
