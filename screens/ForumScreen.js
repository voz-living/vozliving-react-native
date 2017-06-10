import Expo from 'expo';
import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getThreadList } from '../utilities/thread';
import Spinner from 'react-native-loading-spinner-overlay';
import Pagging from '../components/Pagging';

export default class ForumScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      title: params => params.title,
    },
  };
  
  constructor(props) {
    super(props);
    this.threadId = this.props.route.params.id;
    this.state = {
      threads: [],
      isLoading: true,
      maxPage: Infinity,
      currentPage: 1,
    }
  }
  
  componentDidMount() {
    this.refresh();
  }

  async loadThreadList(id, page) {
    this.setState({ isLoading: true }, async () => {
      const [threads, maxPage] = await getThreadList(id, page);
      this.setState({ threads, isLoading: false, maxPage });
    });
  }

  openThread({ id, title }) {
    this.props.navigator.push('thread', { id, title });
  }

  goToPage(page) {
    if (page < 0 || page > this.state.maxPage) return;
    this.setState({ currentPage: page }, () => {
      this.refresh();
    });
  }

  refresh() {
    this.loadThreadList(this.threadId, this.state.currentPage);
  }

  render() {
    const { isLoading, threads, currentPage, maxPage } = this.state;
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
            {threads.map(thread => (
              <ListItem
                key={thread.id}
                title={thread.title}
                onPress={() => this.openThread(thread)}
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
      </View>
      : <Spinner visible={isLoading} />
    );
  }
}
