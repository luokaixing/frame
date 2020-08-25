<!-- login -->
<template>
  <el-row class="login-wrapper">
    <el-row class="login-content">
      <h1>中国股票交易所管理平台</h1>
      <el-row class="login">
        <el-col :span="24">
          <el-form :model="formData" status-icon ref="formData">
            <el-form-item
              prop="user"
              :rules="{ required: true, message: '请输入用户名', trigger: 'blur' }"
            >
              <el-input
                class="login-input"
                type="text"
                placeholder="请输入用户名"
                v-model="formData.user"
                autocomplete="off"
              >
                <template slot="prepend">
                  <i class="el-icon-user"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                class="login-input"
                :type="passwordType"
                placeholder="请输入密码"
                @keyup.enter.native="submitForm('formData')"
                v-model="formData.pass"
                autocomplete="off"
              >
                <template slot="prepend">
                  <i class="el-icon-unlock"></i>
                </template>
                <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }, { required: true, validator: this.isRight, trigger: 'blur' }]"
            >
              <el-row :span="24">
                <el-col :span="12">
                  <el-input
                    class="login-code"
                    v-model="formData.code"
                    auto-complete="off"
                    placeholder="请输入验证码"
                    size
                    @keyup.enter.native="submitForm('formData')"
                  >
                    <template slot="prepend">
                      <i class="el-icon-unlock"></i>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <div class="login-code" @click="refreshCode">
                    <!--验证码组件-->
                    <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button type="primary" class="submitBtn" @click="submitForm('formData')">登录</el-button>
              <el-button class="resetBtn" @click="resetForm('formData')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
import SIdentify from './sIdentify';
export default {
  data() {
    return {
      formData: {
        pass: '',
        user: '',
        code: ''
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      isDebugLogin: false,
      passwordType: 'password'
    };
  },
  components: {
    SIdentify
  },
  watch: {
    isDebugLogin(v) {
      if (v) {
        this.formData.password = '123';
        this.refreshCode();
      }
    },
    identifyCode(v) {
      this.isDebugLogin && (this.loginForm.code = v);
    }
  },
  methods: {
    isRight(rule, value, callback) {
      if (this.identifyCode !== value) {
        this.formData.code = '';
        this.refreshCode();
        callback(new Error('请输入正确的验证码'));
      } else {
        callback();
      }
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '');
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.$router.push({ name: 'list' });
        } else {
          this.errorValidate();
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.refreshCode();
  }
};
</script>
<style lang="less">
.login-input .el-input__inner {
  height: 50px;
  width: 400px;
}
.login-code .el-input__inner {
  height: 50px;
  width: 200px;
}
.login-code{
  height: 50px;
  width: 200px;
}
.login .el-input-group__prepend {
  font-size: 25px;
}
</style>
<style lang='less' scoped>
.el-input {
  font-size: 15px;
}

.login-btn {
  text-align: center;
}

.resetBtn,
.submitBtn {
  width: 217px;
}

.resetBtn {
  margin-left: 15px;
}

.login-wrapper {
  width: 100%;
  height: 100%;
  background-image: url(../../../static/images/login/login-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;

  .login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -317px;
    margin-top: -275px;
  }

  h1 {
    font-size: 58px;
    color: #1aabed;
    font-weight: 500;
    // text-align:center;
    // margin-left:-100px;
    margin-bottom: 60px;
  }

  .login {
    padding: 90px;
    width: 635px;
    height: 414px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    box-shadow: rgb(51, 51, 51) 0px 0px 10px;
  }
}
.s-canvas {
  height: 38px;
  canvas {
    margin-top: 1px;
    margin-left: 8px;
  }
}
</style>
