import { GET } from './http';
import cheerio from 'cheerio-without-node-native';

const FORUM_URL = 'https://vozforums.com';

export function parseForums(response) {
  const forumLinks = cheerio('tbody[id^="collapseobj_forumbit"] tr td.alt1Active div a', response);
  const forums = [];
  forumLinks.each((idx, link) => {
    const href = link.attribs.href;
    const id = parseInt(href.replace('forumdisplay.php?f=', ''));
    const title = cheerio(link).text();
    forums.push({ href, title, id })
  });
  return forums;
}

export async function getForumList() {
  try {
    const response = await GET(FORUM_URL);
    return parseForums(response);
  } catch (error) {
    return [];
  }
}

