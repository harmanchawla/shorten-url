import React, { Component } from 'react';
import './App.css';
import Grid  from '@material-ui/core/Grid';
import URLForm from './URLForm';
import firebase from './firebase-config';

class App extends Component {

  componentDidMount() {
    let path = window.location.pathname;
    const shortURL = path.substring(1);

    if (shortURL) {
      let originalURL = '';

      const db = firebase.firestore();
      const URLRef = db.collection('urlLookup').doc(shortURL);
      
      URLRef
        .get()
        .then(function (docSnapshot) {
          if (docSnapshot.exists) {
            // forward to the news page
            URLRef.onSnapshot((doc) => {
              originalURL = doc.data().originalURL;
              window.location.replace(originalURL);
            });
          } else {
            // No doc exists. Ignore the path.
          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
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
