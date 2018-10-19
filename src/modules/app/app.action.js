export const CONFIG_INIT = 'app/CONFIG_INIT';
export const SET_CONTENT = 'app/SET_CONTENT';

export const configInit = config => ({ type: CONFIG_INIT, config });
export const setContent = content => ({ type: SET_CONTENT, content });
