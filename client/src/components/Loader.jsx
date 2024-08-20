import React from 'react';

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
