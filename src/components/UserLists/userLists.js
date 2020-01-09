import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'

export class UserLists extends Component {
  static contextType = PlayListContext;

  renderUserList(){
    return <div> </div>
  }

  render() {
    return <div>
            <Link to = {'/userlist'} >
                <Button>
                    Click Me
                </Button>
            </Link>
              {this.renderUserList()}
          </div>;
  }

}

export default UserLists;
