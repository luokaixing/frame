import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex);
const state = {
  userInfo: {
    token: ''
  },
  treeState: '',
  menuTree: [],
  platformManage: [],
  peopleManage: [],
  tools: {
    tableHeight: 300
  },
  cache: {}
};
const mutations = {
  setUserInfo(state, info) {
    state.userInfo = info;
  },
  setTreeState(state, info) {
    state.treeState = info;
  },
  setMenuTree(state, info) {
    state.menuTree = info;
  },
  setplatformManage(state, info) {
    var platformManage;
    for (var i = 0; i < info.length; i++) {
      if (info[i].url == '/platformManage') {
        platformManage = info[i].children;
      }
    }
    state.platformManage = platformManage;
  },
  setpeopleManage(state, info) {
    var peopleManage;
    for (var i = 0; i < info.length; i++) {
      if (info[i].url == '/peopleManage') {
        peopleManage = info[i].children;
      }
    }
    state.peopleManage = peopleManage;
  },
  setTools(state, info) {
    state.tools = info;
  },
  setCache(state, info) {
    state.cache = info;
  }
};
const actions = {
  setUserInfo({ commit }, info) {
    commit('setUserInfo', info);
  },
  setTreeState({ commit }, info) {
    commit('setTreeState', info);
    // commit('setTreeState', '');
    // setTimeout(() => {
    //   commit('setTreeState', info);
    // }, 600);
  },
  platformManage({ commit }, info) {
    commit('setplatformManage', info);
  },
  setpeopleManage({ commit }, info) {
    commit('setpeopleManage', info);
  },
  setMenuTree({ commit }, info) {
    commit('setMenuTree', info);
  },
  setTools({ commit }, info) {
    commit('setTools', info);
  },
  setCache({ commit }, info) {
    commit('setCache', info);
  }
};
const getters = {
  getUserInfo(state) {
    return state.userInfo;
  },
  getTreeState(state) {
    return state.treeState;
  },
  getMenuTree(state) {
    return state.menuTree;
  },
  getTools(state) {
    return state.tools;
  },
  getCache(state) {
    return state.cache;
  }
};
const vuexLocal = new VuexPersistence({
  key: 'test',
  storage: window.localStorage,
  reducer: (state) => ({
    userInfo: state.userInfo
  }),
  filter: (mutation) => (
    mutation.type === 'setUserInfo'
  )
});
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin]
});
