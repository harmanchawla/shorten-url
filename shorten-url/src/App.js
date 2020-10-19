import React, { Component } from 'react';
import './App.css';
import { Segment } from 'semantic-ui-react';
import Grid  from '@material-ui/core/Grid';
import URLForm from './URLForm';
import { Paper } from '@material-ui/core';


class App extends Component {

  render() {
    return (
      <Paper>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh', minWidth: '20vw' }}
        >

          <Grid item>
            <URLForm />
          </Grid>

        </Grid> 
      </Paper>
    );
  }
}

export default App;
