import React, { Component } from 'react';
// import './App.css';
import PropTypes from 'prop-types';
// import ListByTags from '../ListByTags/ListByTags';
import '../ListByTags/ListByTags.css';
// import Fragment from 'react-dot-fragment'

export class AutoComplete extends Component {
  static propTypes = {
    tags: PropTypes.instanceOf(Array).isRequired
  };

  state = {
    activeTags: 0,
    filteredTags: [],
    showTag: false,
    userInput: ''
  };

  onChange = e => {
    const { tags } = this.props;
    const userInput = e.currentTarget.value;

    const filteredTags = tags.filter(
      tag => tags.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeTags: 0,
      filteredTags,
      showTag: true,
      userInput: ''
    });
  };

  // onClick = (e) => {
  //     this.setState({
  //         activeTags: 0,
  //         filteredTags: [],
  //         showTag: false,
  //         userInput: e.currentTarget.innerText
  //     });
  // }

  //Handles keyDown events, which are the same as the click event.
  onKeyDown = e => {
    const { activeTags, filteredTags } = this.state;
    //Return is the 13th key, select the value and it enters into the input field
    if (e.keyCode === 13) {
      this.setState({
        activeTags: 0,
        showSuggestions: false,
        userInput: filteredTags[activeTags]
      });
      //The up arrow is key number 38, which will select the upper option. Won't go above first.
    } else if (e.keyCode === 38) {
      if (activeTags === 0) {
        return;
      }
      //The down arrow is key number 40, which will select the lower option. Won't go above last.
      this.setState({ activeTags: activeTags - 1 });
    } else if (e.keyCode === 40) {
      if (activeTags - 1 === filteredTags.length) {
        return;
      }

      this.setState({ activeTags: activeTags + 1 });
    }
  };

  render() {
    const {
      onChange,
      // onClick,
      onKeyDown,
      userInput,
      state: { activeTags, filteredTags, showTag }
    } = this;

    let tagList;

    if (showTag && userInput) {
      if (filteredTags.length) {
        tagList = (
          <ul className="tags">
            {filteredTags.map((tagName, index) => {
              return (
                <li key={tagName} onClick={this.onClick}>
                  {tagName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        tagList = (
          <div className="no-tag">
            <em>No Tags</em>
          </div>
        );
      }
    }

    // let className;
    // if(index === activeTags) {
    //     className = 'tag-active';
    // }
    // return (
    //     <li className={className} key={tagName} onClick={onClick}>
    //         {tagName}
    //     </li>
    //                     );
    //                 })}
    //             </ul>
    //         );
    //     }
    // }
    return (
      <React.Fragment>
        <div className="filterByTag">
          <input
            type="text"
            className="filterBox"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <input type="submit" value="" className="filter-btn" />
          {tagList}
        </div>
      </React.Fragment>
    );
  }
}

export default AutoComplete;
