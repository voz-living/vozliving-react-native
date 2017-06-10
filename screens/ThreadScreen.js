import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getPostList } from '../utilities/post';
import HTMLView from 'react-native-htmlview';
import Spinner from 'react-native-loading-spinner-overlay';

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
      isLoading: true,
    }
  }
  
  componentDidMount() {
    this.loadPosts(this.props.route.params.id);
  }

  async loadPosts(id, page) {
    this.setState({ isLoading: true });
    const posts = await getPostList(id, page);
    this.setState({ posts, isLoading: false });
  }

  getFullUrl(imgUrl) {
    if (!imgUrl) return null;
    return { uri: `https://vozforums.com/${imgUrl}` };
  }

  render() {
    const { isLoading, posts } = this.state;
    return (
      <ScrollView>
        {!isLoading ? 
          <List containerStyle={{ marginTop: 0 }}>
            {posts.map((post, idx) => (
              <ListItem
                roundAvatar
                hideChevron
                key={idx}
                avatar={this.getFullUrl(post.user.img)}
                title={post.user.name}
                subtitle={<HTMLView value={post.content.html} />}
              />
            ))}
          </List>
          : <Spinner visible={isLoading} />
        }
      </ScrollView>
    );
  }
}
