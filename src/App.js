import React from 'react';
import logo from './assets/logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Routes from './routes';

function App() {
  const path = window.location.pathname;
  return (
    <div className="App">
      <Navbar variant="dark" id="menu-dark" expand="lg" className="py-0">
        <div className="container">
          <Navbar.Brand className="imagem-logo" href="/">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="link" active={path === "/"} href="/">
                <FontAwesomeIcon icon={faHome} /> Início
              </Nav.Link>
              <div className="separador-menu"></div>
              <Nav.Link className="link" active={path === "/aluno"} href="/aluno">
                <FontAwesomeIcon icon={faUserGraduate} /> Aluno
              </Nav.Link>
            </Nav>
            <div id="menu-direita" className="justify-content-end">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-github">
                    GitHub
                  </Tooltip>
                }>
                <Navbar.Text>
                  <a id="link-github" href="https://github.com/joao-rezende/backend_crud_aluno"><FontAwesomeIcon icon={faGithub} /></a>
                </Navbar.Text>
              </OverlayTrigger>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
