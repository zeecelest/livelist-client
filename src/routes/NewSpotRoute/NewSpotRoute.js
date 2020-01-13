import React, {Component} from 'react';
import NewSpotForm from '../../components/NewSpotForm/NewSpotForm';

class NewSpotRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleSpotCreation = () => {
    const {history} = this.props;
    history.push('/dashboard');
  };

  render() {
    return (
      <section>
        <NewSpotForm  
          onSpotCreation={this.handleSpotCreation} 
          location={this.props.location}
        />
      </section>
    );
  }
}
export default NewSpotRoute;