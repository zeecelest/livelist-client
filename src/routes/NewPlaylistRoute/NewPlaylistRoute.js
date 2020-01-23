import React, { Component } from 'react';
import NewPlaylistForm from '../../components/NewPlaylistForm/NewPlaylistForm';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handlePlaylistCreation = () => {
    const { history } = this.props;
    //TODO this needs to point to the user dashboard
    history.push('/dashboard');
  };

 theme = createMuiTheme({
  palette: {
      accent1Color: '#ec407a'
  },
});

  render() {
    return (
      <section>
        <h2 className="signUpFormTitle">New Playlist</h2>
        <MuiThemeProvider theme={this.theme}>
          <NewPlaylistForm onPlaylistCreation={this.handlePlaylistCreation} />
        </MuiThemeProvider>
      </section>
    );
  }
}

export default RegistrationRoute;
