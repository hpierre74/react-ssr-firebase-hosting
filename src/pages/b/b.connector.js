import { connect } from 'react-redux';

import PageB from './b.page';
import { pushTo } from '../../utils/routing.utils';

const mapStateToProps = ({ app: { config } }) => ({
  config,
});

export default connect(mapStateToProps, {
  navigate: destination => pushTo(destination),
})(PageB);
