import logo from "../../logo.svg"

import { Navbar, Container, Nav} from 'react-bootstrap'

import { withRouter, Link } from 'react-router-dom';

const Header = () => {

    return (
<>
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      GAPP CodeTest
      </Navbar.Brand>
      <Nav className="me-auto">
      <Nav.Link as={Link} to="/users">Users</Nav.Link>
      <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
      <Nav.Link as={Link} to="/departments">Departments</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
</>
    )
}

export default withRouter(Header)