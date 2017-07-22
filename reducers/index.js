import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import vozliving from './vozliving';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    vozliving,
  }),
  applyMiddleware(thunk)
);

export default store;
