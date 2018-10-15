import { connect } from 'react-redux';

import Nav from './nav.component';
import { pushTo } from '../../utils/routing.utils';

const mapStateToProps = ({ app: { pages } }) => ({
  pages,
});

export default connect(mapStateToProps, {
  navigate: destination => pushTo(destination),
})(Nav);
