import { connect } from 'react-redux';

import Home from './home.component';

const mapStateToProps = ({ app: { config, content } }) => ({
  config,
  content,
});

export default connect(mapStateToProps, {
  navigate: () => {},
})(Home);
