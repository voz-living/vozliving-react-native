import Expo from 'expo';
import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import AppComponent from './app';
import Store from './reducers';

import { FontAwesome } from '@expo/vector-icons';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
        ],
        fonts: [
          FontAwesome.font,
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }
  
  render() {
    if (this.state.appIsReady) {
      return (
        <ReduxProvider store={Store}>
          <AppComponent />
        </ReduxProvider>
      );
    } else {
      return <Expo.AppLoading />;
    }
  }
}

Expo.registerRootComponent(AppContainer);
