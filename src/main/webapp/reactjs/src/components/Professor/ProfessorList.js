import React from 'react';
import {white} from "color-name";
import {Card,Table,Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";


class ProfessorList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            professors : []
        };
        this.state.show = false;
    }

    componentDidMount() {
        this.findAllProfessors();
    }

    findAllProfessors(){
        axios.get("http://localhost:8080/list_professor")
            .then(response => response.data)
            .then((data)=> {
                this.setState({professors:data})
            });
    }

    deleteProfessor = (profID) => {
        axios.delete("http://localhost:8080/delete_professor/"+profID)
            .then(response => {
                if (response.data != null ){

                    this.setState({
                        professors: this.state.professors.filter(professor => professor.id != profID)
                    })
                    this.setState({"show":true});
                    setTimeout(() =>  this.setState({"show":false}), 3000);
                }
            });
    };


    render() {
        return (
            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {"Professor Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>

                    <Card.Header> <FontAwesomeIcon icon={faList} /> Professor List</Card.Header>
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
                                this.state.professors.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7">No Professors Available.</td>
                                </tr> :
                                this.state.professors.map((professor) => (
                                <tr key={professor.id}>
                                    <td>{professor.id}</td>
                                    <td>{professor.name}</td>
                                    <td>{professor.gender}</td>
                                    <td>{professor.department}</td>

                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-primary" ><FontAwesomeIcon icon={faEdit} /> </Button>{''}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteProfessor.bind(this,professor.id)}><FontAwesomeIcon icon={faTrash} /> </Button>
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

export default ProfessorList;