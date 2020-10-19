import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import URLTable from './URLTable';
import firebase from './firebase-config';

const styles = (theme) => ({
    root: {
        width: '100%',
    },
    input: {
        width: '600px', 
        boxShadow: 'inset 4px 6px 10px 0 #c4c5ce, inset -4px -6px 10px 0 #fffff',
        fontSize: '18px',
        outline: 'None', 
        border: 'None', 
        marginLeft: '12px',
        paddingLeft: '2px',
        marginBottom: '2px', 
    }, 
    form: {
        border: '1px solid transparent', 
        boxShadow: '0 4px 12px rgba(32,33,36,.28)',
        padding: '12px', 
        borderRadius: '40px', 
        display: 'flex', 
        position: 'relative'
    }, 
    button: {
        fontSize: '24px', 
        color: '#4285f4',   
        background: 'transparent', 
        border: 'None', 
        cursor: 'pointer',
        right: '0', 
        position: 'absolute', 
        marginRight: '5px', 
        marginTop: '-2px',
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class URLForm extends Component {

    state = {
        URL: '',
        shortURL: '',
        open: false,
    };

    rows = [];
    base = "https://rethink-efc70.web.app/";

    handleSubmit = async event => {
        event.preventDefault();
        const URL  = this.state.URL;

        if (URL.length === 0) {
            return;
        }

        if(!this.validURLHelper(URL)) {
            alert("Please enter a valid URL");
            return;
        }

        await this.firebaseUtil(URL);
    };
    

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false});
    };

    validURLHelper = (URL) => {
        var pattern = new RegExp('^(:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(URL);
    }

    firebaseUtil = async (URL) => {
        const db = firebase.firestore();
        const URLRef = db.collection('urlLookup');

        URLRef.add({
            originalURL: URL
        })
        .then((docRef) => {
            const shortURL = this.base + docRef.id;
            this.changeRows(URL, shortURL);
            navigator.clipboard.writeText(shortURL);
            this.setState({open: true});
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    changeRows = (URL, shortURL) => {
       this.rows.push({'URL': URL, 'shortURL': shortURL});
       console.log("Here: ", this.rows)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.form}>
                    <form 
                        autoCapitalize="off" 
                        autoComplete="off" 
                        autoCorrect="off" 
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <input
                            placeholder="Paste or enter the URL"
                            type="text"
                            className={classes.input}
                            value={this.state.URL}
                            onChange={ev => this.setState({URL: ev.target.value})}
                        />

                        <button onClick={this.handleSubmit.bind(this)} className={classes.button}>
                            <i class="arrow right icon"></i>
                        </button>
                    </form>
                </div>
                <br /> <br />

                <URLTable rows={this.rows} />

                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Short link copied to clipboard
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

URLForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(URLForm);