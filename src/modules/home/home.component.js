import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const styles = () => ({
  root: {
    textAlign: 'center',
  },
});

const Title = styled.h2`
  width: 50%;
  margin: 0 auto;
`;

const Text = styled.h4`
  margin: 0 auto;
  font-weight: bolder;
`;

const Hero = styled.div`
  height: 500px;
`;

const Home = props => {
  const { navigate, classes } = props;

  return (
    <div className={classes.root}>
      <Title>Home</Title>
      <Hero>
        <Text>Some Random Text to Fill Blank Space</Text>
      </Hero>
      <Button onClick={() => navigate()} variant="outlined" color="primary">
        PageA
      </Button>
      <Button onClick={() => navigate()} variant="outlined" color="default">
        Contact
      </Button>
      <Button onClick={() => navigate()} variant="outlined" color="secondary">
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
