import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'; // Add this import
import Button from 'react-bootstrap/Button'; // Add this import

function NavbarComponent() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/business', text: 'Business' },
    { to: '/tech', text: 'Technology' },
    { to: '/sports', text: 'Sports' },
    { to: '/health', text: 'Health' },
    { to: '/science', text: 'Science' },
    { to: '/entertainment', text: 'Entertainment' },
    { to: '/login', text: loggedIn ? 'Logout' : 'Login' },
    { to: '/account-settings', text: 'Account Settings', hidden: !loggedIn },
    { to: '/saved', text: 'Favorites', hidden: !loggedIn },
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">DailyVista</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {navLinks.map(({ to, text, hidden }, index) => (
              !hidden && <Nav.Link key={index} as={Link} to={to}>{text}</Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

