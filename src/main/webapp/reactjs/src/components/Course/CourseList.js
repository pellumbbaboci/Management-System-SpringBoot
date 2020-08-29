import React from 'react';
import {white} from "color-name";
import {Card,Table,Button, ButtonGroup,InputGroup,FormControl} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faTrash,faEdit,faSearch,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";
import {Link} from "react-router-dom";


class CourseList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            courses : [],
            search : ''
        };
        this.state.show = false;
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses(){
        axios.get("http://localhost:8080/list_course")
            .then(response => response.data)
            .then((data)=> {
                this.setState({courses:data})
            });
        console.log(this.state.courses);
    }

    deleteCourse = (courseID) => {
        axios.delete("http://localhost:8080/delete_course/"+courseID)
            .then(response => {
                if (response.data != null ){

                    this.setState({
                        courses: this.state.courses.filter(course => course.id !== courseID)
                    })
                    this.setState({"show":true});
                    setTimeout(() =>  this.setState({"show":false}), 3000);
                }
            });
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllCourses();
    };

    searchData = () => {
        axios.get("http://localhost:8080/search_course/"+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    courses: data
                });
            });
    };

    render() {
        const {courses , search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {"Course Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>

                    <Card.Header>

                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Course List
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                             className={"info-border bg-dark text-white"}
                                              onChange={this.searchChange}
                                    />
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>

                    </Card.Header>
                    <Card.Body>

                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Course Name</th>
                                <th>Department</th>
                                <th>Assigned Professor ID</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                courses.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7">No Courses Available.</td>
                                </tr> :
                                    courses.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.department}</td>
                                    <td>{course.professorName}</td>

                                    <td>
                                        <ButtonGroup>
                                            <Link to={"edit-course/"+course.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteCourse.bind(this, course.id)}><FontAwesomeIcon icon={faTrash} /> </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CourseList;