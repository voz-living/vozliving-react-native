import 'whatwg-fetch';

function patchProtocal(url) {
  if (/^\/\//.test(url)) {
    return url.replace(/^/, window.location.protocol);
  }
  return url;
}

function requestFactory(requestOption = {}) {
  return (url, additionOption = {}) => new Promise((resolve, reject) => {
    const options = { ...requestOption, ...additionOption };
    fetch(patchProtocal(url), options).then((response) => {
      if (options.jsonOutput === true) {
        response.json().then(resolve).catch(reject);  
      } else {
        response.text().then(resolve).catch(reject);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

const GET = requestFactory({
  method: 'get',
  credentials: 'include',
});

const POST = requestFactory({
  method: 'post',
  credentials: 'include',
});

const POST_FORM = (url, formDataObj, options = {}) => {
  const formData = new FormData();
  Object.keys(formDataObj).forEach((key) => formData.append(key, formDataObj[key]))
  /* eslint-disable new-cap */
  return POST(url, { ...options, body: formData });
}

const PUT = requestFactory({
  method: 'put',
  credentials: 'same-origin',
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
});

const PROXY_GET = (url, options = {}) =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ service: 'proxy', url, options }, (response) => {
      if (response.resolve) return resolve(response.resolve);
      reject(response.reject);
    });
  });

const headerNoCache = new Headers();
headerNoCache.append('pragma', 'no-cache');
headerNoCache.append('cache-control', 'no-cache');

export {
  PROXY_GET,
  GET,
  POST,
  PUT,
  headerNoCache,
};
