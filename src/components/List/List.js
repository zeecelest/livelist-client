import React, { Component } from "react";
import LikeButton from "../LikeButton/likeButton";
import "./List.css";
import {Link} from 'react-router-dom'
import { Icon } from '@iconify/react';
import timesCircle from '@iconify/icons-fa-regular/times-circle';
import editIcon from '@iconify/icons-fa-regular/edit';

export class List extends Component {
  render() {
    if(this.props.filtered){
      return(
        <div key={Math.random()} className="listItem filtered">
        <Link to={`/list/${this.props.id}`}>
          <h4 className="filteredListName">{this.props.name}</h4>
        </Link>
        <p className="filteredListTag">{this.props.tags}</p>
      </div>
      )
    }
    else if (this.props.user_id) {
 return (     
      <div  className="listItem users">
        <p className="userListTitle">
          {console.log('this is the props for list item in the user List to pass to edit =>', this.props)}
          <Link to={`/list/${this.props.user_id}`} className="userListTitle">
            {this.props.name}
          </Link>
        </p>

        <div className="userlist-buttons">
          <button className="userlist-btn">
            <Link
              to={{
                pathname: `/updateList/${this.props.user_id}`,
                props: {
                  userList: this.props.userList
                }
              }}
            >
              <Icon icon={editIcon} className="editIcon" />
            </Link>
          </button>
          {this.props.checkLength === 0 && this.props.user_id ? (
            <button
              className="userlist-btn"
              onClick={() => this.props.handleDeletePlaylist(this.props.user_id)}
            >
              <Icon icon={timesCircle} className="timesIcon" />
            </button>
          ) : (
            <button className="userlist-btn" disabled={true}>
              <Icon icon={timesCircle} className="timesIcon" />
            </button>
          )}
        </div>
      </div>
      )
    }
    else if (this.props.liked) {
      return (
        <div id={this.props.id} className={this.props.className}>
        <Link to={`/list/${this.props.id}`}>
           <h5 className="list-name">{this.props.name}</h5>
        </Link>
          <LikeButton
            id={this.props.id}
            likes={this.props.likes}
            liked={this.props.liked}
            handleLikeButton={this.props.handleLikeButton}
          />
        </div>
      );
    } else {
      return (
        <div id={this.props.id} className={`listItem ${this.props.addClass}`}>
        <Link to={`/list/${this.props.id}`}>
           <h5 className="list-name">{this.props.name}</h5>
        </Link>
        </div>
      );
    }
  }
}

export default List;
