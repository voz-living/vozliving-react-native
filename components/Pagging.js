import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: { flexGrow: 1, flexBasis: '15%', marginLeft: 0, marginRight: 0 },
  text: { flexGrow: 3, height: 40, alignItems: 'center', justifyContent: 'center', flexBasis: '40%' },
  container: { display: 'flex', flexDirection: 'row', height: 40 },
});

export default class Pagging extends Component {
  render() {
    const {
      maxPage, currentPage, onFirstPageClick,
      onPrevPageClick, onNextPageClick, onLastPageClick,
    } = this.props;

    return (
      <View style={styles.container}>
        <Button
          icon={{ name: 'first-page' }}
          onPress={onFirstPageClick}
          containerViewStyle={styles.button}
          disabled={currentPage < 2}
          style={{ margin: 0 }}
        />
        <Button
          icon={{ name: 'chevron-left' }}
          onPress={onPrevPageClick}
          containerViewStyle={styles.button}
          disabled={currentPage < 2}
        />
        <View style={styles.text}>
          <Text>{currentPage} / {maxPage}</Text>
        </View>
        <Button
          icon={{ name: 'chevron-right' }}
          onPress={onNextPageClick}
          containerViewStyle={styles.button}
          disabled={currentPage + 1 > maxPage}
        />
        <Button
          icon={{ name: 'last-page' }}
          onPress={onLastPageClick}
          containerViewStyle={styles.button}
          disabled={currentPage + 1 > maxPage}
        />
      </View>
    );
  }
}

Pagging.propTypes = {
  maxPage: PropTypes.number,
  currentPage: PropTypes.number,
  onFirstPageClick: PropTypes.func,
  onPrevPageClick: PropTypes.func,
  onNextPageClick: PropTypes.func,
  onLastPageClick: PropTypes.func
};

Pagging.defaultProps = {
  onFirstPageClick: () => {},
  onPrevPageClick: () => {},
  onNextPageClick: () => {},
  onLastPageClick: () => {},
  maxPage: 1,
  currentPage: 1,
}
