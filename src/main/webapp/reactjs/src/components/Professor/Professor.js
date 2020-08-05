import React, {Component}from 'react';
import {white} from "color-name";
import {Card,Table,Form,Button,Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faSave,faPlusSquare,faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";

class Professor extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.submitProfessor = this.submitProfessor.bind(this);
        this.professorChange = this.professorChange.bind(this);
    }

    initialState = {
       name:'', gender:'', department:''
    }

    submitProfessor = event =>{
        event.preventDefault();

        const professor = {
            name: this.state.name,
            gender: this.state.gender,
            department: this.state.department
        };

        axios.post("http://localhost:8080/save_professor", professor)
             .then(response => {
                if (response.data != null){
                    this.setState({"show":true});
                    setTimeout(() =>  this.setState({"show":false}), 3000);
                }else{
                    this.setState({"show":false});
                }
        });

        this.setState(this.initialState);

    }

    professorChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    resetProfessor = () => {
        this.setState(()=>this.initialState);
    }

    render() {

        const {name,gender,department} = this.state

        return (

            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {"Professor Saved Successfully."}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add Professor</Card.Header>
                    <Form onReset={this.resetProfessor} onSubmit={this.submitProfessor} id="profFormID">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="name"
                                                  value={name}
                                                  onChange={this.professorChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Full Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="gender"
                                                  value={gender}
                                                  onChange={this.professorChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Gender" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="department"
                                                  value={department}
                                                  onChange={this.professorChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Department" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> Submit
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Professor;