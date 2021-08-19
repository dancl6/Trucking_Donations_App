import React from "react";
import Auth  from "../../utils/auth";
import getToken from "../../utils/auth"
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"
import decode from 'jwt-decode';
import  { QUERY_ME, LOAD_QUERY }  from "../../utils/queries";
import { useQuery } from '@apollo/react-hooks';

function Nav() {
  const {data} = useQuery(QUERY_ME);
  const {data2} = useQuery(LOAD_QUERY)
    function showNavigation() {
      // console.log("data is here now:", data.me.trucker)
      const order_Html = data?.me.trucker ?  (
        <li className="mx-1">
        <Link to="/add_load">
          Add Load
        </Link>
      </li>
      ): null;
      const search_Loads = data?.me.docker ?  (
        <li className="mx-1">
        <Link to="/load_search">
          Search Loads
        </Link>
      </li>
      ): null;
        if (Auth.loggedIn()) {
          // let test = {}
          console.log("data 2 is:", data2?.state)
          let test = decode(localStorage.getItem('id_token'))
          console.log("get profile is :", test)
          return (
            <ul className="flex-row">
              <li className="mx-1">
                <Link to="/orderHistory">
                  Order History
                </Link>
              </li>
              {order_Html}
              {search_Loads}
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
    