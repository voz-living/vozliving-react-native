const http = require('https');
const fs = require('fs');
const icons = require('./icons');

icons.forEach(icon => {
  let name = icon.src.replace('/images/smilies/emos/', '');
  name = name.replace('/images/smilies/Off/', '');
  name = name.replace('/images/smilies/', '');

  const file = fs.createWriteStream(`../assets/images/${name}`);

  http.get(`https://vozforums.com${icon.src}`, response => response.pipe(file));
});
