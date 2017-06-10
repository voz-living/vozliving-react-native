import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getForumList } from '../utilities/forum';
import Spinner from 'react-native-loading-spinner-overlay';

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
      isLoading: true,
    };
  }

  componentDidMount() {
    this.loadForumList();
  }

  async loadForumList() {
    this.setState({ isLoading: true }, async () => {
      const forums = await getForumList();
      this.setState({ forums, isLoading: false });
    });
  }

  openForum({ id, title }) {
    this.props.navigator.push('forum', { id, title });
  }

  render() {
    const { isLoading, forums } = this.state;
    return (
      <ScrollView>
        {!isLoading ? 
          <List>
            {forums.map((forum, i) => (
              <ListItem
                key={forum.id}
                title={forum.title}
                onPress={() => this.openForum(forum)}
              />
            ))}
          </List>
          : <Spinner visible={isLoading} />
        }
      </ScrollView>
    );
  }
}
