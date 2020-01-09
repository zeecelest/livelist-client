import React, { Component } from "react";
import NewPlaylistForm from "../../components/NewPlaylistForm/NewPlaylistForm";

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handlePlaylistCreation = () => {
    const { history } = this.props;
    //TODO this needs to point to the user dashboard
    history.push("/dashboard");
  };

  render() {
    return (
      <section>
        <h2>Sign up</h2>
        <NewPlaylistForm onPlaylistCreation={this.handlePlaylistCreation} />
      </section>
    );
  }
}

export default RegistrationRoute;
