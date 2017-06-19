import React, { Component } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { List } from 'react-native-elements';
import { getPostList } from '../utilities/post';
import Spinner from 'react-native-loading-spinner-overlay';
import Pagging from '../components/Pagging';
import PostView from '../components/PostView';
import PostLongPressModal from '../components/PostLongPressModal';
import ActionButton from 'react-native-action-button';

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
      maxPage: 1,
      currentPage: 1,
      showPostModal: false,
      selectedPost: null,
      user: null,
      secuirityToken: null,
    }
  }
  
  componentDidMount() {
    this.refresh();
  }

  async loadPosts(id, page) {
    this.setState({ isLoading: true }, async () => {
      const [posts, maxPage, user, secuirityToken] = await getPostList(id, page);
      this.setState({ posts, isLoading: false, maxPage, user, secuirityToken });
    });
  }

  refresh() {
    this.loadPosts(this.props.route.params.id, this.state.currentPage);
  }

  goToPage(page) {
    if (page < 0 || page > this.state.maxPage) return;
    this.setState({ currentPage: page }, () => this.refresh());
  }

  onLongPress(post) {
    this.setState({ selectedPost: post, showPostModal: true });
  }

  onQuote(post) {
    const { id, title } = this.props.route.params;
    const { user, secuirityToken } = this.state;
    this.setState({ showPostModal: false }, () => {
      const text = `[QUOTE=${user.name};${post.id}]${post.content.text}[/QUOTE]`;
      this.props.navigator.push('reply', { id, title, user, secuirityToken, text });
    });
  }

  openReplyScreen() {
    const { id, title } = this.props.route.params;
    const { user, secuirityToken } = this.state;
    this.props.navigator.push('reply', { id, title, user, secuirityToken });
  }

  render() {
    const { isLoading, posts, currentPage, maxPage } = this.state;
    return (
      !isLoading ?
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <List containerStyle={{ marginTop: 0, flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={this.refresh.bind(this)}
              />
            }
          >
            {posts.map(post => (
              <PostView
                content={post.content}
                user={post.user}
                key={post.id}
                onLongPress={() => this.onLongPress(post)}
              />
            ))}
          </ScrollView>
        </List>
        <Pagging
          currentPage={currentPage}
          maxPage={maxPage}
          onFirstPageClick={() => this.goToPage(1)}
          onPrevPageClick={() => this.goToPage(currentPage - 1)}
          onNextPageClick={() => this.goToPage(currentPage + 1)}
          onLastPageClick={() => this.goToPage(maxPage)}
        />
        <PostLongPressModal
          visible={this.state.showPostModal}
          post={this.state.selectedPost}
          onQuote={() => this.onQuote(this.state.selectedPost)}
          onHideModal={() => this.setState({ showPostModal: false })}
        />
        <ActionButton
          offsetY={60}
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.openReplyScreen()}
        />
      </View>
      : <Spinner visible={isLoading} />
    );
  }
}
