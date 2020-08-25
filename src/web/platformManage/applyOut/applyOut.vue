<template>
  <el-row class="wrapper search-box">
    <el-form :model="formData" label-width="85px" label-position="right" ref="formData">
      <el-row>
        <el-col :span="24" class="toptitle">
          预授权码申请
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请时间：">
            <el-date-picker v-model="formData.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="btn-right">
          <el-form-item>
            <el-button type="primary" @click="initData(1)" class="btnFilter iconfont icon-shaixuanguolv">检索</el-button>
            <el-button type="primary" @click="$router.push({name: 'applyOutDetail', params: {
              type: 'add',
              id: 0
            }})">预授权码申请</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row v-loading="loading">
      <el-col :span="24" class="table">
        <el-table :data="tableData" border style="width: 100%" height="280px">
          <el-table-column prop="activityName" align="center" label="项目名称" :min-width="200"></el-table-column>
          <el-table-column prop="startTime" align="center" :formatter="formatterDate" label="开始时间" :min-width="100"></el-table-column>
          <el-table-column prop="endTime" align="center" :formatter="formatterDate" label="结束时间" :min-width="100"></el-table-column>
          <el-table-column prop="itemTotalBudget" align="center" label="金额（万元）" :min-width="120"></el-table-column>
          <el-table-column prop="applicantCompany" align="center" label="申请单位全称" :min-width="200"></el-table-column>
          <el-table-column prop="createdTime" :formatter="formatterDate" align="center" label="申请时间" :min-width="200"></el-table-column>
          <el-table-column prop="authCodeApplyStatus" align="center" label="状态" :min-width="180">
            <template slot-scope="scope">
              <div>{{selectMap.authCodeStatus[scope.row.authCodeApplyStatus]}}</div>
            </template>
          </el-table-column>
          <el-table-column :key="Math.random()" fixed="right" align="center" label="操作" :min-width="180">
            <template slot-scope="scope">
              <a href="javascript:;" @click="$router.push({name: 'applyOutDetail', params: {
                type: 'confirm',
                id: scope.row.id
                }})" class="btnHandle" v-if="[1003].indexOf(scope.row.authCodeApplyStatus) != -1">资金到账确认申请
              </a>
              <a href="javascript:;" v-if="[1011,1019,1001,1013,1017].indexOf(scope.row.authCodeApplyStatus) != -1" @click="$router.push({name: 'applyOutDetail', params: {
                type: 'look',
                id: scope.row.id
                }})" class="btnHandle">查看
              </a>
              <a href="javascript:;" v-if="[1004,1012,1018].indexOf(scope.row.authCodeApplyStatus) != -1" @click="$router.push({name: 'applyOutDetail', params: {
                type: 'edit',
                id: scope.row.id
                }})" class="btnHandle">修改
              </a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :total="total"></el-pagination>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'applyOut',
  components: {},
  props: {},
  data() {
    return {
      formData: {},
      tableData: [],
      localToken: '',
      currentPage: 1,
      total: 0,
      loading: false,
      selectMap: {
        moneyStatus: {}
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations([
      'setUserInfo'
    ]),
    init() {
      let vm = this;
      // vm.getToken();
      vm.getSelectMap();
      vm.initData(1);
    },
    // getToken() {
    //   let vm = this;
    //   vm.post('/ummp/token/getSign', {}).then(function(res) {
    //     if (res.sign && res.time) {
    //       vm.post('/ummp/token/getSign', {}).then(function(res) {
    //       }, function() {});
    //     }
    //   }, function() {});
    // },
    getSelectMap() {
      let vm = this;
      vm.get('/ummp/umDsFormCollectionInfo/selectMap', {}).then(function(res) {
        vm.selectMap = res.data;
      }, function() {});
    },
    formatterDate(row, column) {
      return this.formatDate(row[column.property], 'yyyy-MM-dd');
    },
    initData(page) {
      let vm = this;
      if (vm.formData.time != undefined) {
        vm.formData.beginDate = vm.formData.time[0];
        vm.formData.endDate = vm.formData.time[1];
      } else {
        vm.formData.beginDate = '';
        vm.formData.endDate = '';
      }
      // vm.$delete(vm.formData, 'time');
      let params = vm.extend({
        page: page || 1,
        limit: 10,
        token: vm.localToken
      }, vm.formData);
      vm.loading = true;
      vm.get('/ummp/proinfo/umWebProinfo/findAll', params).then(function(res) {
        vm.loading = false;
        // if (res.code === 1000) {
        //   vm.$message({
        //     type: 'error',
        //     message: '用户信息过期，请重新登录！'
        //   });
        //   vm.$router.push({name: '404'});
        // }
        vm.currentPage = page;
        vm.tableData = res.data;
        vm.total = Number(res.count);
      }, function() {
        vm.loading = false;
      });
    },
    handleCurrentChange(val) {
      let vm = this;
      // vm.currentPage = val;
      vm.initData(val);
    }
  },
  created() {},
  mounted() {
    let vm = this;
    vm.localToken = vm.$route.params.token;
    vm.setUserInfo({
      token: vm.localToken
    });
    console.log(vm.$store.state.userInfo);
    vm.init();
  }
};
</script>
<style lang="less" scoped>
  .wrapper{
    padding:30px;
    .toptitle {
      margin-bottom: 10px;
      line-height: 40px;
      font-size: 24px;
      font-weight:600;
    }
    .btnFilter {
      background: #ff5722 !important;
      border: 1px solid #ff5722 !important;
      &:hover,
      &:focus {
        background: #ff5722 !important;
        border: 1px solid #ff5722 !important;
        opacity: 0.7;
      }
    }
    .btnHandle {
      border-radius: 5px;
    }
    .btnHandle {
      padding: 3px 5px;
      border: 1px solid #039686 !important;
      background: #039686 !important;
      font-size: 12px;
      color: #fff;
      &:hover {
        border: 1px solid #03d2bb !important;
        background: #03d2bb !important;
        color: #fff;
      }
    }
  }
</style>