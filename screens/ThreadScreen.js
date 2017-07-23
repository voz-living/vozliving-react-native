import React, { Component } from 'react';
import { ScrollView, RefreshControl, View, LayoutAnimation } from 'react-native';
import { List, Icon } from 'react-native-elements';
import { getPostList } from '../utilities/post';
import Spinner from 'react-native-loading-spinner-overlay';
import Pagging from '../components/Pagging';
import PostView from '../components/PostView';
import PostLongPressModal from '../components/PostLongPressModal';
import ActionButton from 'react-native-action-button';
import { ERROR_NOT_LOGIN } from '../constants/Message';

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
      isShowActionButton: false,
    };
    this.scrollOffset = 0;
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
      if (!user || secuirityToken === 'guest') {
        this.props.navigator.push('login', { message: ERROR_NOT_LOGIN });
        return;
      }
      const text = `[QUOTE=${user.name};${post.id}]${post.content.text}[/QUOTE]`;
      this.props.navigator.push('reply', { id, title, user, secuirityToken, text });
    });
  }

  openReplyScreen() {
    const { id, title } = this.props.route.params;
    const { user, secuirityToken } = this.state;
    if (!user || secuirityToken === 'guest') {
      this.props.navigator.push('login', { message: ERROR_NOT_LOGIN });
      return;
    }
    this.props.navigator.push('reply', { id, title, user, secuirityToken });
  }

  onScroll(event){
    // https://gist.github.com/mmazzarolo/cfd467436f9d110e94a685b06eb3900f
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
    };
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = (currentOffset > 0 && currentOffset > this.scrollOffset)
      ? 'down'
      : 'up';
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isShowActionButton = direction === 'up'
    if (isShowActionButton !== this.state.isShowActionButton) {
      LayoutAnimation.configureNext(CustomLayoutLinear);
      this.setState({ isShowActionButton });
    }
    // Update your scroll position
    this.scrollOffset = currentOffset;
  }

  render() {
    const { isLoading, posts, currentPage, maxPage, isShowActionButton } = this.state;
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
            onScroll={(event) => this.onScroll(event)}
            scrollEventThrottle={100}
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
        {isShowActionButton ?
        <ActionButton
          offsetY={60}
          buttonColor="rgba(231,76,60,1)"
        >
          <ActionButton.Item
            buttonColor='#9b59b6'
            title='New Reply'
            onPress={() => this.openReplyScreen()}>
            <Icon name="reply" />
          </ActionButton.Item>
        </ActionButton> : null}
      </View>
      : <Spinner visible={isLoading} />
    );
  }
}
