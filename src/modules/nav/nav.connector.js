import { connect } from 'react-redux';

import Nav from './nav.component';

const mapStateToProps = ({ app: { pages } }) => ({
  pages,
});

export default connect(mapStateToProps, {
  navigate: () => {},
})(Nav);
