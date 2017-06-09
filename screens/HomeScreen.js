import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getForumList } from '../utilities/forum';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      forums: [],
    };
  }

  componentDidMount() {
    this.loadForumList();
  }

  async loadForumList() {
    const forums = await getForumList();
    this.setState({ forums });
  }

  openForum({ id, title }) {
    this.props.navigator.push('forum', { id, title });
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.forums.map((l, i) => (
            <ListItem
              key={l.id}
              title={l.title}
              onPress={() => this.openForum(l)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
