<template>
  <el-row class="detail">
    <el-col :span="24">
      <h1 class="title"><span>基本信息</span></h1>
      <el-form :model="formData" ref="formData" label-width="150px" class="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业编号">
              <el-input v-model="formData.projNo" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业名称">
              <el-input v-model="formData.activityName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <label slot class="el-form-item-label">系统自动披露承<br />兑信息起始日期</label>
              <div class="el-form-item-content">
                <el-input v-model="formData.projNo" placeholder=""></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业社会信用代码">
              <el-input v-model="formData.projNo" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱">
              <el-input v-model="formData.activityName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <label slot class="el-form-item-label">系统自动披露承<br />兑信息停用日期</label>
              <div class="el-form-item-content">
                <el-input v-model="formData.projNo" placeholder=""></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="通讯地址及邮编">
              <el-input v-model="formData.projNo" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统自动披露内容">
              <el-input v-model="formData.activityName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <label slot class="el-form-item-label">系统自动披露承<br />清情况起始日期</label>
              <div class="el-form-item-content">
                <el-input v-model="formData.projNo" placeholder=""></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人">
              <el-input v-model="formData.projNo" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="传真">
              <el-input v-model="formData.activityName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <label slot class="el-form-item-label">系统自动披露承<br />清情况停用日期</label>
              <div class="el-form-item-content">
                <el-input v-model="formData.projNo" placeholder=""></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="承兑人机构类别">
              <el-input v-model="formData.projNo" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="formData.activityName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他联系方式">
              <el-input v-model="formData.projNo" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="承兑人名称">
              <el-input v-model="formData.projNo" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承兑人代码">
              <el-input v-model="formData.activityName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            &nbsp;
          </el-col>
        </el-row>
        <el-row class="submit-box">
          <el-col :span="24">
            <el-form-item label-width="0">
              <el-button type="primary">审核</el-button>
              <el-button type="primary">不通过</el-button>
              <el-button type="warning">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'listDetail',
  data() {
    return {
      formData: {},
      loading: false
    };
  },
  destroyed() {
    let vm = this;
    console.log(vm);
  },
  mounted() {
    var vm = this;
    console.log(vm);
  },
  methods: {}
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-form-item-label {
  width: 150px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  line-height: 19px;
  color: #000;
  padding: 0 15px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.el-form-item-content {
  margin-left: 150px;
  line-height: 40px;
  position: relative;
  font-size: 14px;
}

</style>
