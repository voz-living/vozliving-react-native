import _ from 'lodash';
import cheerio from 'cheerio-without-node-native';

import { GET } from './http';
import { parseDateTime } from './index.js';

const FORUM_URL = 'https://vozforums.com';

export async function getThreadList(id, pageNum = 0) {
  try {
    const url = pageNum > 0 ? `${FORUM_URL}/forumdisplay.php?f=${id}&page=${pageNum}` : `${FORUM_URL}/forumdisplay.php?f=${id}`;
    const response = await GET(url);
    const threadTDs = cheerio('#threadslist tbody[id^="threadbits_forum"] tr td[id^="td_threadtitle_"]', response);
    const threads = [];
    threadTDs.each((idx, td) => {
      const id = td.attribs.id.match(/\d+/)[0];
      const titleLink = cheerio(td).find('>div a[id^="thread_title_"]');
      const title = titleLink ? titleLink.text() : '';

      const links = cheerio(td).find('>div span > a');
      const lastPageLink = links.eq(links.length - 1);
      const lastPageHref = lastPageLink && lastPageLink.attribs ? lastPageLink.attribs.href: null; 
      let lastPage = 1;
      
      if (lastPageHref) {
        const match = lastPageHref.match(/&page=(\d+)/);
        if (match) lastPage = match[1];
      }
      
      threads.push({ id, pageNum: parseInt(lastPage, 10), title });
    });
    return threads;
  } catch (error) {
    console.log({
      message: 'Can not get thread list!',
      error,
    });
    return [];
  }
}

function parsePost($post, threadId) {
  try {
    const post = { tid: threadId, user: {}, content: {} };
    // FIX ME
    // const [, postId] = $post.attr('id').match(/post(\d+)/);
    // post.id = parseInt(postId, 10);
    const $head = $post.find('td.thead');
    const $postCount = $head.find('[id^="postcount"]');
    const datetimeStr = $head.find('> div').eq(1).text().trim();

    post.datetime = parseDateTime(datetimeStr);
    post.url = $postCount.attr('href');
    post.num = parseInt($postCount.text(), 10);

    // process user info
    const $userNcontent = $post.find('> tr');
    const $user = $userNcontent.eq(1).find('table tr > td');
    
    post.user.img = $user.eq(0).find('img').attr('src');

    let _next = 1;
    if (_.isUndefined(post.user.img)) {
      post.user.img = null;
      _next = 0;
    }

    const $userInfo = $user.eq(_next).find(' > div');
    const $userName = $userInfo.eq(0).find('.bigusername');

    // FIX ME
    // const [, userId] = $userName.attr('href').match(/u=(\d+)/);
    // post.user.id = userId;

    post.user.name = $userName.text().trim();
    post.user.title = $userInfo.eq(1).text().trim();

    // FIX ME
    // const $userMeta = $user.eq(_next + 2).find('> div > div');
    // const jd = $userMeta.eq(0).text().trim().split(':')[1].trim().split('-');
    // post.user.joinDate = new Date(jd[1], jd[0], 1, 0, 0, 0);
    // post.user.posts = parseInt($userMeta.eq(1).text().split(':')[1].trim().replace(/,/g, ''));
    
    // end process user info
    const $content = $userNcontent.eq(2).find('div[id^="post_message"]');
    post.title = $userNcontent.eq(2).find('td[id^="td_post_"] > div').eq(0).text().trim();
    post.content.text = $content.text().trim();
    post.content.html = $content.html();

    // need to correct all image src
    post.content.html = post.content.html.replace(/src="\/?image/g, `src="${FORUM_URL}/image`);
    // remove all \n \t \r things 
    post.content.html = post.content.html.replace(/(\\r|\\n|\\t)/g, '');

    // clean again
    post.content.html = post.content.html.trim();

    return post;
  } catch (error) {
    console.log({
      message: 'Can not parse post!',
      error: error.toString(),
    });
    return null;
  }  
}

const THREAD_URL = `${FORUM_URL}/showthread.php?t=`;

export async function getThread(tid, pageNum = 0) {
  try {
    const url = pageNum > 0 ? `${THREAD_URL}${tid}&page=${pageNum}` : `${THREAD_URL}${tid}`;
    const response = await GET(url);
    const posts = cheerio('div#posts > div', response);
    const out = [];

    posts.each((idx, post) => {
      const $post = cheerio(post).find('table[id^="post"]');
      const parsed = parsePost($post, tid);
      if (parsed) out.push(parsed);
    });
    return out;
  } catch (error) {
    console.log({
      message: 'Can not get thread!',
      error: error.toString(),
    });
    return [];
  }
}
