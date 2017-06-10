import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';

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
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="<<" onPress={onFirstPageClick}
          accessibilityLabel="Trang đầu"
          style={{ flex: 1, height: 30 }}
          disabled={currentPage < 2}
        />
        <Button
          title="<" onPress={onPrevPageClick}
          accessibilityLabel="Trang trước"
          style={{ flex: 1, height: 30 }}
          disabled={currentPage < 2}
        />
        <View style={{ flex: 1, height: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{currentPage} / {maxPage}</Text>
        </View>
        <Button
          title=">" onPress={onNextPageClick}
          accessibilityLabel="Trang tiếp theo"
          style={{ flex: 1, height: 30 }}
          disabled={currentPage + 1 > maxPage}
        />
        <Button
          title=">>" onPress={onLastPageClick}
          accessibilityLabel="Trang cuối"
          style={{ flex: 1, height: 30 }}
          disabled={currentPage + 1 > maxPage}
        />
      </View>
    );
  }
}
