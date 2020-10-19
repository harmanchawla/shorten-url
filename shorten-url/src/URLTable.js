import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class URLTable extends Component {

    state = {
        urls: this.props.links,
    };

    populateTable = (urls) => {
        // console.log(this.props.links);
        return urls.map( link => {
            return (
                <Table.Row>
                    <Table.Cell> { link.url } </Table.Cell>
                    <Table.Cell> { link.shortenURL } </Table.Cell>
                </Table.Row>
            );
        })
    }

    render() {
        return (
            <Table basic='very'>
                <Table.Header>
                    <Table.HeaderCell> URL </Table.HeaderCell>
                    <Table.HeaderCell> Shorten URL </Table.HeaderCell>
                    <Table.HeaderCell> </Table.HeaderCell>
                </Table.Header>

                <Table.Body>
                    {this.populateTable}
                </Table.Body>
            </Table>
        );
    }
}

export default URLTable;