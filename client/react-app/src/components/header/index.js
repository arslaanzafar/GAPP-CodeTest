import logo from "../../logo.svg"

import { Navbar, Container, Nav} from 'react-bootstrap'

import { withRouter } from 'react-router-dom';

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
      <Nav.Link href="#home">Users</Nav.Link>
      <Nav.Link href="#features">Teams</Nav.Link>
      <Nav.Link href="#pricing">Departments</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
</>
    )
}

export default withRouter(Header)