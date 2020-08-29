import React, {Component}from 'react';
import {white} from "color-name";
import {Card,Table,Form,Button,Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faSave, faPlusSquare, faUndo, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";

class Professor extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.method = "";
        this.submitProfessor = this.submitProfessor.bind(this);
        this.professorChange = this.professorChange.bind(this);
    }

    initialState = {
       id:'',name:'', gender:'', department:''
    };

    componentDidMount() {
        const professorID = this.props.match.params.id;
        if (professorID){
            this.findProfessorByID(professorID);
        }
    }

    findProfessorByID = (professorID) => {
        fetch("http://localhost:8080/getById_professor/"+professorID)
            .then(response => response.json())
            .then(response => {
                if (response){
                    this.setState({
                        id: response.id,
                        name: response.name,
                        gender: response.gender,
                        department: response.department
                    });
                }
            }).catch((error) => {
            console.error("Error"+error);
        });

    };

    // findProfessorByID = (prof_id) => {
    //     axios.get("http://localhost:8080/getById_professor/"+prof_id)
    //         .then(response => {
    //            if (response.data != null){
    //                this.setState({
    //                    id: response.data.id,
    //                    name: response.data.name,
    //                    gender: response.data.gender,
    //                    department: response.data.department
    //                });
    //            }
    //         }).catch((error) => {
    //                 console.error("Error"+error);
    //         });
    //
    // };

    updateProfessor = event => {
        event.preventDefault();

        const professor = {
            id: this.state.id,
            name: this.state.name,
            gender: this.state.gender,
            department: this.state.department
        };

        axios.put("http://localhost:8080/update_professor", professor)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true,"method":"put"});
                    setTimeout(() =>  this.setState({"show":false}), 2000);
                    setTimeout(() =>  this.professorList(), 1000);
                }else{
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);

    };


    submitProfessor = event => {
        event.preventDefault();

        const professor = {
            name: this.state.name,
            gender: this.state.gender,
            department: this.state.department
        };

        axios.post("http://localhost:8080/save_professor", professor)
             .then(response => {
                if (response.data != null){
                    this.setState({"show":true,"method":"post"});
                    setTimeout(() =>  this.setState({"show":false}), 3000);
                }else{
                    this.setState({"show":false});
                }
        });

        this.setState(this.initialState);

    };

    professorChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    resetProfessor = () => {
        this.setState(()=>this.initialState);
    };

    professorList = () => {
        return this.props.history.push("/professors");
    };

    render() {

        const {name,gender,department} = this.state

        return (

            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Professor Updated Successfully":"Professor Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Professor" : "Add Professor"}</Card.Header>
                    <Form onReset={this.resetProfessor} onSubmit={this.state.id ? this.updateProfessor : this.submitProfessor} id="profFormID">
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
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.professorList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Professor List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Professor;