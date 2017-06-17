import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { login } from '../utilities/user';
import SideBarButton from '../components/SideBarButton';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  button: { marginTop: 10 },
});

export default class LoginScreen extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Login',
      renderLeft: () => <SideBarButton />
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
    };
  }

  componentDidMount() {}

  onChangeUsername(username) {
    this.setState({ username });
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  async onPressSubmit() {
    const isSuccess = await login(this.state.username, this.state.password);
    
    if (isSuccess) {

    } else {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Username</FormLabel>
        <FormInput value={this.state.username} onChangeText={this.onChangeUsername.bind(this)}/>
        <FormLabel>Password</FormLabel>
        <FormInput value={this.state.password} secureTextEntry onChangeText={this.onChangePassword.bind(this)}/>
        <Button
          raised
          icon={{name: 'cached'}}
          title='LOGIN'
          style={styles.button}
          onPress={this.onPressSubmit.bind(this)}
        />
      </View>
    );
  }
}
