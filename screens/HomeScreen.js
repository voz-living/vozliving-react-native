import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getForumList } from '../utilities/forum';
import Spinner from 'react-native-loading-spinner-overlay';
import { saveToStore, getFromStore } from '../utilities/store';

export default class HomeScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Trang Chủ',
      visible: true,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      forums: [],
      isLoading: true,
    };
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    this.loadForumList();
  }

  async loadForumList() {
    this.setState({ isLoading: true }, async () => {
      let forums = await getFromStore('forums');
      if (!forums) {
        forums = await getForumList();
        saveToStore('forums', forums);
      }
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
          <List style={{ marginTop: 0, paddingTop: 0 }}>
            {forums.map(forum => (
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
