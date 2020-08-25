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
        <el-row>
          <el-col :sapn="12" style="display:inline-block;width:49%;">
            <h3>drag list one</h3>
            <draggable :set-data="setData" :list="list1" group="article" style="display:inline-block;width:100%;">
              <div v-for="element in list1" :key="element.id">
                <div class="drag-item">{{ element.id }}[{{ element.author }}] {{ element.title }}</div>
              </div>
            </draggable>
          </el-col>
          <el-col :sapn="12" style="display:inline-block;width:49%;">
            <h3>drag list two</h3>
            <draggable :list="list2" group="article" style="display:inline-block;width:100%;">
              <div v-for="element in list2" :key="element.id">
                <div class="drag-item">{{ element.id }}[{{ element.author }}] {{ element.title }}</div>
              </div>
            </draggable>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="third" name="third">
        <el-button type="primary">button third</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import draggable from 'vuedraggable';
export default {
  name: 'dragZoom',
  components: {
    draggable
  },
  data() {
    return {
      inputValue: 'https://www.luokaixing.com/home',
      activePane: 'first',
      list1: [{
        id: 1,
        author: 'luoluo',
        title: '新建页面标题测试1'
      }, {
        id: 2,
        author: 'luoluo',
        title: '新建页面标题测试2'
      }, {
        id: 3,
        author: 'luoluo',
        title: '新建页面标题测试3'
      }, {
        id: 4,
        author: 'luoluo',
        title: '新建页面标题测试4'
      }, {
        id: 5,
        author: 'luoluo',
        title: '新建页面标题测试5'
      }],
      list2: [{
        id: 101,
        author: 'luoluo',
        title: '新建页面标题测试01'
      }, {
        id: 102,
        author: 'luoluo',
        title: '新建页面标题测试02'
      }, {
        id: 103,
        author: 'luoluo',
        title: '新建页面标题测试03'
      }, {
        id: 104,
        author: 'luoluo',
        title: '新建页面标题测试04'
      }, {
        id: 105,
        author: 'luoluo',
        title: '新建页面标题测试05'
      }]
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
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '');
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