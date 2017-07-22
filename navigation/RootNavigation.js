import React, { Component } from 'react';
import { Notifications } from 'expo';
import { StackNavigation, DrawerNavigation, DrawerNavigationItem } from '@expo/ex-navigation';
import { View, Text, StyleSheet } from 'react-native';

import Alerts from '../constants/Alerts';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import Router from './Router';
import { NAVBAR_STYLE, COLORS } from '../constants';


const styles = StyleSheet.create({
  header: {
    height: 20,
  },
  selectedItemStyle: {
    backgroundColor: COLORS.TOTALLY_WHITE,
  },
  selectedTitleText: {
    color: COLORS.BLUE_DARK,
  },
  titleText: {
    fontWeight: 'bold',
    color: COLORS.TOTALLY_WHITE,
  },
});

export default class RootNavigation extends Component {
  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    // this._notificationSubscription && this._notificationSubscription.remove();
  }

  _renderHeader() {
    return <View style={styles.header}></View>;
  }

  _renderTitle(text, isSelected) {
    return (
      <Text style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
        {text}
      </Text>
    );
  }

  render() {
    return (
      <DrawerNavigation
        id='main'
        initialItem='home'
        drawerWidth={300}
        renderHeader={this._renderHeader}
        drawerStyle={{ backgroundColor: COLORS.BLUE_DARK }}
      >
        <DrawerNavigationItem
          id='home'
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Home', isSelected)}
        >
          <StackNavigation
            id='home'
            initialRoute={Router.getRoute('home')}
            defaultRouteConfig={{
              navigationBar: NAVBAR_STYLE,
            }}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id='login'
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Login', isSelected)}
        >
          <StackNavigation
            id='login'
            initialRoute={Router.getRoute('login')}
            defaultRouteConfig={{
              navigationBar: NAVBAR_STYLE,
            }}
          />
        </DrawerNavigationItem>
      </DrawerNavigation>
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}
