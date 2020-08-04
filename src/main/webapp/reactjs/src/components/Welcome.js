import React ,{Component} from 'react';

import {Jumbotron} from 'react-bootstrap';


function Welcome(props) {
    return (
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
    );
}

export default Welcome;