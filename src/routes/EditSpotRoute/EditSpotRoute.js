import React, {Component} from 'react';
import EditSpotForm from '../../components/EditSpotForm/EditSpotForm';

class EditSpotRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleSpotUpdate = () => {
    const {history} = this.props;
    history.push('/dashboard');
  };

  render() {
    return (
      <section>
        <EditSpotForm  
          onSpotUpdate={this.handleSpotUpdate} 
          location={this.props.location}
        />
      </section>
    );
  }
}
export default EditSpotRoute;
