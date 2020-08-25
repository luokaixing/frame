import Vue from 'vue';
/**
 * sessionStorage操作
 * @type {Object}
 */
Vue.prototype.storage = {
  get(key) {
    return null || sessionStorage.getItem(key);
  },
  remove(key) {
    if (!key) return;
    window.sessionStorage.removeItem(key);
  },
  watch(key, callback) {
    window.addEventListener('storage', (e) => {
      callback(this.get(key));
    });
    window.addEventListener('setItem', (e) => {
      callback(this.get(key));
    });
  },
  set(key, newVal) {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function(k, val) {
        window.sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    };
    return storage.setItem(key, newVal);
  }
};
/**
 * 服务组
 * @return {[type]} [description]
 */
Vue.prototype.$service = function() {
  let defaults = {};
  var vm = this;
  defaults.upLogin = function() {
    let sTime = new Date().getTime();
    console.log(sTime);
    return new Promise(function(resolve, reject) {
      // 成功后回调函数
      var _success = function(result) {
        // if (window.history.length > 1) {
        //     UPCHAT.M.NAPI.closeWebView('');
        // }
        // 验证效验码
        let eTime = new Date().getTime();
        UPCHAT.M.NAPI.dismiss();
        if (result.status == '0') {
          // 调用校验码验证接口
          alert(1);
          alert(result.security);
          let time = eTime - sTime;
          vm.get('/uchat/checkSecurity', {
            'time': time,
            'code': result.security
          }, function(res) {
            alert(JSON.stringify(res));
            resolve(true);
          }, function(res) {
            alert(2);
          });
        }
      };
      // 失败后回调函数
      var _fail = function(fal) {
        UPCHAT.M.NAPI.dismiss();
        toApp();
      };
      // 获取效验码
      var getCheckCode = function() {
        UPCHAT.M.NAPI.showLoadingView();
        sTime = new Date().getTime();
        UPCHAT.M.NAPI.getSecurity(_success, _fail, { 'sysid': 'upchat_team' });
      };
      var toApp = function() {
        // remindMe
        // vm.$router.push('/remindMe');
      };
      if (UPCHAT.M.isNative()) {
        UPCHAT.M.init(getCheckCode);
      } else {
        toApp();
      }
    });
  };
  return defaults;
};
