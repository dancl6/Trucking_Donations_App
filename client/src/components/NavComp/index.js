import React, { useState, useEffect } from "react";
import Auth  from "../../utils/auth";
import getToken from "../../utils/auth"
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"
import decode from 'jwt-decode';
import  { QUERY_ME, LOAD_QUERY, GET_TRUCKER_LOADS }  from "../../utils/queries";
import { useQuery } from '@apollo/react-hooks';
import {Add_Load} from "../Add_Load";
import { useStoreContext } from '../../utils/GlobalState'
import { TRUCKER_LOADS, UPDATE_TRUCKER_LOADS } from "../../utils/actions";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import  LoadList from "../../pages/LoadList"

function NavComp() {
  const {data} = useQuery(QUERY_ME);
  const arrayId = []  
  const {data2} = useQuery(LOAD_QUERY)
  const [state, dispatch] = useStoreContext();
  const [myLoads, setMyLoads] = useState();
  const {loading, data:data5} = useQuery(GET_TRUCKER_LOADS);
 console.log("state for my loads update store is:",state?.TruckerLoads)
 console.log("data 5 is:", data5)
  const onClickMyLoads = async() => {
    try {
      if (data5.getTruckerLoads){
        dispatch({
          type: UPDATE_TRUCKER_LOADS,
          TruckerLoads: data5.getTruckerLoads
      })
    }
  } catch (e) {
    console.error(e);
    let test = e
    console.log("testing error is:", e)
  }
  
  }

    // function UpdateStore() {

    //   const {loading, data:data3} = useQuery(GET_TRUCKER_LOADS);

    //   console.log("data hey is:", data3.getTruckerLoads[0],'data length is:', data3.getTruckerLoads.length)
    //   for (let i = 0; i < data3.getTruckerLoads.length; i ++ ){
    //       if (data3.getTruckerLoads[i] != null) {
    //       arrayId.push(data3.getTruckerLoads[i]._id)
          
    //       console.log("pushing is :", data3.getTruckerLoads[i]._id)
    //       } else {}
    //   }



    //   if (data3){


    //     dispatch({
    //       type: UPDATE_TRUCKER_LOADS,
    //       TruckerLoads: data3.getTruckerLoads
    //   })
    //   console.log("state in auth logged in is:", state)

    // } else {
    // } 
    // }
    function showNavigation() {
      // console.log("data is here now:", data.me.trucker)
      const trucker_Menu = data?.me.trucker ?  (
      
      
      
      
      // <div>


      // <Navbar bg="dark" variant="dark">
      //   <Container>
      //     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <Nav.Link href="#features">

              <Link to="/add_load">
                Add Load
              </Link>

            </Nav.Link>

            <Nav.Link href="#features">

              <Link to={`/approve_loads`}>
                Loads To Approve
              </Link>

            </Nav.Link>

            <Nav.Link href="#features">

              <Link onClick = {onClickMyLoads} to="/my_loads">
                My Loads
              </Link>

            </Nav.Link>


            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
      //   </Container>
      // </Navbar>






      // <li className="mx-1">
      //   <Link to="/add_load">
      //     Add Load
      //   </Link>
      // </li>

      // <li className="mx-1">
      //   <Link to={`/approve_loads`}>
      //     Loads To Approve
      //   </Link>
      // </li>
      // <li className="mx-1">
      //   <Link onClick = {onClickMyLoads} to="/my_loads">
      //     My Loads
      //   </Link>
      // </li>

      // </div>
      ): null;
      const docker_Menu = data?.me.docker ?  (
      //   <li className="mx-1">
      //   <Link to="/load_search">
      //     Search Loads
      //   </Link>
      // </li>

        <Nav.Link href="#features">
            
        <Link to="/load_search">
          Search Loads
        </Link>

        </Nav.Link>


      ): null;
        if (Auth.loggedIn()) {
          // let test = {}
          // console.log("data 2 is:", data2?.state)
          let test = decode(localStorage.getItem('id_token'))
          console.log("get profile is :", test)
          return (


            <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                {/* <Nav.Link href="#home">Home</Nav.Link> */}
                {/* <Nav.Link href="#features">
    
                  <Link to="/add_load">
                    Add Load
                  </Link>
    
                </Nav.Link>
    
                <Nav.Link href="#features">
    
                  <Link to={`/approve_loads`}>
                    Loads To Approve
                  </Link>
    
                </Nav.Link>
    
                <Nav.Link href="#features">
    
                  <Link onClick = {onClickMyLoads} to="/my_loads">
                    My Loads
                  </Link>
    
                </Nav.Link> */}

              {trucker_Menu}
              {docker_Menu}

              <Nav.Link href="#features">
                  

              <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>

              </Nav.Link>


    
                {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              </Nav>
            </Container>
          </Navbar>






          );
        } else {
          return (

            

<div>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Navbar</Navbar.Brand>
          <Nav className="me-auto">

            <Nav.Link href="#features">

             <Link to="/trucker_signup">
               Trucker Signup
              </Link>

            </Nav.Link>

            <Nav.Link href="#features">

             <Link to="/trucker_login">
               Trucker Login
              </Link>

            </Nav.Link>

            <Nav.Link href="#features">

             <Link to="/dock_signup">
                Dock Signup
              </Link>

            </Nav.Link>

            <Nav.Link href="#features">

             <Link to="/dock_login">
                Dock Login
              </Link>

            </Nav.Link>

          </Nav>
        </Container>
      </Navbar>


</div>





            // <Container>

            // <ul className="flex-row">
            // <Row>
            //   <Col>
            //   <li className="mx-1">
            //     <Link to="/trucker_signup">
            //       Trucker Signup
            //     </Link>
            //   </li>
            //   </Col>
            //   <Col>
            //   <li className="mx-1">
            //     <Link to="/trucker_login">
            //       Trucker Login
            //     </Link>
            //   </li>
            //   </Col>
            //   <Col>
            //   <li className="mx-1">
            //     <Link to="/dock_signup">
            //       Dock Signup
            //     </Link>
            //   </li>
            //   </Col>
            //   <Col>
            //   <li className="mx-1">
            //     <Link to="/dock_login">
            //       Dock Login
            //     </Link>
            //   </li>
            //   </Col>
            //   {/* <Col>
            //   <li className="mx-1">
            //     <Link to="/add_load">
            //       Add Load
            //     </Link>
            //   </li>
            //   </Col> */}
            //   </Row>
            // </ul>

            // </Container>

          );
        }
      }
    
      return (
        <header className="flex-row px-1">
          <h1>
            <Link className = "center_text" to="/">
              <span  role="img" aria-label="shopping bag">💪❤️</span>
              Trucker Donations
            </Link>
          </h1>
    
          <nav>
            {showNavigation()}
          </nav>
        </header>
      );
    }
    
    export default NavComp;
    