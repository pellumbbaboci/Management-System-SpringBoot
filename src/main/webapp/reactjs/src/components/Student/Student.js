import React, {Component}from 'react';
import {white} from "color-name";
import {Card,Table,Form,Button,Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faSave, faPlusSquare, faUndo, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";

class Student extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.method = "";
        this.submitStudent = this.submitStudent.bind(this);
        this.studentChange = this.studentChange.bind(this);
    }

    initialState = {
       id:'',name:'', gender:'', department:''
    };

    componentDidMount() {
        const studentID = this.props.match.params.id;
        if (studentID){
            this.findStudentByID(studentID);
        }
    }

    findStudentByID = (studentID) => {
        axios.get("http://localhost:8080/getById_student/"+studentID)
            .then(response => {
               if (response.data != null){
                   this.setState({
                       id: response.data.id,
                       name: response.data.name,
                       gender: response.data.gender,
                       department: response.data.department
                   });
               }
            }).catch((error) => {
                    console.error("Error"+error);
            });

    };

    updateStudent = event => {
        event.preventDefault();

        const student = {
            id: this.state.id,
            name: this.state.name,
            gender: this.state.gender,
            department: this.state.department
        };

        axios.put("http://localhost:8080/update_student", student)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true,"method":"put"});
                    setTimeout(() =>  this.setState({"show":false}), 2000);
                    setTimeout(() =>  this.studentList(), 1000);
                }else{
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);

    };


    submitStudent = event => {
        event.preventDefault();

        const student = {
            name: this.state.name,
            gender: this.state.gender,
            department: this.state.department
        };

        axios.post("http://localhost:8080/save_student", student)
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

    studentChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    resetStudent = () => {
        this.setState(()=>this.initialState);
    };

    studentList = () => {
        return this.props.history.push("/students");
    };

    render() {

        const {name,gender,department} = this.state

        return (

            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Student Updated Successfully":"Student Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Student" : "Add Student"}</Card.Header>
                    <Form onReset={this.resetStudent} onSubmit={this.state.id ? this.updateStudent : this.submitStudent} id="profFormID">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="name"
                                                  value={name}
                                                  onChange={this.studentChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Full Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="gender"
                                                  value={gender}
                                                  onChange={this.studentChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Gender" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="department"
                                                  value={department}
                                                  onChange={this.studentChange}
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
                            <Button size="sm" variant="info" type="button" onClick={this.studentList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Student List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Student;