import React, { Component } from "react";
import NewSpotForm from '../../components/NewSpotForm/NewSpotForm';

class NewSpotRoute extends Component {
    static defaultProps = {
        history: {
          push: () => {}
        }
    };
    
    handleSpotCreation = () => {
        const { history } = this.props;
        history.push('/newSpot')
    };

    render() {
        return (
            <section>
                <NewSpotForm onSpotCreation={this.handleSpotCreation}/>
            </section>  
        )
    }
}
export default NewSpotRoute;