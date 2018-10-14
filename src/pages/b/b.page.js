import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const PageB = ({ navigate }) => (
  <div>
    <h1>B</h1>
    <Button onClick={() => navigate('/')} variant="outlined" color="default">
      Home
    </Button>
  </div>
);

PageB.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default PageB;
