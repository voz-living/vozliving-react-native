import Expo from 'expo';
import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getThreadList } from '../utilities/thread';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ForumScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      title: params => params.title,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      isLoading: true,
    }
  }
  
  componentDidMount() {
    this.loadThreadList(this.props.route.params.id);
  }

  async loadThreadList(id, page) {
    this.setState({ isLoading: true });
    const threads = await getThreadList(id, page);
    this.setState({ threads, isLoading: false });
  }

  openThread({ id, title }) {
    this.props.navigator.push('thread', { id, title });
  }

  render() {
    const { isLoading, threads } = this.state;
    return (
      <ScrollView>
        {!isLoading ?
          <List>
            {threads.map(thread => (
              <ListItem
                key={thread.id}
                title={thread.title}
                onPress={() => this.openThread(thread)}
              />
            ))}
          </List>
          : <Spinner visible={isLoading} />
        }
      </ScrollView>
    );
  }
}
