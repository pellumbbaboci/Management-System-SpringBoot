import React ,{Component} from 'react';

import {Card, Table} from "react-bootstrap";
import {Jumbotron} from 'react-bootstrap';


function Welcome(props) {
    return (
        <React.Fragment>
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to Management System</h1>
                <blockquote className="blockquote mb-0">
                    <p>
                        Good Management system good relationships
                    </p>
                    <footer className="blockquote-footer">
                        Pellumb Baboci
                    </footer>
                </blockquote>
            </Jumbotron>
            <Card>
                <Card.Header className={"border border-dark bg-dark text-white"}>
                    asdasd
                </Card.Header>
                <Card.Body className={"border border-dark bg-dark text-white"}>

                    <Table striped bordered hover variant="dark">
                        <thead>
                        Add the chart
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default Welcome;