import React, { Component } from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: { flexGrow: 2, height: 30, minWidth: 50 },
  text: { flexGrow: 2, height: 30, alignItems: 'center', justifyContent: 'center' },
  container: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
})

export default class Pagging extends Component {
  static defaultProps = {
    onFirstPageClick: () => {},
    onPrevPageClick: () => {},
    onNextPageClick: () => {},
    onLastPageClick: () => {},
    maxPage: Infinity,
    currentPage: 1,
  }

  render() {
    const {
      maxPage, currentPage, onFirstPageClick,
      onPrevPageClick, onNextPageClick, onLastPageClick,
    } = this.props;

    return (
      <View style={styles.container}>
        <Button
          title="<<" onPress={onFirstPageClick}
          accessibilityLabel="Trang đầu"
          style={styles.button}
          disabled={currentPage < 2}
        />
        <Button
          title="<" onPress={onPrevPageClick}
          accessibilityLabel="Trang trước"
          style={styles.button}
          disabled={currentPage < 2}
        />
        <View style={styles.text}>
          <Text>{currentPage} / {maxPage}</Text>
        </View>
        <Button
          title=">" onPress={onNextPageClick}
          accessibilityLabel="Trang tiếp theo"
          style={styles.button}
          disabled={currentPage + 1 > maxPage}
        />
        <Button
          title=">>" onPress={onLastPageClick}
          accessibilityLabel="Trang cuối"
          style={styles.button}
          disabled={currentPage + 1 > maxPage}
        />
      </View>
    );
  }
}
