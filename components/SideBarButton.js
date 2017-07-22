import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toggleMenu } from '../actions';
import { connect } from 'react-redux';

@connect(data => ({ isMenuOpen: data.vozliving.isMenuOpen }))
export default class SidebarButton extends Component {
  render () {
    return (
      <TouchableHighlight
        onPress={() => this.props.dispatch(toggleMenu(!this.props.isMenuOpen))}
        style={{ flex: 1, padding: 8 }}
      >
        <Ionicons name="ios-menu" size={32} />
      </TouchableHighlight>
    )
  }
}