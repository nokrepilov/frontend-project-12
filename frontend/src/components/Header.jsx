import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../hooks';

const Header = () => {
  const { logOut } = useAuth();
  const { t } = useTranslation();
  const app = useSelector((state) => state.app);
  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand>
          <Link className="text-decoration-none text-black" to="/">Hexlet Chat</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {app.token ? (
              <Button onClick={() => logOut()} variant="primary">{t('header.logout')}</Button>
            ) : (
              ''
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
