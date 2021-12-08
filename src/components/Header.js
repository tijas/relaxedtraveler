import React from 'react'
import {Navbar, Container, Offcanvas, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import'./Header.css'

function Header(){
    return (
        <Navbar className="m-2 reversed" expand={false}>
        <Container fluid className="justify-content-end">
            <Navbar.Toggle className="shadow fixed-top nav-button" aria-controls="offcanvasNavbar" />
            <Navbar.Brand as={Link} to="/" className="fs-2">Ready made Authentication</Navbar.Brand>
            <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="bg-primary"
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/">
                    <Nav.Link>Home Page</Nav.Link>
                </LinkContainer>
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
