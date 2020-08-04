import React, {Component}from 'react';
import {white} from "color-name";
import {Card,Table,Form,Button,Col} from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faSave,faPlusSquare} from '@fortawesome/free-solid-svg-icons';

class Professor extends Component {

    constructor(props) {
        super(props);
        this.state = {name:'',gender:'',department:''};
        this.submitProfessor = this.submitProfessor.bind(this);
        this.professorChange = this.professorChange.bind(this);
    }

    submitProfessor(event){
        alert('Name:'+ this.state.name+' Gender:'+this.state.gender+' Department:'+this.state.department);
        event.preventDefault();

    }

    professorChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>

                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add Professor</Card.Header>

                <Form onSubmit={this.submitProfessor} id="profFormID">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required
                                      type="text" name="name"
                                              value={this.state.name}
                                              onChange={this.professorChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Full Name" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control required
                                    type="text" name="gender"
                                              value={this.state.gender}
                                              onChange={this.professorChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Full Name" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDepartment">
                                <Form.Label>Department</Form.Label>
                                <Form.Control required
                                    type="text" name="department"
                                              value={this.state.department}
                                              onChange={this.professorChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Full Name" />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Submit
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>

        );
    }
}

export default Professor;