import React, {Component}from 'react';
import {white} from "color-name";
import {Card,Table,Form,Button,Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faSave, faPlusSquare, faUndo, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";

class Course extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.method = "";
        this.submitCourse = this.submitCourse.bind(this);
        this.courseChange = this.courseChange.bind(this);
    }

    initialState = {
       id:'',courseName:'', department:'', prof_id:''
    };

    componentDidMount() {
        const courseID = this.props.match.params.id;
        if (courseID){
            this.findCourseByID(courseID);
        }
    }

    findCourseByID = (courseID) => {
        axios.get("http://localhost:8080/getById_course/"+courseID)
            .then(response => {
               if (response.data != null){
                   this.setState({
                       id: response.data.id,
                       courseName: response.data.courseName,
                       department: response.data.department,
                       prof_id: response.data.prof_id
                   });
               }
            }).catch((error) => {
                    console.error("Error"+error);
            });

    };

    updateCourse = event => {
        event.preventDefault();

        const course = {
            id: this.state.id,
            courseName: this.state.courseName,
            department: this.state.department,
            prof_id: this.state.prof_id
        };

        axios.put("http://localhost:8080/update_course/under/"+this.state.prof_id, course)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true,"method":"put"});
                    setTimeout(() =>  this.setState({"show":false}), 2000);
                    setTimeout(() =>  this.courseList(), 1000);
                }else{
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);

    };


    submitCourse = event => {
        event.preventDefault();

        const course = {
            courseName: this.state.courseName,
            department: this.state.department,
            prof_id: this.state.prof_id
        };

        axios.post("http://localhost:8080/save_course/under/"+this.state.prof_id, course)
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

    courseChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    resetCourse = () => {
        this.setState(()=>this.initialState);
    };

    courseList = () => {
        return this.props.history.push("/courses");
    };

    render() {

        const {courseName,department,prof_id} = this.state;

        return (

            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Course Updated Successfully":"Course Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Course" : "Add Course"}</Card.Header>
                    <Form onReset={this.resetCourse} onSubmit={this.state.id ? this.updateCourse : this.submitCourse} id="courseFormID">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="courseName"
                                                  value={courseName}
                                                  onChange={this.courseChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Full Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGender">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="department"
                                                  value={department}
                                                  onChange={this.courseChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Department" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDepartment">
                                    <Form.Label>Assigned Professor ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="prof_id"
                                                  value={prof_id}
                                                  onChange={this.courseChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Assigned Professor ID" />
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
                            <Button size="sm" variant="info" type="button" onClick={this.courseList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Course List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Course;