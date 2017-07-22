import { POST_FORM } from './http';

const FORUM_URL = 'https://vozforums.com';

export async function login(username, password) {
  const response = await POST_FORM(`${FORUM_URL}/login.php?do=login`, {
    do: 'login',
    vb_login_username: username,
    vb_login_password: password,
  });
  return response.indexOf('Thank you for logging in') > -1;
}
