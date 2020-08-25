<template>
  <div class="container">
    <el-tabs v-model="activePane">
      <el-tab-pane label="use clipborad directly" name="first">
        <el-row>
          <el-input v-model="inputValue" placeholder="请输入要复制的内容" style="width:40%"></el-input>
          <el-button type="primary" class="el-icon-document" @click="handleClipboard(inputValue, $event)">copy</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="second" name="second">
      </el-tab-pane>
      <el-tab-pane label="third" name="third">
        <el-button type="primary">button third</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
export default {
  name: 'people',
  data() {
    return {
      inputValue: 'https://www.luokaixing.com/home',
      activePane: 'first'
    };
  },
  methods: {
    // 复制按钮功能
    handleClipboard(text, event) {
      let vm = this;
      console.log(event);
      const clipboard = new Clipboard(event.target, {
        text: () => text
      });
      clipboard.on('success', () => {
        vm.$message({
          type: 'success',
          message: '复制成功！'
        });
        clipboard.destroy();
      });
      clipboard.on('error', () => {
        vm.$message({
          type: 'error',
          message: '复制失败！'
        });
        clipboard.destroy();
      });
      clipboard.onClick(event);
    }
  },
  mounted() {
  },
  computed: {
  }
};
</script>
<style lang="less" scoped>
  .container{
    padding:30px;
    .drag-item{
      padding:5px 10px;
      border:1px solid #cdcdcd;
      border-radius:5px;
      margin:5px;
    }
  }
</style>