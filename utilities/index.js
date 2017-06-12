import _ from 'lodash';
const offset = getTzOffset();

function getTzOffset() {
  const now = new Date();
  const tz = now.getTimezoneOffset();
  return tz + 420;
}

function getCurrent() {
  const now = new Date();
  now.setMinutes(offset);
  return now;
}

export function parseDateTime(datetime, { separation=',' } = {}) {
  const [dateStr, timeStr] = datetime.split(separation).map((s) => s.trim());
  let date;
  if (dateStr === 'Today') {
    date = getCurrent();
  } else if (dateStr === 'Yesterday') {
    date = getCurrent();
    date.setHours(date.getHours() - 24);
  } else {
    const ymd = dateStr.split('-').reverse();
    date = new Date(...ymd);
  }

  // FIX ME: timeStr is undefined => check the function above
  const [h, m] = timeStr ? timeStr.split(':') : [0, 0];
  const finalDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    h, m, 0);
  finalDate.setMinutes(finalDate.getMinutes() + offset);
  return finalDate;
}

export function getTime(timeStamp) {
  const date = new Date(timeStamp);
  const [d, mm] = [date.getDate(), date.getMonth() + 1]
    .map((x) => _.padStart(`${x}`, 2, '0'));
  /* eslint-disable max-len */
  return `${d}-${mm}-${date.getFullYear()}`;
  /* eslint-enable max-len */
}
