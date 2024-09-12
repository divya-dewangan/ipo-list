
// Loader.js
import React from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader = ({ show }) => {
  return (
    show ? (
      <div className="loader-overlay">
        <Spinner animation="border" role="status" className="loader-spinner">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      </div>
    ) : null
  );
};

export default Loader;
