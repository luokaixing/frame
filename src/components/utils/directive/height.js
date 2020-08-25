import Vue from 'vue';
Vue.directive('height', {
  inserted: function(el) {
    let timer = null;
    let $window = $(window);
    $(window).resize(function(event) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        scroll();
      }, 100);
    });
    scroll();

    function scroll() {
      var $el = $(el);
      var props = $el.attr('props');
      var height = 0;
      if (props == 'header') {
        height = $window.height() - ($('.el-header').height() + parseInt($el.css('marginTop')) + parseInt($el.css('marginBottom')));
      } else {
        $el.siblings().each(function(index, el) {
          height += $(this).outerHeight();
        });
        height = $window.height() - (height + $('.el-header').height() * 2);
      }
      if (height > 130) {
        if (el.__vue__ != null) {
          el.__vue__.$store.commit('setTools', { tableHeight: height });
        }
        $el.height(height);
      } else {
        if (el.__vue__ != null) {
          el.__vue__.$store.commit('setTools', { tableHeight: 250 });
        }
        $el.height(250);
      }

      clearTimeout(timer);
      if (height <= 0) {
        timer = setTimeout(() => {
          scroll();
        }, 100);
      }
    }
  }
});
