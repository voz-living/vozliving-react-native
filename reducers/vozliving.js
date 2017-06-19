import {
  VOZ_LIVING_HIDE_LOGIN,
} from '../constants/ActionTypes';

const initState = {
  isHideLogin: false,
};

const actionsMap = {
  [VOZ_LIVING_HIDE_LOGIN](state, action) {
    let isHideLogin = !state.isHideLogin;
    if (action.isHideLogin) isHideLogin = action.isHideLogin;
    return { ...state, isHideLogin }
  }
}

export default function vozReducer(state = initState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
