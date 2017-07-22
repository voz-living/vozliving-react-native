import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContext, NavigationProvider, StackNavigation } from '@expo/ex-navigation';

import Router from './navigation/Router';
import Store from './reducers';

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default class AppComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationProvider context={navigationContext}>
          <StackNavigation id="root" initialRoute={Router.getRoute('rootNavigation')} />
        </NavigationProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
      </View>
    )
  }
}
