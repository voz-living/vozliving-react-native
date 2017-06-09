import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getThread } from '../utilities/thread';
import HTMLView from 'react-native-htmlview';

export default class ThreadScreen extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: params => params.title,
    },
  }
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }
  
  componentDidMount() {
    this.loadPosts(this.props.route.params.id);
  }

  async loadPosts(id, page) {
    const posts = await getThread(id, page);
    this.setState({ posts });
  }

  getFullUrl(imgUrl) {
    if (!imgUrl) return null;
    return `https://vozforums.com/${imgUrl}`;
  }

  render() {
    return (
      <ScrollView>
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.posts.map((post, idx) => (
            <ListItem
              roundAvatar
              hideChevron
              key={idx}
              avatar={{ uri: this.getFullUrl(post.user.img) }}
              title={post.user.name || 'Unknown user name'}
              subtitle={<HTMLView value={post.content.html} />}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
