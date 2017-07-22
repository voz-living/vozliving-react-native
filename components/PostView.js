import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import WebView from './AutoSizeWebView';
import { getTime } from '../utilities';

const styles = StyleSheet.create({
  container: { borderBottomColor: '#ddd', borderBottomWidth: 1, borderStyle: 'solid', marginTop: 20 },
  topContainer: { flexDirection: 'row', paddingLeft: 10, paddingRight: 10, flexWrap: 'wrap' },
  avatar: { flex: 1 },
  userInfo: { flex: 4, flexDirection: 'row' },
  userName: { flexDirection: 'column', flex: 1 },
  alignRight: { textAlign: 'right' },
  bottomContainer: { paddingLeft: 10, paddingRight: 10, flexDirection: 'column', marginTop: 30, marginBottom: 20 },
  webview: { width: '94%', marginLeft: '2%', paddingTop: 10, paddingBottom: 10, borderRightColor: '#fff', backgroundColor: 'transparent' },
  quoteButton: { marginTop: 10 },
});

export class PostViewContent extends Component {
  getFullUrl(imgUrl) {
    if (!imgUrl) return null;
    return { uri: `https://vozforums.com/${imgUrl}` };
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Avatar
            medium
            style={styles.avatar}
            source={this.getFullUrl(this.props.user.img)}
          />
          <View style={styles.userInfo}>
            <View style={styles.userName}>
              <Text>{this.props.user.name}</Text>
              <Text>{this.props.user.title || 'Member'}</Text>
            </View>
            <View style={styles.userName}>
              <Text style={styles.alignRight}>Join: {getTime(this.props.user.joinDate) || 'NA'}</Text>
              <Text style={styles.alignRight}>Post: {this.props.user.posts || '0'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <WebView
            style={styles.webview}
            source={{ html: this.props.content.html }}
          />
        </View>
      </View>
    );
  }
}

PostViewContent.propTypes = {
  user: PropTypes.object,
  content: PropTypes.object,
}

export default class PostView extends Component {
  // can not remove the View below?
  render() {
    return (
      <TouchableHighlight
        onLongPress={this.props.onLongPress}
        underlayColor={'#ddd'}
      >
        <View>
          <PostViewContent user={this.props.user} content={this.props.content} />
        </View>
      </TouchableHighlight>
    );
  }
}

PostView.propTypes = {
  user: PropTypes.object,
  content: PropTypes.object,
  onLongPress: PropTypes.func,
};
