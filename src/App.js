import React, { Component } from 'react';
import MoviePage from './js/components/movie-page';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <MoviePage />
      </MuiThemeProvider>
    );
  }
}

export default App;