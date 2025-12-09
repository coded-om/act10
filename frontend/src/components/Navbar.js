import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Container,
} from "reactstrap";

function Navigation() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar color="primary" dark expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/">
          Task Manager
        </NavbarBrand>
        <Nav className="ms-auto" navbar>
          {user ? (
            <>
              <NavItem className="d-flex align-items-center me-3">
                <span className="text-white">Welcome, {user.username}</span>
              </NavItem>
              <NavItem>
                <Button color="light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem className="me-2">
                <Button tag={Link} to="/login" color="light" outline size="sm">
                  Login
                </Button>
              </NavItem>
              <NavItem>
                <Button tag={Link} to="/register" color="light" size="sm">
                  Register
                </Button>
              </NavItem>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
