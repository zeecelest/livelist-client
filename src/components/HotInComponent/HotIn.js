import React, { Component } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "./HotIn.css";
import LikeButton from '../LikeButton/likeButton';
import ListsApiService from "../../services/lists-api-service";

export class HotIn extends Component {
state = {
  list: this.props.allLists,
  updated: false
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
  this.setState({
    list: this.mergeSort(this.props.allLists)
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
  let id = ev.target.id;
  ListsApiService.toggleLike(`${id}`)
    .then(like => {
      return this.setState({
        updated: !this.state.updated
      });
    })
    .catch(() => console.log("error"));
    
};

  renderHotLists = () => {
    if (this.state.list === []) {
      return <h2>No Lists.</h2>;
    }
    if (this.state.list.length > 0) {
      return (
        <div className="display-hotIn">
          {this.state.list.map((item, idx) => {
            if (item.liked_by_user == 1) {
              return (
                <div key={item.id} className="listItem hot">
                  <h5 className="hotListTitle">{item.name}</h5>
                <LikeButton 
                  id={item.id}
                  handleLikeButton={this.handleLikeButton}
                  liked={item.liked_by_user}
                  likes={item.likes}
                />
                </div>
              );
            } else {
              return (
                <div key={idx} className="listItem hot">
                  <h5 className="hotListTitle">{item.name}</h5>
                  <LikeButton 
                  id={item.id}
                  handleLikeButton={this.handleLikeButton}
                  liked={item.liked_by_user}
                  likes={item.likes}
                />
                </div>
              );
            }
          })}
        </div>
      );
    }

  };

  render() {
    return (
      <section className="hotListSection">
        <h2 className="hotListTitle">Hot Lists</h2>
        <ScrollContainer
          className="hotListContainer"
          horizontal={true}
          activationDistance={1}
          nativeMobileScroll={true}
        >
          {this.renderHotLists()}
        </ScrollContainer>
      </section>
    );
  }
}

export default HotIn;
