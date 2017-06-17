import React, { Component } from 'react';
import { Modal, Text, ScrollView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { PostViewContent } from './PostView';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'flex-start',
    height: '100%'
  },
  topContainer: { flexBasis: '70%', paddingTop: 20 },
  bottomContainer: { display: 'flex', flexBasis: '30%', flexDirection: 'column', paddingBottom: 10 },
  button: { paddingTop: 10 },
});

export default class PostLongPressModal extends Component {
  render() {
    return (
      <Modal
        transparent={false}
        visible={this.props.visible}
      >
        <View style={styles.container}>
          <ScrollView style={styles.topContainer}>
            {this.props.post ? <PostViewContent user={this.props.post.user} content={this.props.post.content} /> : null}
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Button
              title='Quote'
              containerViewStyle={styles.button}
              onPress={this.props.onQuote}
            />
            <Button
              title='Close'
              containerViewStyle={styles.button}
              onPress={this.props.onHideModal}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

PostLongPressModal.propTypes = {
  post: PropTypes.object,
  visible: PropTypes.bool,
  onQuote: PropTypes.func,
  onHideModal: PropTypes.func,
};
