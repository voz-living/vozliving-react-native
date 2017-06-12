import fs from 'fs';
import path from 'path';

import { parseThreadList, parsePageNum } from '../thread';

const htmlMock = fs.readFileSync(path.join(__dirname, './thread-mock.html'), 'utf8');

describe('Thread utils work as expected', () => {
  it('return list of threads', () => {
    const threads = parseThreadList(htmlMock);
    expect(threads.length).toBe(28); // 20 thread + 8 sticky
  });

  it('return page num', () => {
    const pageNum = parsePageNum(htmlMock);
    expect(pageNum).toBe(35927);
  });
});

