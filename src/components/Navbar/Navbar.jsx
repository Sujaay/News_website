import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function NavbarComponent() {
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/business', text: 'Business' },
    { to: '/tech', text: 'Technology' },
    { to: '/sports', text: 'Sports' },
    { to: '/health', text: 'Health' },
    { to: '/science', text: 'Science' },
    { to: '/entertainment', text: 'Entertainment' },
    { to: '/saved', text: 'Favorites' },
    { to: '/login', text: 'Login' },
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">DailyVista</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {navLinks.map(({ to, text }, index) => (
              <Nav.Link key={index} href={to}>{text}</Nav.Link>
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

