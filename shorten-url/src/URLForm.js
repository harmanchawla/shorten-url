import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import URLTable from './URLTable';

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


    handleSubmit = async event => {
        event.preventDefault();
        await this.addShortURL();
        //this.setState({ url: event.target.value, shortURL: event.target.value});
        // make POST request
        const { URL, shortURL, open } = this.state;
        console.log(URL, shortURL, open);

        if (URL.length === 0) {
            return;
        }

        this.rows.push({URL, shortURL});
    };
    

    // dev 
    async addShortURL() {
        this.setState({shortURL: this.state.URL});
    }

    createRow = (url, shortURL) => {
        return { url, shortURL }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false});
    };

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