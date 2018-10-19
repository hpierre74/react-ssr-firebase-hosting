import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import styled from 'styled-components';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Title = styled.h4``;

class Nav extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderNavItems = pages => {
    if (!pages) {
      return '';
    }

    return Object.values(pages).map(page => (
      <MenuItem key={page.key} onClick={() => this.props.navigate()}>
        {page.name}
      </MenuItem>
    ));
  };

  render() {
    const pages = {
      '-Huy5kj6hkj7': {
        key: '-Huy5kj6hkj7',
        name: 'Home',
        path: '/',
      },
      '-JuhY6hkj7': {
        key: '-JuhY6hkj7',
        name: 'Contact',
        path: '/contact',
      },
      '-HjU76gkj7': {
        key: '-HjU76gkj7',
        name: 'Admin',
        path: '/admin',
      },
    };
    const { classes, title } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            {this.renderNavItems(pages)}
          </Menu>
          <Title>{title}</Title>
        </Toolbar>
      </AppBar>
    );
  }
}

Nav.propTypes = {
  navigate: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  // pages: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Nav);
