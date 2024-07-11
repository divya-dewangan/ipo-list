import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NewBar() {

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Page</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/ipo-entry" className='text-dark mx-2'>IpoEntry</Link>
                            <Link to="/ipo-list" className='text-dark mx-2'>IpoList</Link>
                            <Link to="/stock-details" className='text-dark mx-2'>StockDetails</Link>
                            <Link to="/stock-details-list" className='text-dark mx-2'>StockDetailList</Link>
                            <Link to="/lone-form" className='text-dark mx-2'>LoneForm</Link>
                            <Link to='/lone-list' className='text-dark mx-2'>LoneList</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NewBar