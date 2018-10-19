import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from './header.component';

const Layout = props => (
  <Fragment>
    <Header />
    {props.children}
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
