import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
          return (
            <ul className="flex-row">
              <li className="mx-1">
                <Link to="/orderHistory">
                  Order History
                </Link>
              </li>
              <li className="mx-1">
                <Link to="/add_load">
                  Add Load
                </Link>
              </li>
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
              <Col>
              <li className="mx-1">
                <Link to="/add_load">
                  Add Load
                </Link>
              </li>
              </Col>
              </Row>
            </ul>

            </Container>

          );
        }
      }
    
      return (
        <header className="flex-row px-1">
          <h1>
            <Link to="/">
              <span role="img" aria-label="shopping bag">💪❤️</span>
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
    