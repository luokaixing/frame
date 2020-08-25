<template>
  <div class="wrapper" v-loading="loading">
    <el-form :model="formData" label-width="190px" ref="formData">
      <el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark secTit">
              <span>项目基本信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="activityName" :rules="[{ required: true, message: '请输入项目名称', trigger: 'blur' }]">
              <el-input v-model="formData.activityName" :disabled="isDisable" placeholder="请输入项目名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="项目总金额：" prop="itemTotalBudget" label-width="130px" :rules="[{ validator: maxsix, trigger: 'blur'},{ required: true, message: '请输入项目总金额', trigger: 'blur' }]">
              <el-input v-model="formData.itemTotalBudget" :disabled="isDisable" placeholder="请输入项目总金额" clearable>
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="营销费：" prop="unionpayFundingMoney" :rules="[{ validator: maxsix, trigger: 'blur'},{ required: true, message: '请输入项目总金额营销费', trigger: 'blur' }]">
              <el-input placeholder="营销费" :disabled="isDisable" v-model="formData.unionpayFundingMoney" clearable>
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item label="服务费：" prop="feePayType" :rules="[{ required: true, message: '请选择：', trigger: 'change' }]" label-width="130px">
              <el-select v-model="formData.feePayType" :disabled="isDisable" placeholder="请选择" clearable>
                <el-option :value="1" label="一次性"></el-option>
                <el-option :value="2" label="按营销费比例"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" v-if="formData.feePayType == 1">
            <el-form-item label="金额：" prop="feeMoney" :rules="[{ validator: maxsix, trigger: 'blur'},{ required: true, message: '请输入金额', trigger: 'blur' }]" label-width="70px">
              <el-input placeholder="请输入金额" :disabled="isDisable" v-model="formData.feeMoney" clearable>
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" v-if="formData.feePayType == 2">
            <el-form-item label="比例：" prop="feeMoney" :rules="[{ required: true, message: '请输入比例', trigger: 'blur' }]" label-width="70px">
              <el-input placeholder="请输入比例" :disabled="isDisable" v-model="formData.feeMoney" clearable>
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="项目开始时间：" prop="startTime" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
              <el-date-picker type="date" :disabled="isDisable" :picker-options="pickerBeginDateBefore" v-model="formData.startTime" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="项目结束时间：" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]" prop="endTime" label-width="130px">
              <el-date-picker type="date" :disabled="isDisable" :picker-options="pickerBeginDateAfter" v-model="formData.endTime" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="申请单位全称：" :rules="[{ required: true, message: '请输入申请单位全称', trigger: 'blur' }]" prop="applicantCompany">
              <el-input placeholder="申请单位全称" :disabled="isDisable" v-model="formData.applicantCompany" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="联系人：" prop="contact" :rules="[{ required: true, message: '请输入联系人', trigger: 'blur' }]" label-width="130px">
              <el-input v-model="formData.contact" :disabled="isDisable" placeholder="请输入联系人" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="联系电话：" prop="contactPhone" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' },{validator: this.checkMyPhone, trigger:'blur'}]">
              <el-input placeholder="联系电话" :disabled="isDisable" v-model="formData.contactPhone" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="邮箱：" prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{ validator: this.checkEmail, trigger: 'blur' }]" label-width="130px">
              <el-input v-model="formData.email" :disabled="isDisable" placeholder="请输入邮箱" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark secTit">
              <span>预授权码申请信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="配置类型：" label-width="190px" prop="activityType" :rules="[{ required: true, message: '请选择配置类型', trigger: 'blur' }]">
            <el-col :span="7">
              <el-form-item :rules="[{ required: true, message: '请选择配置类型', trigger: 'blur' }]">
                <el-select :disabled="isDisable" @change="getSelectDataSec" v-model="formData.activityType" placeholder="请选择获取类型">
                  <el-option v-for="item in select_option.activityType" :key="item.id" :label="item.value" :value="Number(item.id)"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1" v-if="formData.activityType">
              <el-form-item :rules="[{ required: true, message: '请选择活动形式', trigger: 'blur' }]">
                <el-select :disabled="isDisable" v-model="formData.activityChildType" @change="getSelectDataThi" placeholder="请选择">
                  <el-option v-for="item in select_option.activityChildType" :key="item.id" :label="item.itemValue" :value="Number(item.id)"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1" v-if="formData.activityChildType">
              <el-form-item :rules="[{ required: true, message: '请选择配置平台', trigger: 'blur' }]">
                <el-select :disabled="isDisable" v-model="formData.activityPlatf" placeholder="请选择">
                  <el-option v-for="(val,key,index) in select_option.activityPlatf" :key="index" :label="val.value" :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row class="allFiles">
          <el-col :span="11" v-if="$route.params.type == 'add'">
            <el-form-item label="附件：" :rules="[{required: true, message: '请上传附件'}]">
              <el-upload @click.native="fileClick('604')" :disabled="isDisable" class="upload-demo" action="/ummp/process/sponsor/uploadFile2" :file-list="formData.files" :data="{cateId:604}" :on-remove="(file,fileList)=>handleRemove(file,fileList,604)" :on-error="handleError" :before-remove="beforeRemove" :on-preview="handlePreview" multiple :on-success="(res,file)=>handleAvatarSuccess(res,file,604)" accept="image/*,video/*,.xlsx,.png,.jpg,.gif,.bmp,.zip,.rar,.doc,.docx,.xlsx,.xlsm,.xls,.pdf,.txt,.csv,.ppt,.pptx,.avi,.mov,.VOB,.mp4,.wmv,.ASF,.ra,.rm,.rmvb,.mpeg,.mpg,.qt,.ram">
                <el-button size="small" type="primary" :disabled="isDisable" @click="fileClick('604')">上传项目协议等相关文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11" v-if="$route.params.type != 'add'">
            <el-form-item label="附件：" :rules="[{required: true, message: '请上传附件'}]">
              <el-upload disabled class="upload-demo" action="" :file-list="formData.yuQaunFile" :on-preview="handlePreview" multiple>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" v-if="$route.params.type != 'add'">
            <el-form-item label="预授权码：" prop="authCode" label-width="130px" :rules="[{ required: true, message: '请输入预授权码', trigger: 'blur' }]">
              <el-input v-model="formData.authCode" disabled placeholder="请输入预授权码" clearable></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="11" :offset="1" v-if="$route.params.type == 'confirm'">
            <el-form-item label="预授权码：" prop="authCode" label-width="130px" :rules="[{ required: true, message: '请输入预授权码', trigger: 'blur' }]">
              <el-input v-model="submitForm.authCode" :disabled="isDisable" placeholder="请输入预授权码" clearable></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row v-if="($route.params.type == 'look') || ($route.params.type == 'confirm')">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark secTit">
              <span>资金到账信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="$route.params.type == 'look'  || $route.params.type == 'confirm'" class="table-padding">
          <el-table :data="tableData2" border style="width: 100%;">
            <el-table-column prop="dealTime" align="center" label="到账时间"></el-table-column>
            <el-table-column prop="toAccountMoney" align="center" label="到账金额（万元）"></el-table-column>
            <el-table-column prop="payerName" align="center" label="打款方全称"></el-table-column>
            <el-table-column prop="fileId" align="center" label="到账凭证"></el-table-column>
          </el-table>
        </el-row>
        <el-row class="allFiles" style="margin-top:20px" v-if="$route.params.type == 'confirm'">
          <el-col :span="11">
            <el-form-item label="附件：">
              <el-upload :on-change="handleFileChangeS2" :data="{'cateId':1006}" class="upload-demo" action="/ummp/process/sponsor/uploadFile2" :on-remove="handleFileRemoveS2" :limit="3" :file-list="fileList2" multiple :on-success="handleSuccess" accept="image/*,video/*,.xlsx,.png,.jpg,.gif,.bmp,.zip,.rar,.doc,.docx,.xlsx,.xlsm,.xls,.pdf,.txt,.csv,.ppt,.pptx,.avi,.mov,.VOB,.mp4,.wmv,.ASF,.ra,.rm,.rmvb,.mpeg,.mpg,.qt,.ram">
                <el-button size="small" type="primary">上传资金到账凭证</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form :model="submitForm" label-width="190px" ref="submitForm">
          <el-row v-if="$route.params.type == 'confirm'">
            <el-col :span="11">
              <el-form-item label="合作方全称:" prop="payerName" :rules="[{ required: true, message: '请输入合作方全称', trigger: 'blur' }]">
                <el-input v-model="submitForm.payerName" placeholder="请输入合作方全称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="到账金额：" prop="toAccountMoney" label-width="130px" :rules="[{ validator: maxsix, trigger: 'blur'},{ required: true, message: '请输入到账金额', trigger: 'blur' }]">
                <el-input v-model="submitForm.toAccountMoney" placeholder="请输入到账金额" clearable>
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <el-row v-if="$route.params.type == 'confirm'">
          <el-col :span="11">
            <el-form-item label="是否通过" prop="isPass" :rules="[{ required: true, message: '请选择是否通过', trigger: 'blur' }]">
              <el-radio-group v-model="formData.isPass">
                <el-radio label="1">通过</el-radio>
                <el-radio label="0">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="处理意见：" prop="suggestion" label-width="130px" :rules="[{required: true, message: '请输入处理意见', trigger: 'blur'}]">
              <el-input type="textarea" :rows="3" v-model="formData.suggestion" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row v-if="$route.params.type == 'look'">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark secTit">
              <span>审核信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="$route.params.type == 'look'" class="table-padding">
          <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="activityName" align="center" label="审核时间"></el-table-column>
            <el-table-column prop="sponsor" align="center" label="审核结果"></el-table-column>
            <el-table-column prop="sponsorUnit" align="center" label="审核意见"></el-table-column>
          </el-table>
        </el-row>
        <el-row class="bottom-btn">
          <el-button type="primary" class="normal-btn" v-if="$route.params.type != 'look'" @click="handleApply">提交</el-button>
          <el-button type="primary" class="normal-btn" v-if="$route.params.type == 'look'" @click="$router.go(-1)">关闭</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'applyOutDetail',
  components: {},
  props: {},
  data() {
    return {
      formData: {
        files: [],
        yuQaunFile: [],
        ziJinFile: []
      },
      loading: false,
      tableData: [],
      fileList2: [],
      // isDisable: (this.$route.params.type == 'look' || this.$route.params.type == 'edit' || this.$route.params.type == 'confirm'),
      tableData2: [],
      myFile1: [],
      files: [],
      fileType: '',
      localToken: '',
      submitForm: {
        activityType: '',
        authCode: ''
      },
      select_option: {
        activityPlatf: {},
        activityChildType: {},
        activityType: {}
      },
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = new Date(this.formData.endTime).getTime();
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = new Date(this.formData.startTime).getTime();
          if (beginDateVal) {
            return time.getTime() < beginDateVal - 24 * 60 * 60 * 1000;
          }
        }
      }
    };
  },
  watch: {},
  computed: {
    isDisable() {
      return ((this.$route.params.type == 'look' || this.$route.params.type == 'edit' || this.$route.params.type == 'confirm') && (this.formData.authCodeApplyStatus != 1004));
    }
  },
  mounted() {
    let vm = this;
    vm.localToken = vm.$store.state.userInfo.token;
    vm.init();
  },
  methods: {
    init() {
      let vm = this;
      if (vm.$route.params.type != 'add') {
        vm.getDetail();
      }
      if (vm.$route.params.type == 'add') {
        vm.getSelectData();
      }
    },
    getDetail() {
      let vm = this;
      vm.loading = true;
      vm.get('/ummp/umWebMoney/selectWebMoneyInfoById', {id: vm.$route.params.id, token: vm.localToken}).then(function(res) {
        vm.loading = false;
        vm.formData = res.data;
        vm.tableData = res.data.suggestions;
        vm.tableData2.push({
          dealTime: res.data.dealTime,
          toAccountMoney: res.data.toAccountMoney,
          payerName: res.data.payerName,
          fileId: res.data.fileId
        });
        if (vm.$route.params.type != 'add') {
          vm.get('/ummp/pulldown/getOneSelect', {token: vm.localToken}).then(function(res) {
            vm.select_option.activityType = res.data.dsActivityType;
            let id = vm.formData.activityType;
            vm.get('ummp/pulldown/getTwoSelect', {id: id, token: vm.localToken}).then(function(res) {
              vm.select_option.activityChildType = res.data;
              let myId = vm.formData.activityChildType;
              vm.get('ummp/pulldown/getSelectIndexMap', {id: myId, token: vm.localToken}).then(function(res) {
                for (let key in res.data) {
                  if (res.data[key].index == 1) {
                    vm.formData.activityPlatf = key;
                  }
                }
                vm.select_option.activityPlatf = res.data;
              }, function() {
              });
            }, function() {
            });
          }, function() {
          });
        }
      }, function() {
        vm.loading = false;
      });
    },
    // 获取三联下拉框数据
    getSelectData() {
      let vm = this;
      vm.get('/ummp/pulldown/getOneSelect', {token: vm.localToken}).then(function(res) {
        vm.select_option.activityType = res.data.dsActivityType;
        vm.$forceUpdate();
      }, function() {
      });
    },
    getSelectDataSec() {
      let vm = this;
      let id = vm.formData.activityType;
      vm.get('ummp/pulldown/getTwoSelect', {id: id, token: vm.localToken}).then(function(res) {
        vm.select_option.activityChildType = res.data;
        if (vm.$route.params.type == 'add' && vm.formData.activityChildType && vm.formData.activityPlatf) {
          vm.formData.activityChildType = '';
          vm.formData.activityPlatf = '';
        }
        vm.$forceUpdate();
      }, function() {
      });
    },
    getSelectDataThi() {
      let vm = this;
      let id = vm.formData.activityChildType;
      vm.get('ummp/pulldown/getSelectIndexMap', {id: id, token: vm.localToken}).then(function(res) {
        for (let key in res.data) {
          if (res.data[key].index == 1) {
            vm.formData.activityPlatf = key;
          }
        }
        vm.select_option.activityPlatf = res.data;
      }, function() {
      });
    },
    // 附件上传
    handleFileRemoveS2(file, fileList) {
      let vm = this;
      vm.fileList2 = fileList;
      vm.get('/ummp/file/deleteFile', {fileId: file.uid, token: vm.localToken}).then(function(res) {
      });
    },
    handleFileChangeS2(file, fileList) {
      // this.fileList2 = fileList;
    },
    handleSuccess(response, file, fileList) {
      this.formData.ziJinFile.push(response.data);
    },
    handlePreview(file) {
      if (file.response != undefined) {
        window.open(
          '/ummp/process/sponsor/downLoadFile?id=' + file.response.data.id
        );
      } else {
        window.open('/ummp/process/sponsor/downLoadFile?id=' + file.id);
      }
    },
    fileClick(item) {
      let vm = this;
      vm.files = item;
    },
    handleRemove(file, fileList, fileType) {
      let vm = this;
      vm.fileType.forEach((item, index) => {
        if (item == fileType) {
          vm.fileType.splice(index, 1);
        }
      });
      let id = file.id;
      if (file.response != undefined) {
        id = file.response.data.id;
      }
      var index = vm.formData[vm.files].indexOf(id);
      if (index > -1) {
        vm.formData[vm.files].splice(index, 1);
      }
    },
    handleError(err, file, fileList) {
      if (err.message.indexOf('用户未登录') != -1) {
        this.$message.error('用户未登录，上传失败！');
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm('确定移除?');
    },
    handleAvatarSuccess(res, file, fileType) {
      let vm = this;
      // vm.fileType.push(fileType);
      if (res.code == 200) {
        vm.formData.yuQaunFile.push(res.data);
      } else {
        vm.$message.error(res.message);
      }
    },
    handleApply() {
      let vm = this;
      let params = {
        ...vm.formData
      };
      let params2 = {
        id: vm.$route.params.id,
        payerName: vm.submitForm.payerName,
        // files: vm.formData.ziJinFile,
        toAccountMoney: vm.submitForm.toAccountMoney,
        moneyFiles: vm.formData.ziJinFile
      };
      // let params3 = {
      //   id: vm.$route.params.id,
      //   isPass: vm.formData.isPass,
      //   suggestion: vm.formData.suggestion,
      //   authCode: vm.submitForm.authCode
      // };
      let params4 = {
        ...vm.formData,
        id: vm.$route.params.id
      };
      this.$refs['formData'].validate(valid => {
        if (valid) {
          if (vm.$route.params.type == 'add' || vm.$route.params.type == 'edit') {
            let total = Number(vm.formData.unionpayFundingMoney);
            if (vm.formData.feePayType == '1') {
              total += Number(vm.formData.feeMoney);
            }
            if (total > vm.formData.itemTotalBudget) {
              vm.$message({
                type: 'error',
                message: '营销费和服务费总和必须小于项目总金额！'
              });
              return false;
            }
          }
          vm.loading = true;
          if (vm.$route.params.type == 'edit') {
            vm.postJson(`ummp/proinfo/umWebProinfo/insertProInfo?token=${vm.localToken}`, params4).then(function(res) {
              vm.loading = false;
              vm.$message({
                type: 'success',
                message: '操作成功！'
              });
              vm.$router.go(-1);
            }, function() {
              vm.loading = false;
            });
          }
          if (vm.$route.params.type == 'add') {
            if (!vm.formData.yuQaunFile || !vm.formData.yuQaunFile.length) {
              vm.$message({
                type: 'error',
                message: '请上传附件！'
              });
              vm.loading = false;
              return false;
            }
            vm.postJson(`ummp/proinfo/umWebProinfo/insertProInfo?token=${vm.localToken}`, params).then(function(res) {
              vm.loading = false;
              vm.$message({
                type: 'success',
                message: '操作成功！'
              });
              vm.$router.go(-1);
            }, function() {
              vm.loading = false;
            });
          }
          if (vm.$route.params.type == 'confirm') {
            if (!vm.formData.ziJinFile || !vm.formData.ziJinFile.length) {
              vm.$message({
                type: 'error',
                message: '请上传资金到账凭证！'
              });
              vm.loading = false;
              return false;
            }
            vm.postJson(`ummp/umWebMoney/sumbitWebCapitalAccountInfo?token=${vm.localToken}`, params2).then(function(res) {
              vm.loading = false;
              vm.$message({
                type: 'success',
                message: '操作成功！'
              });
              vm.$router.go(-1);
            }, function() {
              vm.loading = false;
            });
            // vm.post(`ummp/proinfo/umWebProinfo/auditAuthCode?token=${vm.localToken}`, params3).then(function(res) {
            //   vm.loading = false;
            // }, function() {
            //   vm.loading = false;
            // });
          }
        } else {
          vm.errorValidate('formData');
        }
      });
    },
    // 手机格式验证
    checkMyPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        var zz = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (!zz.test(value)) {
          return callback(new Error('输入的手机号格式错误！'));
        } else {
          callback();
        }
      }
    },
    checkEmail(rule, value, callback) {
      const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        if (!mailReg.test(value)) {
          return callback(new Error('输入的邮箱格式错误！'));
        } else {
          callback();
        }
      }
    }
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
.wrapper{
  .secTit {
    height: 40px;
    margin-left: 30px;
    margin-bottom: 25px;
    border-bottom: 1px solid #e6e6e6;
    span {
      font-size: 18px;
      padding-left: 5px;
      padding-right: 5px;
      border-bottom: 2px solid #4498ff;
      float: left;
      width: auto;
      height: 40px;
      line-height: 40px;
    }
    font {
      line-height: 42px;
      font-size: 14px;
    }
  }
  .bottom-btn{
    padding:30px 0;
    text-align:center;
  }
  .normal-btn{
    width:150px;
  }
  .table-padding{
    padding:0 30px;
  }
}
</style>