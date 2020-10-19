import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import URLForm from './URLForm';
import firebase from './firebase-config';

class App extends Component {

  componentDidMount() {

    // get the pathname from current URL
    const path = window.location.pathname;
    // remove the leading forward slash
    const shortURL = path.substring(1);

    if (shortURL) {
      let originalURL = '';

      const db = firebase.firestore();

      // reference to the document with the name same as the URL path
      const URLRef = db.collection('urlLookup').doc(shortURL);

      URLRef
        .get()
        .then(function (docSnapshot) {
          if (docSnapshot.exists) {
            // forward to the news page
            URLRef.onSnapshot((doc) => {
              originalURL = doc.data().originalURL;

              if (originalURL.includes("://")) {
                // URL link aleady has a protocol 
                window.location.href = originalURL;
              } else {
                // assumption: HTTP works for the URL 
                window.location.href = "http://" + originalURL;
              }

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
