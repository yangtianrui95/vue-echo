const baseURL = "http://kswapd.cn";


function request(path) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', baseURL + path);
    xhr.onload = function () {
      resolve(JSON.parse(xhr.response));
    };
    xhr.onerror = function () {
      reject('net failed');
    };
    xhr.send();
  })
}

function getBanner() {
  return request('/banner');
}

function getList(page) {
  if (!page) {
    return;
  }
  return request(`/list?page=${page}`);
}


export default {
  getBanner, getList
}
