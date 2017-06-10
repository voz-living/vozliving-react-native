import fs from 'fs';
import path from 'path';

import { parsePosts, parsePageNum } from '../post';

const htmlMock = fs.readFileSync(path.join(__dirname, './post-mock.html'), 'utf8');
const htmlMock1 = fs.readFileSync(path.join(__dirname, './post-mock-1.html'), 'utf8');

describe('Post utils work as expected', () => {
  const posts = parsePosts('6184241', htmlMock);
  
  it('return list of posts', () => {
    expect(posts.length).toBe(10);
  });
  
  it('all post have id', () => {
    expect(posts.some(s => !s.id)).toBe(false);
  });

  it('all post have user', () => {
    expect(posts.some(s => !s.user)).toBe(false);
  });

  it('all post have user name', () => {
    expect(posts.some(s => !s.user.name)).toBe(false);
  });

  it('all post have user id', () => {
    expect(posts.some(s => !s.user.id)).toBe(false);
  });

  it('all post have user title', () => {
    expect(posts.some(s => !s.user.title)).toBe(false);
  });

  it('all post html dont have \n \t \r', () => {
    expect(posts.some(s => !s.content.html.indexOf('\n') === -1)).toBe(false);
    expect(posts.some(s => !s.content.html.indexOf('\t') === -1)).toBe(false);
    expect(posts.some(s => !s.content.html.indexOf('\r') === -1)).toBe(false);
  });

  it('return page num', () => {
    expect(parsePageNum(htmlMock)).toBe('3');
  })
});

describe('Another post utils work as expected', () => {
  const posts = parsePosts('6184241', htmlMock1);
  
  it('return list of posts', () => {
    expect(posts.length).toBe(10);
  });
  
  it('all post have id', () => {
    expect(posts.some(s => !s.id)).toBe(false);
  });

  it('all post have user', () => {
    expect(posts.some(s => !s.user)).toBe(false);
  });

  it('all post have user name', () => {
    expect(posts.some(s => !s.user.name)).toBe(false);
  });

  it('all post have user id', () => {
    expect(posts.some(s => !s.user.id)).toBe(false);
  });

  it('all post have user title', () => {
    expect(posts.some(s => !s.user.title)).toBe(false);
  });

  it('all post html dont have \n \t \r', () => {
    expect(posts.some(s => !s.content.html.indexOf('\n') === -1)).toBe(false);
    expect(posts.some(s => !s.content.html.indexOf('\t') === -1)).toBe(false);
    expect(posts.some(s => !s.content.html.indexOf('\r') === -1)).toBe(false);
  });

  it('return page num', () => {
    expect(parsePageNum(htmlMock)).toBe('3');
  })
});
