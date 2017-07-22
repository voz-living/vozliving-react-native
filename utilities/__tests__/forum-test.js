import { parseForums } from '../forum';
import fs from 'fs';
import path from 'path';

const htmlMock = fs.readFileSync(path.join(__dirname, './forum-mock.html'), 'utf8');

describe('Forum utils work as expected', () => {
  it('return list of forums', () => {
    const forums = parseForums(htmlMock);
    expect(forums.length).toBe(43);
  });
});
