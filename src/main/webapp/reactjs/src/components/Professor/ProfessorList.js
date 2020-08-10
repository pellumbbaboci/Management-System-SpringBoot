import React from 'react';
import {white} from "color-name";
import {Card,Table,Button, ButtonGroup,InputGroup,FormControl} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faTrash,faEdit,faSearch,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";
import {Link} from "react-router-dom";


class ProfessorList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            professors : [],
            search : ''
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

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllProfessors();
    };

    searchData = () => {
        axios.get("http://localhost:8080/search_professor/"+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    professors: data,
                    //add pagination
                });
            });
    };

    render() {
        const {professors, search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show = {this.state.show} message = {"Professor Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>

                    <Card.Header>

                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Professor List
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
                                professors.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7">No Professors Available.</td>
                                </tr> :
                                professors.map((professor) => (
                                <tr key={professor.id}>
                                    <td>{professor.id}</td>
                                    <td>{professor.name}</td>
                                    <td>{professor.gender}</td>
                                    <td>{professor.department}</td>

                                    <td>
                                        <ButtonGroup>
                                            <Link to={"edit/"+professor.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteProfessor.bind(this, professor.id)}><FontAwesomeIcon icon={faTrash} /> </Button>
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