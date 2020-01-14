import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./listPage.css";
import ScrollContainer from "react-indiana-drag-scroll";
import loadingAnimation from "../../components/Assets/loadingAnimation.gif";

export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: [],
    listInfo: [],
    loading: false
  };

  renderSpot = () => {
    return this.state.spots.map(spot => (
      <div id={spot.name}>
        <Spot
          key={Math.random()}
          name={spot.name}
          id={spot.name}
          address={spot.address}
          city={spot.city}
          state={spot.state}
          tags={spot.tags}
        />
      </div>
    ));
  };

  renderListName = () => {
    if (this.state.listInfo) {
      return <h4 className="myListName">{this.state.listInfo.list_name}</h4>;
    } else {
      return <div> </div>;
    }
  };

  renderMap = () => {
    return <Map spots={this.state.spots} id="map" />;
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    //TODO:Once Api call is set turn this back on
    this.setState({
      loading: true
    });
    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        this.setState({
          spots: spotsServer.spots,
          listInfo: spotsServer
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
      })
      .catch(this.context.setError);
  }

  renderForLoading = () => {
    if (this.state.loading) {
      return (
        <div className="loadingContainer">
          <img
            src={loadingAnimation}
            alt="loading"
            className="loadingAnimation"
          ></img>
          <h3 className="loadingText">Loading...</h3>
        </div>
      );
    } else {
      return (
        <div>
          {this.renderMap()}
          {this.renderListName()}
          <div className="spotContainer">
            {this.renderSpot(this.state.spots)}
          </div>
          <Button>
            <Link
              to={{
                pathname: "/newSpot",
                props: {
                  list_id: this.props.match.params.id
                }
              }}
            >
              New Spot
            </Link>
          </Button>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderForLoading()}</div>;
  }
}

export default ListPage;
