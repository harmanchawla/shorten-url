import React, { Component } from 'react';
import { Input, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    input: {
        width: '30vw', 
        boxShadow: 'inset 4px 6px 10px 0 #c4c5ce, inset -4px -6px 10px 0 #fffff',
        font: '20px',
        marginRight: '20px'
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function URLForm() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <form autoCapitalize="off" autoComplete="off" autoCorrect="off">
                <Input
                    placeholder="Paste or enter the URL here"
                    className={classes.input}
                />

                <Button variant="outlined" onClick={handleClick}>
                    Shortern
                </Button>
            </form>
            
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Short link copied to clipboard
            </Alert>
            </Snackbar>
        </div>
    );
}

export default URLForm;