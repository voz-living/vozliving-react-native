import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { getForumList } from '../utilities/forum';
import Spinner from 'react-native-loading-spinner-overlay';
import { saveToStore, getFromStore } from '../utilities/store';

export default class HomeScreen extends Component {
  static route = {
    navigationBar: {
      title: 'VozLiving',
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

  toggleFavorite(forum) {
    const { forums } = this.state;
    const found = forums.find(f => f.id === forum.id);
    found.isFavorite = !found.isFavorite;
    saveToStore('forums', forums).then(() => {
      this.setState({ forums });
    });
  }

  render() {
    const { isLoading, forums } = this.state;
    const favorite = forums.filter(f => f.isFavorite);
    const sorted = favorite.concat(forums.filter(f => !f.isFavorite));

    return (
      <ScrollView>
        {!isLoading ? 
          <List style={{ marginTop: 0, paddingTop: 0 }}>
            {sorted.map(forum => (
              <ListItem
                key={forum.id}
                title={forum.title}
                leftIcon={<Icon onPress={() => this.toggleFavorite(forum)} name={forum.isFavorite ? 'star' : 'star-border'}/>}
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
