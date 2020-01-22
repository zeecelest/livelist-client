import React, { Component } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "./HotIn.css";
import LikeButton from '../LikeButton/likeButton';
import ListsApiService from "../../services/lists-api-service";
import List from '../List/List';
import Select from '../Form/Select';


export class HotIn extends Component {
state = {
  list: this.props.allLists,
  updated: false,
  cities:[],
  filtered: []
}

  merge = (left, right, array) => {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].likes > right[rightIndex].likes) {
        array[outputIndex++] = left[leftIndex++];
      } else {
        array[outputIndex++] = right[rightIndex++];
      }
    }
    for (let i = leftIndex; i < left.length; i++) {
      array[outputIndex++] = left[i];
    }
    for (let i = rightIndex; i < right.length; i++) {
      array[outputIndex++] = right[i];
    }
    return array;
  };

  mergeSort = array => {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = this.mergeSort(left);
    right = this.mergeSort(right);
    return this.merge(left, right, array);
  };

componentDidMount(){
  let cityOptions = this.props.allLists.map(list =>{
    return list.city
  })
  let uniq = [...new Set(cityOptions)];
  this.setState({
    list: this.mergeSort(this.props.allLists),
    cities: uniq
  })
}



handleToggleLike = () =>{
  this.setState(prevState => ({
    list: { 
        ...prevState.list,   
        updated: !this.state.updated
    }
}))
}


handleLikeButton = ev => {
  ev.preventDefault();
  let id = ev.target.id;
  ListsApiService.toggleLike(id)
    .then(like => {
      return this.setState({
        state: !this.state.updated
      });
    })
    .catch(() => console.log("error"));
};

onSelectChange= (ev)=>{
  ev.preventDefault();
  let filteredList = this.state.list.filter(list => list.city == ev.target.value)
  this.setState({
    filtered: filteredList
  })
}

  renderHotLists = () => {
    if (this.state.list === []) {
      return <h2>No Lists.</h2>;
    }
    if (this.state.filtered.length > 0) {
      return (
        <div className="display-hotIn">
          {this.state.filtered.map((item, idx) => {
              return (
                <List
                  key={item.id} 
                  className={'listItem hot'}
                  name={item.name} 
                  id={item.id} 
                  liked={item.liked_by_user}
                  likes={item.likes}
                  handleLikeButton={this.handleLikeButton}
                  >
                </List>
              );
          })}
        </div>
      );
    }


    if (this.state.list.length > 0) {
      return (
        <div className="display-hotIn">
          {this.state.list.map((item, idx) => {
              return (
                <List
                  key={item.id} 
                  className={'listItem hot'}
                  name={item.name} 
                  id={item.id} 
                  liked={item.liked_by_user}
                  likes={item.likes}
                  handleLikeButton={this.handleLikeButton}
                  >
                </List>
              );
          })}
        </div>
      );
    }

  };

  render() {
    return (
      <section className="hotListSection">
        <div className='hotInSelectContainer'>
        <h2 className="hotListTitle">Hot in</h2>
        <Select
            id="hotInSelect"
            label="City"
            name="City"
            onChange={this.onSelectChange}
            options={this.state.cities}
          />
        </div>
        <ScrollContainer
          className="hotListContainer"
          horizontal={true}
          vertical={false}
          hideScrollbars={true}
          activationDistance={50}
          nativeMobileScroll={true}>
          {this.renderHotLists()}
        </ScrollContainer>
      </section>
    );
  }
}

export default HotIn;
