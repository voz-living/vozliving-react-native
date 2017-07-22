import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { quickPost } from '../utilities/post';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = StyleSheet.create({
  container: { flexDirection: 'column', alignContent: 'flex-start' },
  topContainer: { padding: 10 },
  text: { borderColor: 'gray', borderWidth: 1, padding: 10 },
  button: {}
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
      text: this.props.route.params.text || '',
    };
  }

  componentDidMount() {

  }

  async onPressSubmit() {
    const { id, user, secuirityToken } = this.props.route.params;
    if (this.state.text.length > 10) {
      const response = await quickPost(secuirityToken, user.id, id, this.state.text);
      console.log(response);
    }
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
            <View>
              <Button
                raised
                icon={{ name: 'cached' }}
                title='POST'
                style={styles.button}
                onPress={this.onPressSubmit.bind(this)}
              />
            </View>
          </View>
          : <Spinner visible={isLoading} />
        }
      </ScrollView>
    );
  }
}
