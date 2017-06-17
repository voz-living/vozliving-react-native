import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import { createStore, combineReducers } from 'redux';

import vozliving from './vozliving';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    vozliving,
  })
);

export default store;
