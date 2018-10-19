import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const PageA = ({ navigate }) => (
  <div>
    <h1>A</h1>
    <Button onClick={() => navigate('/')} variant="outlined" color="default">
      Home
    </Button>
  </div>
);

PageA.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default PageA;
