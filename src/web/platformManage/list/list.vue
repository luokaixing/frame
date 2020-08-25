<template>
  <el-row class="container">
    <el-row class="search-box">
      <el-form :model="formData" hide-required-asterisk ref="formData" label-width="80px">
        <el-col :span="24">
          <el-col :span="6">
            <el-form-item label="用户" prop="user" :rules="{ required: true, message: '请输入用户', trigger: 'blur' }">
              <el-input v-model="formData.user" placeholder="请输入用户"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门">
              <el-input v-model="formData.department" placeholder="请输入部门"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="起止日期">
              <el-date-picker v-model="formData.date" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" class="btn-left">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="onSubmit('formData')">查询</el-button>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="6">
            <el-form-item label="牵头单位">
              <el-input v-model="formData.leadUnitName" @keyup.enter.native="filter('formData')" placeholder="请输入牵头单位" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品">
              <el-select v-model="formData.product" placeholder="请选择产品" clearable>
                <el-option :label="val" :value="key" v-for="(val, key, index) in selectMap.product" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目类别">
              <el-select v-model="formData.projType" placeholder="请选择项目类别" clearable>
                <el-option :label="val" :value="key" v-for="(val, key, index) in selectMap.projType" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目细项">
              <el-select v-model="formData.projItem" placeholder="请选择项目细项" clearable>
                <el-option :label="val" :value="key" v-for="(val, key, index) in selectMap.projItem" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-divider class="divider">中国票据交易系统</el-divider>
            <el-col :span="12">
              <el-form-item label="银票" prop="acceptTime" :rules="{ required: true, message: '*参数数值可设置>=0的任意整数', trigger: 'blur' }">
                <el-input v-model="formData.input1" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商票" prop="name" :rules="{ required: true, message: '*参数数值可设置>=0的任意整数', trigger: 'blur' }">
                <el-input v-model="formData.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-divider class="divider">ECDS</el-divider>
            <el-col :span="12">
              <el-form-item label="银票" prop="acceptTime" :rules="{ required: true, message: '*参数数值可设置>=0的任意整数', trigger: 'blur' }">
                <el-input v-model="formData.input1" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商票" prop="name" :rules="{ required: true, message: '*参数数值可设置>=0的任意整数', trigger: 'blur' }">
                <el-input v-model="formData.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="btn">
            <el-button type="primary">修改</el-button>
            <el-button type="primary">复合</el-button>
            <el-button type="primary">返回</el-button>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="6">
            <el-form-item label="牵头单位">
              <el-input v-model="formData.leadUnitName" @keyup.enter.native="filter('formData')" placeholder="请输入牵头单位" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品">
              <el-select v-model="formData.product" placeholder="请选择产品" clearable>
                <el-option :label="val" :value="key" v-for="(val, key, index) in selectMap.product" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目类别">
              <el-select v-model="formData.projType" placeholder="请选择项目类别" clearable>
                <el-option :label="val" :value="key" v-for="(val, key, index) in selectMap.projType" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class='btn-left'>
            <el-form-item label-width="10px" label="" prop="">
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
    </el-row>
    <el-col :span="24" class="table" v-height>
      <el-table :data="tableData" border v-if="loading" :height="tableHeight">
        <el-table-column fixed prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="用户">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click.native="$router.push({name:'listDetail'});" icon="el-icon-edit" v-text="scope.row.name"></el-link>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="dispose" label="配置控制">
          <el-select v-model="disposeValue" placeholder="请选择">
            <el-option v-for="item in disposeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <el-select v-model="disposeValue" placeholder="请选择">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">重置密码</el-button>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <el-pagination background layout="prev, pager, next,jumper" :current-page="page.current" :total="page.total"></el-pagination>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'accountInfo',
  data() {
    return {
      loading: false,
      formData: {
        user: '',
        department: ''
      },
      formData2: {},
      selectMap: {},
      disposeValue: '',
      page: {
        total: 100,
        current: 1
      },
      disposeOptions: [{
        value: '选项1',
        label: '票据查询'
      }, {
        value: '选项2',
        label: '业务查询',
        disabled: true
      }, {
        value: '选项3',
        label: '日志查询'
      }],
      roleOptions: [{
        value: '选项1',
        label: '管理员'
      }, {
        value: '选项2',
        label: '普通用户',
        disabled: true
      }, {
        value: '选项3',
        label: '审核员'
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        department: '人事',
        dispose: '日志查询',
        role: '普通用户'
      }]
    };
  },
  watch: {
    // tableHeight() {
    //   console.log(2);
    //   let vm = this;
    //   setTimeout(() => {
    //     console.log(vm.tableHeight);
    //     vm.loading = true;
    //   }, 2000);
    // }
  },
  computed: {
    tableHeight() {
      return this.$store.state.tools.tableHeight;
    }
  },
  mounted() {
    let vm = this;
    vm.loading = true;
    vm.init();
  },
  methods: {
    init() {},
    onSubmit(formName) {
      let vm = this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          vm.loading = true;
          vm.post('/aa', vm.formData, function(res) {
            vm.loading = false;
          }, function() {
            vm.loading = false;
          });
        } else {
          vm.errorValidate();
          return false;
        }
      });
    },
    initList(page) {
      let vm = this;
      let params = vm.extend({
        page: page,
        limit: 10
      }, { key: vm.search });
      vm.loading = true;
      vm.post('', params, function(res) {
        vm.loading = false;
        vm.currentPage = page;
        vm.tableData = res.data;
        vm.selectMap = res.selectMap;
        vm.total = Number(res.count);
      }, function() {
        vm.loading = false;
      });
    }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
