import {
  VOZ_LIVING_HIDE_LOGIN,
} from '../constants/ActionTypes';

export const toggleMenu = ({ isHideLogin }) => ({
  type: VOZ_LIVING_HIDE_LOGIN,
  isHideLogin,
});
