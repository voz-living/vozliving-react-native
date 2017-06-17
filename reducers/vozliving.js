import {
  VOZ_LIVING_TOGGLE_MENU,
} from '../constants/ActionTypes';

const initState = {
  isMenuOpen: false,
};

const actionsMap = {
  [VOZ_LIVING_TOGGLE_MENU](state, action) {
    let isMenuOpen = !state.isMenuOpen;
    if (action.isMenuOpen) isMenuOpen = action.isMenuOpen;
    return { ...state, isMenuOpen }
  }
}

export default function vozReducer(state = initState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
