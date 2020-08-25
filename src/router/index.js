import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routes = [{
  path: '/login',
  name: 'login',
  meta: {
    title: '登录页面',
    isLogin: false
  },
  component: resolve => require(['../web/login/login'], resolve)
}, {
  path: '/peopleManage',
  name: 'peopleManage',
  redirect: '/peopleManage/people/people',
  meta: {
    title: '系统设置页面',
    isLogin: true
  },
  component: resolve => require(['../web/peopleManage/peopleManage'], resolve),
  children: [{
    path: '/peopleManage/people/people',
    name: 'people',
    meta: {
      title: '系统设置页面',
      isLogin: true
    },
    component: resolve => require(['../web/peopleManage/people/people'], resolve)
  }]
}, {
  path: '/',
  name: 'home',
  redirect: '/platformManage/list/list',
  meta: {
    title: '列表展示',
    isLogin: true
  },
  component: resolve => require(['../web/platformManage/manage'], resolve),
  children: [{
    path: '/platformManage/list/list',
    name: 'list',
    meta: {
      title: '列表',
      isLogin: true
    },
    component: resolve => require(['../web/platformManage/list/list'], resolve)
  }, {
    path: '/platformManage/testDrag/drag',
    name: 'drag',
    meta: {
      title: 'echarts实例',
      isLogin: true
    },
    component: resolve => require(['../web/platformManage/testDrag/drag'], resolve)
  }, {
    path: '/platformManage/dragZoom/dragZoom',
    name: 'dragZoom',
    meta: {
      title: '拖拽实例',
      isLogin: true
    },
    component: resolve => require(['../web/platformManage/dragZoom/dragZoom'], resolve)
  }, {
    path: '/platformManage/list/listDetail/:type/:id',
    name: 'listDetail',
    meta: {
      title: '列表详情',
      isLogin: true
    },
    component: resolve => require(['../web/platformManage/list/listDetail'], resolve)
  }, {
    path: '/platformManage',
    name: 'platformManage',
    redirect: '/platformManage/list/list',
    meta: {
      title: '列表展示',
      isLogin: true
    },
    component: resolve => require(['../web/platformManage/manage'], resolve)
  }]
}, {
  path: '/404',
  name: '404',
  meta: {
    title: '404页面不存在',
    isLogin: false
  },
  component: resolve => require(['../web/404'], resolve)
}];
const router = new Router({
  // mode: 'history', // 暂时注释
  routes
});
/*
  重写路由解决 Navigating 问题
 */
// const routerPush = Router.prototype.push;
// const routerReplace = Router.prototype.replace;
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error);
// };
// Router.prototype.replace = function replace(location) {
//   return routerReplace.call(this, location).catch(error => error);
// };
router.beforeEach(function(to, from, next) {
  if (to.matched.length === 0) {
    // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    next('/404');
  } else {
    next();
  }
});
export default router;
