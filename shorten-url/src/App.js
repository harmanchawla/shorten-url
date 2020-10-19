import React, { Component } from 'react';
import './App.css';
import Grid  from '@material-ui/core/Grid';
import URLForm from './URLForm';

class App extends Component {

  componentDidMount() {

    console.log(window.location.pathname);
  }

  render() {
    return (

        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh', minWidth: '20vw' }}
        >
          <Grid item>
            <h2>Rethink: Shorten URL </h2>
          </Grid>
          <Grid item>
            <URLForm />
          </Grid>

        </Grid> 

    );
  }
}

export default App;
