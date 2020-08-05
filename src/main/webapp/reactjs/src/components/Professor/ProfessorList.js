import React from 'react';
import {white} from "color-name";
import {Card,Table,Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


class ProfessorList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            professors : []
        };
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


    render() {
        return (
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
                                        <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /> </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

export default ProfessorList;