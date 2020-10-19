import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = (theme) => ({
    table: {
        width: '700px',
        fontSize: '16px'
    },
    tablecell: {
        fontSize: '16px',
    },
    button: {
        fontSize: '20px',
        color: '#4285f4',
        background: 'transparent',
        border: 'None',
        cursor: 'pointer'
    }
});

class URLTable extends Component {

    render() {
        const { classes } = this.props;
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tablecell}>
                                Original URL
                            </TableCell>
                            <TableCell align="left" className={classes.tablecell}>
                                Shortened URL
                            </TableCell>
                            <TableCell align="right" className={classes.tablecell}>
                                Copy
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.rows.map((row) => (
                            <TableRow key={row.URL} >
                                <TableCell component="th" scope="row" className={classes.tablecell}>
                                    {row.URL}
                                </TableCell>
                                <TableCell align="left" className={classes.tablecell}>
                                    <a href={row.shortURL} target="_blank" rel="noopener noreferrer" >
                                        {row.shortURL}
                                    </a>
                                </TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    <button className={classes.button}
                                        onClick={()=> navigator.clipboard.writeText(row.shortURL)}>
                                        <i class="copy outline icon"></i>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}


URLTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(URLTable);