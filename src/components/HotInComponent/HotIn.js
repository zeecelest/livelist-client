import React, { Component } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "./HotIn.css";
import LikeButton from '../LikeButton/likeButton';

export class HotIn extends Component {
  // likes: "0"
  // liked_by_user: "0"
  // on_fire: "0"
  // id: 6
  // name: "Wesley Jacobs"
  // tags: "#my times"
  // city: "Los_Angeles"
  // state: "CA"
  // is_public: true
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

  renderHotLists = () => {
    let sortedListByLikes = this.mergeSort(this.props.allLists);
    if (this.props.allLists.length === 0) {
      return <h2>No Lists.</h2>;
    }

    // TODO: determine which like button to render
    if (this.props.allLists.length > 0) {
      return (
        <div className="display-hotIn">
          {sortedListByLikes.map((item, idx) => {
            if (item.liked_by_user == 1) {
              return (
                <div key={item.id} className="listItem hot">
                  <h5 className="hotListTitle">{item.name}</h5>
                <LikeButton 
                  id={item.id}
                  liked={item.liked_by_user}
                />
                  <p>{item.likes}</p>
                </div>
              );
            } else {
              return (
                <div key={idx} className="listItem hot">
                  <h5 className="hotListTitle">{item.name}</h5>
                  <LikeButton 
                  id={item.id}
                  liked={item.liked_by_user}
                />
                  <p>{item.likes}</p>
                </div>
              );
            }
          })}
        </div>
      );
    }
  };
  //
  //className={likedIcon}
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
