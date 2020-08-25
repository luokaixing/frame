<template>
  <el-row>
    <el-row class="com-head">
      <el-col :span="17" class="left">
        <h1>人员信息管理平台</h1>
      </el-col>
      <el-col :span="7" class="right">
        <el-link icon="el-icon-setting" @click="$router.push({name:'forget'})" :underline="false">修改密码</el-link>
        <el-link icon="el-icon-switch-button" @click="loginOut" :underline="false">注销</el-link>
        <el-link icon="el-icon-user-solid" :underline="false">张珊,你好!</el-link>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24" class="nav-header">
        <el-menu :default-active="active" router class="el-menu-header" mode="horizontal">
          <el-menu-item :key="item.id" :index="item.url" v-for="item in headList">
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row> -->
  </el-row>
</template>
<script>
export default {
  name: 'pageHeader',
  data() {
    return {
      loading: false
      // active: '/' + this.$route.path.split('/')[1],
      // headList: [{
      //   id: 1,
      //   url: '/peopleManage',
      //   name: '系统设置'
      // }, {
      //   id: 2,
      //   url: '/platformManage',
      //   name: '列表管理'
      // }]
    };
  },
  mounted() {},
  methods: {
    loginOut() {
      let vm = this;
      // vm.loading = true;
      vm.$router.push({ name: 'login' });
      // vm.post('/ummp/logout/', {}, function(res) {
      //   vm.loading = false;
      //   localStorage.removeItem('vuex');
      //   vm.$message({
      //     showClose: true,
      //     message: '退出系统成功!',
      //     type: 'success'
      //   });
      // }, function() {
      //   vm.loading = false;
      // });
    }
  }
};

</script>
<style lang="less" scoped>
.com-head{
  background: #3949a9;
  padding:0 15px;
}
h1 {
  float: left;
  font-size: 28px;
  color: #fff;
  line-height: 72px;
}

.right {
  a {
    color: #fff;
    font-size: 14px;
    float: right;
    display: inline-block;
    line-height: 72px;
    margin-left: 10px;

    &:hover {
      color: #fff;
    }
  }
}

</style>
