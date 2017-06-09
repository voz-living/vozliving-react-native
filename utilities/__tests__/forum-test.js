import { parseForums } from '../forum';
const htmlMock = require('./forum-mock.html');

describe('Forum utils work as expected', () => {
  it('return list of forums', async () => {
    const forums = parseForums(htmlMock);
    expect(forums.length).toBeGreaterThanOrEqual(1);
  });
});
