import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getForumList } from '../utilities/forum';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import SideBarButton from '../components/SideBarButton';

@connect(data => ({ isMenuOpen: data.vozliving.isMenuOpen }))
export default class HomeScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Home',
      visible: true,
      renderLeft: () => <SideBarButton />
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
