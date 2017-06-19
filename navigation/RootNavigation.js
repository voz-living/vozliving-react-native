import React, { Component } from 'react';
import { Notifications } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigation, TabNavigation, TabNavigationItem } from '@expo/ex-navigation';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends Component {
  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    // this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('home', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>
        <TabNavigationItem
          id="login"
          renderIcon={isSelected => this._renderIcon('user', isSelected)}>
          <StackNavigation initialRoute="login" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
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
