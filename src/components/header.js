import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: this.props.facts
    };
  }

  renderItems = facts => {
    if (!facts) {
      return <p>it didn't worked</p>;
    }

    return Object.values(facts).map((fact, i) => {
      return (
        <li key={i}>
          <a href="#">{fact.text}</a>
        </li>
      );
    });
  };
  render() {
    return <ul> {this.state.facts && this.renderItems(this.state.facts)} </ul>;
  }
}

Header.propTypes = {
  facts: PropTypes.shape({}).isRequired
};

export default Header;
