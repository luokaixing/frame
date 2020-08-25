import Vue from 'vue';
Vue.prototype.errorValidate = function(el) {
  let vm = this;
  setTimeout(() => {
    let $error = $('.el-form-item__error').eq(0);
    if ($error.css('display') == 'none') {
      $error = $('.el-form-item__error').eq(1);
    }
    vm.$message.error({
      showClose: true,
      message: $error.html(),
      type: 'error'
    });
    let siblings = $error.siblings();
    if (siblings.hasClass('el-select') || siblings.hasClass('el-date-editor--date') || siblings.find('.el-date-editor--date').length > 0) {
      siblings.eq(0).focus();
      let error = $error.siblings('.timeError');
      siblings.find('.timeError').focus();
      if (error.length == 0) {
        siblings.find('input').focus();
      }
    } else {
      siblings.find('input').focus();
      siblings.find('textarea').focus();
      siblings.find('button').focus();
    }
  }, 500);
};
// 数字并且小数点后面最多六位
Vue.prototype.maxsix = (rule, value, callback) => {
  let cill = /^\d+(\.\d{1,6})?$/;
  if (cill.test(value)) {
    callback();
  } else {
    return callback(new Error('请输入数字并且小数点后面最多六位'));
  }
};
