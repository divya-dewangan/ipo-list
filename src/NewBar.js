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
                            <Nav.Link><Link to="/ipo-entry" className=' mx-2   text-decoration-none' >IpoEntry</Link></Nav.Link>
                            <Nav.Link><Link to="/ipo-list" className=' mx-2  text-decoration-none'>IpoList</Link></Nav.Link>
                            <Nav.Link><Link to="/stock-details" className=' mx-2  text-decoration-none'>StockDetails</Link></Nav.Link>
                            <Nav.Link><Link to="/stock-details-list" className=' mx-2  text-decoration-none'>StockDetailList</Link></Nav.Link>
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