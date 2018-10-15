import { CONFIG_INIT, SET_CONTENT } from './app.action';

const initialState = {
  serverTime: null,
  config: null,
  content: null,
  pages: {
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
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_INIT: {
      return {
        ...state,
        config: action.config,
      };
    }
    case SET_CONTENT: {
      return {
        ...state,
        content: action.content,
      };
    }
    default:
      return { ...state };
  }
};
