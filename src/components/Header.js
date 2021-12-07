import React from 'react'
import {Navbar, Container, Offcanvas, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Header(){
    return (
        <Navbar bg="light" expand={false}>
        <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Brand as={Link} to="/">Ready made Authentication</Navbar.Brand>
            <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">Home Page</Nav.Link>
                <Nav.Link as={Link} to="/user">User Page</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin Page</Nav.Link>
                </Nav>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
        </Navbar>
    )
}

export default Header
