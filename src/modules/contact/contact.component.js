import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

// const Wrapper = styled.div`
//   width: 50%;
//   background: cyan;
// `;

const Contact = props => (
  <div>
    <h2>Contact Page</h2>
    <p>{props.intro}</p>
  </div>
);

Contact.defaultProps = {
  intro: '',
};

Contact.propTypes = {
  intro: PropTypes.string,
};

export default Contact;
