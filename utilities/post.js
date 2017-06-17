import _ from 'lodash';
import cheerio from 'cheerio-without-node-native';

import { GET } from './http';
import { parseDateTime } from './index.js';

const FORUM_URL = 'https://vozforums.com';
const THREAD_URL = `${FORUM_URL}/showthread.php?t=`;

function parsePost($post, threadId) {
  try {
    const post = { tid: threadId, user: {}, content: {} };
    const [, postId] = $post.attr('id').match(/post(\d+)/);
    post.id = parseInt(postId, 10);
    const $head = $post.find('td.thead');
    const $postCount = $head.find('[id^="postcount"]');
    const datetimeStr = $head.find('> div').eq(1).text().trim();

    post.datetime = parseDateTime(datetimeStr);
    post.url = $postCount.attr('href');
    post.num = parseInt($postCount.text(), 10);

    // process user info
    const $userNcontent = $post.find('> tr');
    const $user = $userNcontent.eq(1).find('table tr > td');

    post.user.img = $user.eq(0).find('a > img').attr('src');

    let _next = 1;
    if (_.isUndefined(post.user.img)) {
      post.user.img = null;
      _next = 0;
    }

    const $userInfo = $user.eq(_next).find(' > div');
    const $userName = $userInfo.eq(0).find('.bigusername');

    const [, userId] = $userName.attr('href').match(/u=(\d+)/);
    post.user.id = userId;
    post.user.name = $userName.text().trim();
    post.user.title = $userInfo.eq(1).text().trim();

    const $userMeta = $user.eq(_next + 2).find('> div > div');
    const jd = $userMeta.eq(0).text().trim().split(':')[1].trim().split('-');
    post.user.joinDate = new Date(jd[1], jd[0], 1, 0, 0, 0);
    post.user.posts = parseInt($userMeta.eq(1).text().split(':')[1].trim().replace(/,/g, ''));
    
    // end process user info
    const $content = $userNcontent.eq(2).find('div[id^="post_message"]');
    post.title = $userNcontent.eq(2).find('td[id^="td_post_"] > div').eq(0).text().trim();

    // clean quote to a div remove stupid table format
    const quoteTables = $content.find('.voz-bbcode-quote');

    if (quoteTables && quoteTables.length > 0) {
      quoteTables.each((idx, table) => {
        const quote = cheerio(table).find('tr td');
        const wrap = cheerio('<div class="voz-bbcode-quote" style="background: #ddd; padding: 5px; margin-bottom: 5px;"></div>');
        const $table = cheerio(table);
        $table.parent().css({ margin: '5px' });
        $table.replaceWith(wrap.append(quote.contents()));
      });
    }
    
    // clean the quote link for user
    const quoteLinks = $content.find('div a[rel="nofollow"]');
    
    if (quoteLinks && quoteLinks.length > 0) {
      quoteLinks.each((idx, lnk) => {
        cheerio(lnk).remove();
      });
    }
    // save for images
    const iamges = $content.find('img');

    if (iamges && iamges.length > 0) {
      iamges.each((idx, im) => {
        cheerio(im).css({ 'max-width': '100%' });
      });
    }

    post.content.text = $content.text().trim();
    post.content.html = $content.html();

    // need to correct all image src
    post.content.html = post.content.html.replace(/src="\/?image/g, `src="${FORUM_URL}/image`);
    // remove all \n \t \r things and comment
    // idea here is keep the html tag to render
    post.content.html = post.content.html.replace(/<!--.*-->|\t|\n|\r|\\r|\\t|\\n/gi, '');

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

export function parsePosts(tid, response) {
  const $posts = cheerio('div#posts > div', response);
  const posts = [];

  $posts.each((idx, post) => {
    if (post.attribs.id !== 'lastpost') {
      const $post = cheerio(post).find('table[id^="post"]');
      const parsed = parsePost($post, tid);
      if (parsed) posts.push(parsed);
    }
  });
  return posts;
}

export function parsePageNum(response) {
  const pageTexts = cheerio('.pagenav td.vbmenu_control', response);
  if (pageTexts) {
    const text = pageTexts.eq(0).text();
    const match = text.match(/(\d+)\sof\s(\d+)/);
    if (match) return parseInt(match[2], 10);
  }
  return 1;
}

export async function getPostList(tid, pageNum = 0) {
  try {
    const url = pageNum > 0 ? `${THREAD_URL}${tid}&page=${pageNum}` : `${THREAD_URL}${tid}`;
    const response = await GET(url);
    return [parsePosts(tid, response), parsePageNum(response)];
  } catch (error) {
    console.log({
      message: 'Can not get posts!',
      error: error.toString(),
    });
    return [[], 0];
  }
}
