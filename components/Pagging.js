import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { COLORS } from '../constants'

const styles = StyleSheet.create({
  buttonContainer: { flexGrow: 1, flexBasis: '15%', marginLeft: 0, marginRight: 0 },
  buttonStyle: { backgroundColor: COLORS.BLUE_DARK, borderRadius: 0 },
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
          containerViewStyle={styles.buttonContainer}
          disabled={currentPage < 2}
          style={{ margin: 0,  }}
          buttonStyle={styles.buttonStyle}
        />
        <Button
          icon={{ name: 'chevron-left' }}
          onPress={onPrevPageClick}
          containerViewStyle={styles.buttonContainer}
          disabled={currentPage < 2}
          buttonStyle={styles.buttonStyle}
        />
        <View style={styles.text}>
          <Text>{currentPage} / {maxPage}</Text>
        </View>
        <Button
          icon={{ name: 'chevron-right' }}
          onPress={onNextPageClick}
          containerViewStyle={styles.buttonContainer}
          disabled={currentPage + 1 > maxPage}
          buttonStyle={styles.buttonStyle}
        />
        <Button
          icon={{ name: 'last-page' }}
          onPress={onLastPageClick}
          containerViewStyle={styles.buttonContainer}
          disabled={currentPage + 1 > maxPage}
          buttonStyle={styles.buttonStyle}
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
