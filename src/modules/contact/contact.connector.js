import { connect } from 'react-redux';

import Contact from './contact.component';

const mapStateToProps = ({ app: { content } }) => ({
  content,
  intro: 'lolilol',
});

export default connect(mapStateToProps, {
  navigate: () => {},
})(Contact);
