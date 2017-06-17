import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContext, NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { SideMenu } from 'react-native-elements';
import { connect } from 'react-redux';

import Router from './navigation/Router';
import Menu from './components/Menu';
import { toggleMenu } from './actions';
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

@connect(data => ({ isMenuOpen: data.vozliving.isMenuOpen }))
export default class AppComponent extends Component {
  menuList = [
    {
      name: 'Home',
      screen: 'home'
    },
    {
      name: 'Login',
      screen: 'login'
    }
  ]

  updateMenuStore(isMenuOpen) {
    this.props.dispatch(toggleMenu({ isMenuOpen }));
  }

  render() {
    return (
      <SideMenu
        menu={<Menu menuList={this.menuList} />}
        isOpen={this.props.isMenuOpen}
        onChange={(isMenuOpen) => this.updateMenuStore(isMenuOpen)}
      >
        <View style={styles.container}>
          <NavigationProvider context={navigationContext}>
            <StackNavigation id="root" initialRoute={Router.getRoute('home')} />
          </NavigationProvider>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
      </SideMenu>
    )
  }
}
