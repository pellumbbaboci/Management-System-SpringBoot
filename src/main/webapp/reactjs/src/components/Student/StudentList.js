import React from 'react';
import {white} from "color-name";
import {Card,Table,Button, ButtonGroup,InputGroup,FormControl} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faTrash,faEdit,faSearch,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";
import {Link} from "react-router-dom";


class StudentList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            students : [],
            search : ''
        };
        this.state.show = false;
    }

    componentDidMount() {
        this.findAllStudents();
    }

    findAllStudents(){
        axios.get("http://localhost:8080/list_student")
            .then(response => response.data)
            .then((data)=> {
                this.setState({students:data})
            });
    }

    deleteStudent = (studentID) => {
        axios.delete("http://localhost:8080/delete_student/"+studentID)
            .then(response => {
                if (response.data != null ){

                    this.setState({
                        students: this.state.students.filter(student => student.id !== studentID)
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
        this.findAllStudents();
    };

    searchData = () => {
        axios.get("http://localhost:8080/search_student/"+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    students: data,
                    //add pagination
                });
            });
    };

    render() {
        const {students , search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {"Student Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>

                    <Card.Header>

                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Student List
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
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7">No Student Available.</td>
                                </tr> :
                                    students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.department}</td>

                                    <td>
                                        <ButtonGroup>
                                            <Link to={"edit-student/"+student.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteStudent.bind(this, student.id)}><FontAwesomeIcon icon={faTrash} /> </Button>
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

export default StudentList;