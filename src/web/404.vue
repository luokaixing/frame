<template>
  <div class="error">
    <h1 style="text-align:center;margin-top:100px;">您输入的地址找不到相关页面！</h1>
  </div>
</template>
<script>
export default {
  name: 'error',
  data() {
    return {
      loadingshow: false
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
</style>
