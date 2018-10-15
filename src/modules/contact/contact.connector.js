import { connect } from 'react-redux';

import Contact from './contact.component';
import { pushTo } from '../../utils/routing.utils';

const mapStateToProps = ({ app: { content } }) => ({
  content,
  intro: 'lolilol',
});

export default connect(mapStateToProps, {
  navigate: destination => pushTo(destination),
})(Contact);
