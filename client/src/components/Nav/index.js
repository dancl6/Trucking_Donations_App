import React, { useState, useEffect } from "react";
import Auth  from "../../utils/auth";
import getToken from "../../utils/auth"
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"
import decode from 'jwt-decode';
import  { QUERY_ME, LOAD_QUERY, GET_TRUCKER_LOADS }  from "../../utils/queries";
import { useQuery } from '@apollo/react-hooks';
import {Add_Load} from "../../components/Add_Load";


function Nav() {
  const {data} = useQuery(QUERY_ME);
  const {data2} = useQuery(LOAD_QUERY)
  const [myLoads, setMyLoads] = useState();
  const {loading, data3} = useQuery(GET_TRUCKER_LOADS);
  useEffect(() => {
    if (data3) {
        console.log("my loads in effect is :", data3)
      setMyLoads((myLoads) => myLoads =  data3)
      // console.log("my loads in effect after setting is :", myLoads)
    } else {
  
    }
    
    
  }, [myLoads,data3])
    function showNavigation() {
      // console.log("data is here now:", data.me.trucker)
      const trucker_Menu = data?.me.trucker ?  (
      <div>
      <li className="mx-1">
        <Link to="/add_load">
          Add Load
        </Link>
      </li>
      <li className = "mx-1">
        <Link to = "/test_form_fill">
          Test Preload
        </Link>
        </li>
      {/* <li className="mx-1">
        <Link to={`/modify_load/`}>
          Modify Load
        </Link>
      </li> */}
      <li className="mx-1">
        <Link to="/my_loads">
          My Loads
        </Link>
      </li>
      </div>
      ): null;
      const docker_Menu = data?.me.docker ?  (
        <li className="mx-1">
        <Link to="/load_search">
          Search Loads
        </Link>
      </li>
      ): null;
        if (Auth.loggedIn()) {
          // let test = {}
          // console.log("data 2 is:", data2?.state)
          let test = decode(localStorage.getItem('id_token'))
          console.log("get profile is :", test)
          return (
            <ul className="flex-row">
              {/* <li className="mx-1">
                <Link to="/orderHistory">
                  Order History
                </Link>
              </li> */}
              {trucker_Menu}
              {docker_Menu}
              {/* <li className="mx-1">
                <Link to="/add_load">
                  Add Load
                </Link>
              </li> */}
              <li className="mx-1">
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </li>
            </ul>
          );
        } else {
          return (
            <Container>

            <ul className="flex-row">
            <Row>
              <Col>
              <li className="mx-1">
                <Link to="/trucker_signup">
                  Trucker Signup
                </Link>
              </li>
              </Col>
              <Col>
              <li className="mx-1">
                <Link to="/trucker_login">
                  Trucker Login
                </Link>
              </li>
              </Col>
              <Col>
              <li className="mx-1">
                <Link to="/dock_signup">
                  Dock Signup
                </Link>
              </li>
              </Col>
              <Col>
              <li className="mx-1">
                <Link to="/dock_login">
                  Dock Login
                </Link>
              </li>
              </Col>
              {/* <Col>
              <li className="mx-1">
                <Link to="/add_load">
                  Add Load
                </Link>
              </li>
              </Col> */}
              </Row>
            </ul>

            </Container>

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
    
    export default Nav;
    