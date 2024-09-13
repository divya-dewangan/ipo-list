import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NewBar() {

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className='text-bold'>IPO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" variant='underline' >
                            <Nav.Link><Link to="/dashboard" className=' mx-2 text-decoration-none' >Dashboard</Link></Nav.Link>
                            <Nav.Link><Link to="/ipo-entry" className=' mx-2   text-decoration-none' >Ipo Entry</Link></Nav.Link>
                            <Nav.Link><Link to="/ipo-list" className=' mx-2  text-decoration-none'>Ipo List</Link></Nav.Link>
                            <Nav.Link><Link to="/stock-details" className=' mx-2  text-decoration-none'>Stock Entry</Link></Nav.Link>
                            <Nav.Link><Link to="/stock-details-list" className=' mx-2  text-decoration-none'>Stock List</Link></Nav.Link>
                            <Nav.Link><Link to="/account-detail" className=' mx-2  text-decoration-none'>Account Detail</Link></Nav.Link>
                            {/* <Nav.Link><Link to="/lone-form" className='mx-2  text-decoration-none'>LoneForm</Link></Nav.Link>
                            <Nav.Link><Link to='/lone-list' className='mx-2  text-decoration-none'>LoneList</Link></Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NewBar