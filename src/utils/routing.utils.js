import { push } from 'connected-react-router';

export const pushTo = destination => dispatch => dispatch(push(`${destination}`));

export default pushTo;
