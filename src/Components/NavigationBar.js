import { Link } from 'react-router-dom';
import { Image, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark" expand="md" id="navbar">
            <Navbar.Brand>
                <Image fluid roundedCircle={true} src="assets/images/logo.png" id="logo" />
            </Navbar.Brand>
            <Navbar.Toggle id="nav-toggler" />
            <Navbar.Collapse>
                <Nav className="" id="nav">
                    <ul className="navbar-nav m-ms-2 m-md-0">
                        <li className="nav-link">
                            <a className="nav-link nav-link-unstyled" href="https://codingteerex.github.io" target="_blank">My Portfolio</a>
                        </li>
                        <li className="nav-link">
                            <a className="nav-link nav-link-unstyled" href="https://github.com/CodingTeeRex" target="_blank">My Github</a>
                        </li>
                        <NavDropdown className="nav-link" title="Game Modes">
                            <NavDropdown.Item>
                                <Link to="/vsHuman" className="nav-link-dropdown">Play against another Human</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/vsComputer" className="nav-link-dropdown">Play against Computer</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </ul>
                </Nav>
            </Navbar.Collapse>

                <div className="container-fluid">

                </div>
        </Navbar>
        </>
    );
}

export default NavigationBar;
