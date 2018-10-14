import { CONFIG_INIT } from './app.action';

const initialState = {
  serverTime: null,
  config: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_INIT: {
      return {
        ...state,
        config: action.config,
      };
    }
    default:
      return { ...state };
  }
};
