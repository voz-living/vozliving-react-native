const request = require('request');

var formData = {
  do: 'login',
  vb_login_username: 'npt96',
  vb_login_password: 'thanh1',
};

request.post({
  url: 'https://vozforums.com/login.php?do=login',
  formData: formData
}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});