import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { login } from '../utilities/user';
import { ERROR_LOGIN_FAIL } from '../constants/Message';

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  buttonContainer: { marginTop: 10 },
});

export default class LoginScreen extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Đăng nhập',
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: props.route.params.message || null,
    };
  }

  onChangeUsername(username) {
    this.setState({ username });
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  async onPressSubmit() {
    const isSuccess = await login(this.state.username, this.state.password);
    
    if (isSuccess) {
      this.setState({ errorMessage: null }, () => {
        this.props.navigator.push('home');
      });
    } else {
      this.setState({ errorMessage: ERROR_LOGIN_FAIL });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.errorMessage ? <Text style={{ padding: 20 }}>{this.state.errorMessage}</Text> : null}
          <FormLabel>Tên đăng nhập</FormLabel>
          <FormInput value={this.state.username} onChangeText={(change) => this.onChangeUsername(change)}/>
          <FormLabel>Mật khẩu</FormLabel>
          <FormInput value={this.state.password} secureTextEntry onChangeText={(change) => this.onChangePassword(change)}/>
          <Button
            raised
            title='LOGIN'
            containerViewStyle={styles.buttonContainer}
            onPress={() => this.onPressSubmit()}
          />
        </View>
      </ScrollView>
    );
  }
}
