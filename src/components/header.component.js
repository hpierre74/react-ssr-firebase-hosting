import React, { Component } from 'react';

import Nav from '../modules/nav/nav.connector';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Nav title="My App Name" />;
  }
}

export default Header;
