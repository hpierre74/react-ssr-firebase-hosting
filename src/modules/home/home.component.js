import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import Header from '../../components/header.component';

const styles = () => ({
  root: {
    textAlign: 'center',
  },
});

const Home = props => {
  const { navigate, classes } = props;

  return (
    <div className={classes.root}>
      <Header />
      <Button onClick={() => navigate('/a')} variant="outlined" color="primary">
        PageA
      </Button>
      <Button onClick={() => navigate('/b')} variant="outlined" color="secondary">
        PageB
      </Button>
    </div>
  );
};

Home.propTypes = {
  navigate: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Home);
