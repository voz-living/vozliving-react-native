import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getThreadList } from '../utilities/thread';

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
    }
  }
  
  componentDidMount() {
    this.loadThreadList(this.props.route.params.id);
  }

  async loadThreadList(id, page) {
    const threads = await getThreadList(id, page);
    this.setState({ threads });
  }

  openThread({ id, title }) {
    this.props.navigator.push('thread', { id, title });
  }

  render() {
    return (
      <ScrollView>
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.threads.map(l => (
            <ListItem
              key={l.id}
              title={l.title}
              onPress={() => this.openThread(l)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
