import React, { Component } from 'react';
import NewSpotForm from '../../components/NewSpotForm/NewSpotForm';

class NewSpotRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleSpotCreation = () => {
    const { history } = this.props;
    history.push(`/list/${this.props.location.props.list_id}`);
  };

  render() {
    return (
      <section>
        <h2 className="addingNewSpot">Adding New Spot</h2>
        <NewSpotForm
          onSpotCreation={this.handleSpotCreation}
          location={this.props.location}
        />
      </section>
    );
  }
}
export default NewSpotRoute;
