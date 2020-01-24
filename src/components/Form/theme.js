import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import getMuiTheme from '@material-ui/styles/getThemeProps/getThemeProps'

import NewPlaylistFrom from '../NewPlaylistForm/NewPlaylistForm'
// {
//     "palette": {
//         "accent1Color": "#ec407a"
//     }
// }

const muiTheme = getMuiTheme({
    palette: {
        "accent1Color": "#ec407a"
    },
  });

  const Main = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
      <NewPlaylistFrom />
    </MuiThemeProvider>
  );

  export default Main;
