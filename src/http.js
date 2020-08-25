// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import axios from 'axios';
import store from './store/index.js';

function toFormData(obj) {
  var query = '';
  var name, value, fullSubName, subName, subValue, innerObj, i;
  for (name in obj) {
    value = obj[name];

    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name;
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += toFormData(innerObj) + '&';
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += toFormData(innerObj) + '&';
      }
    } else if (value !== undefined && value !== null) {
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}

Vue.prototype.$http = axios;
Vue.prototype.$http.success = function(obj) {
  let vm = obj.vm;
  let res = obj.res;
  if (res.headers.authorization) {
    store.commit('setAccessToken', res.headers.authorization);
  }
  if (res.data.code == 200) {
    obj.resolve(res.data);
  } else if (res.data.code == 401) {
    vm.$message.error(res.response.data.message);
    obj.reject(res);
    vm.$router.push({
      name: 'login',
      query: { redirect: vm.$route.path }
    });
  } else if (res.data.code == 1000) {
    vm.$message.error(res.data.message);
    vm.$router.push({
      name: '404',
      query: { redirect: vm.$route.path }
    });
    obj.reject(res);
  } else {
    vm.$message.error(res.data.message);
    obj.reject(res);
  }
};
Vue.prototype.$http.error = function(obj) {
  let vm = obj.vm;
  let res = obj.res;
  let reject = obj.reject;
  if (res.response.data.code == 401) {
    localStorage.removeItem('vuex');
    vm.$store.dispatch('setUserInfo', {});
    vm.$message.error(res.response.data.message);
    vm.$router.push({
      name: 'login',
      query: { redirect: vm.$route.path }
    });
  } else if (res.response.data.code == 405) {
    vm.$message.error('当前用户无权限访问');
  } else if (res.response.data.code == 402) {
    vm.$message.error('当前系统不在开放时间');
  } else {
    vm.$message.error('发生错误,请检查网络设置或联系技术人员');
  }
  reject(res);
};
Vue.prototype.post = function(url, params) {
  let vm = this;
  params['random'] = Math.floor(Math.random() * (100000 + 1));
  axios.defaults.headers.common['Authorization'] = store.state.accessToken;
  return new Promise(function(resolve, reject) {
    axios.post(url, params, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      transformRequest: [function(data) {
        return typeof data === 'object' && String(data) !== '[object File]' ? toFormData(data) : data;
      }]
    }).then(function(res) {
      vm.$http.success({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    }, function(res) {
      vm.$http.error({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    });
  });
};

Vue.prototype.postNo = function(url, params) {
  let vm = this;
  params['random'] = Math.floor(Math.random() * (100000 + 1));
  return new Promise(function(resolve, reject) {
    axios.post(url, params, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      transformRequest: [function(data) {
        return typeof data === 'object' && String(data) !== '[object File]' ? toFormData(data) : data;
      }]
    }).then(function(res) {
      vm.$http.success({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    }, function(res) {
      vm.$http.error({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    });
  });
};

Vue.prototype.get = function(url, params) {
  let vm = this;
  axios.defaults.headers.common['Authorization'] = store.state.accessToken;
  params['random'] = Math.floor(Math.random() * (100000 + 1));
  return new Promise(function(resolve, reject) {
    axios.get(url, { params: params }, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      transformRequest: [function(data) {
        return typeof data === 'object' && String(data) !== '[object File]' ? toFormData(data) : data;
      }]
    }).then(function(res) {
      vm.$http.success({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    }, function(res) {
      vm.$http.error({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    });
  });
};

Vue.prototype.postJson = function(url, params) {
  let vm = this;
  params['random'] = Math.floor(Math.random() * (100000 + 1));
  axios.defaults.headers.common['Authorization'] = store.state.accessToken;
  return new Promise(function(resolve, reject) {
    axios.post(url, params, {
      common: {
        Authorization: store.state.accessToken
      }
    }).then(function(res) {
      vm.$http.success({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    }, function(res) {
      vm.$http.error({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    });
  });
};

Vue.prototype.getJson = function(url, params) {
  let vm = this;
  params['random'] = Math.floor(Math.random() * (100000 + 1));
  axios.defaults.headers.common['Authorization'] = store.state.accessToken;
  return new Promise(function(resolve, reject) {
    axios.get(url, params, {
      'Authorization': store.state.accessToken,
      common: {
        'Authorization': store.state.accessToken
      }
    }).then(function(res) {
      vm.$http.success({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    }, function(res) {
      vm.$http.error({
        vm: vm,
        res: res,
        resolve: resolve,
        reject: reject
      });
    });
  });
};
