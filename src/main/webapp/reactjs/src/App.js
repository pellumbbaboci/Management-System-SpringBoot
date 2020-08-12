import React from 'react';
import './App.css';

import {Container,Row,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Professor from "./components/Professor/Professor";
import ProfessorList from "./components/Professor/ProfessorList";
import Student from "./components/Student/Student";
import StudentList from "./components/Student/StudentList";


function App() {

    const marginTop = {
        marginTop:"20px"
    };

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                 <Col lg={12} style={marginTop} >

                     <Switch>
                         <Route path="/" exact component={Welcome}/>
                         <Route path="/add-professor" exact component={Professor}/>
                         <Route path="/edit-professor/:id" exact component={Professor}/>
                         <Route path="/professors" exact component={ProfessorList}/>
                         <Route path="/add-student" exact component={Student}/>
                         <Route path="/edit-student/:id" exact component={Student}/>
                         <Route path="/students" exact component={StudentList}/>
                     </Switch>
                    {/*<Welcome/>*/}
                    {/*<Professor/>*/}
                    {/*<ProfessorList/>*/}
                 </Col>

            </Row>
        </Container>

        <Footer></Footer>

    </Router>
  );
}

export default App;
