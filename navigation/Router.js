import { createRouter } from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import ForumScreen from '../screens/ForumScreen';
import ThreadScreen from '../screens/ThreadScreen';
import ReplyScreen from '../screens/ReplyScreen';
import LoginScreen from '../screens/LoginScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  forum: () => ForumScreen,
  thread: () => ThreadScreen,
  reply: () => ReplyScreen,
  login: () => LoginScreen,
  rootNavigation: () => RootNavigation,
}));
