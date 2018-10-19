import { connect } from 'react-redux';

import Home from './home.component';
import { pushTo } from '../../utils/routing.utils';

const mapStateToProps = ({ app: { config, content } }) => ({
  config,
  content,
});

export default connect(mapStateToProps, {
  navigate: destination => pushTo(destination),
})(Home);
