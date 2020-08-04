import React, {Component} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'

class NavigationBar extends Component {
    render() {
        return (

           <Navbar bg="dark" variant="dark">
               <Link to={""} className="navbar-brand">
                   <img src="https://image.flaticon.com/icons/svg/1157/1157044.svg" width="25" height="25" alt="brand"/>
                   University Management system
               </Link>

               <Nav className="mr-auto">
                   {/*<Link to={""} className="navbar-link">Home</Link>*/}
                   {/*<Link to={""} className="navbar-link">Add Student</Link>*/}
                   {/*<Link to={""} className="navbar-link">Add Course</Link>*/}
                   <Link to={"add"} className="navbar-link">Add Professor </Link>
                   <Link to={"list"} className="navbar-link">List Professor</Link>
               </Nav>

           </Navbar>
        );
    }
}

export default NavigationBar;