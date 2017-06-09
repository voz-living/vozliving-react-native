import { createRouter } from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import ForumScreen from '../screens/ForumScreen';
import ThreadScreen from '../screens/ThreadScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  forum: () => ForumScreen,
  thread: () => ThreadScreen,
  rootNavigation: () => RootNavigation,
}));
