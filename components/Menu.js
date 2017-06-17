import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Router from '../navigation/Router';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';
import { NavigationActions } from '@expo/ex-navigation'
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    paddingTop: 10,
  },
});

@connect((data) => ({ navigation: data.navigation }))
export default class Menu extends Component {
  onPress(screenName) {
    const navigatorUID = this.props.navigation.currentNavigatorUID;
    this.props.dispatch(NavigationActions.replace(navigatorUID, Router.getRoute(screenName)));
  }

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={{ marginBottom: 20 }}>
        {
          this.props.menuList.map((l, i) => (
            <ListItem
              key={i}
              onPress={() => this.onPress(l.screen)}
              title={l.name}
            />
          ))
        }
        </List>
      </View>
    );
  }
}

Menu.propTypes = {
  menuList: PropTypes.array,
  navigator: PropTypes.object,
}
