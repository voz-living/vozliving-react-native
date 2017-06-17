import {
  VOZ_LIVING_INIT,
  VOZ_LIVING_TOGGLE_MENU,
} from '../constants/ActionTypes';

export const init = (initState) => ({
  ...initState,
  type: VOZ_LIVING_INIT,
});

export const toggleMenu = ({ isMenuOpen }) => ({
  type: VOZ_LIVING_TOGGLE_MENU,
  isMenuOpen,
});
