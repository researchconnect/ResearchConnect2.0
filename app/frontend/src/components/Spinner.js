import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ fullPage }) => (
  <div className={fullPage ? 'full-page' : ''}>
    <div className="spinner">
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="length" fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28" />
      </svg>
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28" />
      </svg>
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28" />
      </svg>
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28" />
      </svg>
    </div>
  </div>
);

Spinner.propTypes = {
  fullPage: PropTypes.bool.isRequired,
};

export default Spinner;
