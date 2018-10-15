import { connect } from 'react-redux';

import PageA from './a.page';
import { pushTo } from '../../utils/routing.utils';

const mapStateToProps = ({ app: { config } }) => ({
  config,
});

export default connect(mapStateToProps, {
  navigate: destination => pushTo(destination),
})(PageA);
