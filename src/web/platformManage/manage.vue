<template>
  <el-container>
    <el-header height="72px" class="header">
      <page-header></page-header>
    </el-header>
    <el-container>
      <el-aside width="250px" style="min-height:660px" props="header">
        <el-menu :default-active="$store.state.treeState" router background-color="#d9dce7">
          <template v-for="(item,index) in treeData">
            <el-submenu :index="item.router" v-if="item.childResource.length>0" :key="index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span v-text="item.resName"></span>
              </template>
              <template v-for="(child,indx) in item.childResource">
                <el-menu-item :index="child.router" v-if="child.childResource.length==0" :key="indx">
                  <template slot="title">
                    {{child.resName}}
                  </template>
                </el-menu-item>
                <el-submenu :index="child.router" v-if="child.childResource.length>0" :key="child.resName">
                  <template slot="title">
                    {{child.resName}}
                  </template>
                  <el-menu-item :index="child.router" v-for="(child,idx) in child.childResource" :key="idx">
                    {{child.resName}}
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-submenu>
            <el-menu-item :index="item.router" v-if="item.childResource.length==0" :key="index">
              <i :class="item.icon"></i>
              <span slot="title" v-text="item.resName"></span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main :class="$route.meta.class">
        <router-view v-wechat-title="$route.meta.title"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'platformManage',
  data() {
    return {
      treeData: [{
        'icon': 'el-icon-tickets',
        'resName': '列表',
        'router': '/platformManage',
        'childResource': [
          {
            'icon': 'el-icon-tickets',
            'resName': '列表页',
            'router': '/platformManage/list/list',
            'childResource': []
          }, {
            'icon': 'el-icon-tickets',
            'resName': 'echarts实例',
            'router': '/platformManage/testDrag/drag',
            'childResource': []
          }, {
            'icon': 'el-icon-tickets',
            'resName': '拖拽实例',
            'router': '/platformManage/dragZoom/dragZoom',
            'childResource': []
          }
        ]
      }],
      loadingshow: false
    };
  },
  destroyed() {},
  mounted() {
    let vm = this;
    // let paths = vm.$route.path.split('/');
    // if (paths.length > 3) {
    //   paths.pop();
    //   paths.pop();
    // }
    // vm.$store.commit('setTreeState', paths.join('/'));
    vm.$store.commit('setTreeState', vm.$route.path);
  },
  methods: {}
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-aside {
  background: #bcbfcc;
}

.el-submenu {
  position: relative;

  &:before {
    border-bottom: 1px solid #f2f2f2;
    content: ' ';
    display: block;
    width: 100%;
    position: absolute;
    top: 56px;
    z-index: 9;
  }
}

.el-menu-item {
  border-bottom: 1px solid #f2f2f2;
  color: #333;

  &.is-active {
    color: #409EFF;
  }
}

.el-main {
  padding: 0;
  margin: 15px;
  background: #fff;
}

</style>
