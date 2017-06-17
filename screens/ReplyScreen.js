import React, { Component } from 'react';
import { ScrollView, View, TextInput, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

const styles = StyleSheet.create({
  container: { flexDirection: 'column', alignContent: 'flex-start' },
  topContainer: { padding: 10 },
  text: { borderColor: 'gray', borderWidth: 1, padding: 10 },
});

export default class ReplyScreen extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: params => params.title,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      text: '',
    };
  }

  componentDidMount() {

  }

  keyboardToolbarContent() {
    
  }

  render() {
    const { isLoading } = this.state;
    return (
      <ScrollView>
        {!isLoading ?
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <AutoGrowingTextInput
                style={styles.text}
                value={this.state.text}
                onChangeText={(text) => this.setState({ text })}
              />
            </View>
          </View>
          : <Spinner visible={isLoading} />
        }
      </ScrollView>
    );
  }
}
