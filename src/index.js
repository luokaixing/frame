import pageHeader from './web/header/header';
const util = {
  install: function (Vue) {
    Vue.component('pageHeader', pageHeader);
  }
};
export default util;