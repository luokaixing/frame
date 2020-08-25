<template>
  <el-row class="container">
    <el-row style="width:100%;height:100%;">
      <div id="chart-line" style="width:100%;height:600px;"></div>
    </el-row>
  </el-row>
</template>
<script>
import echarts from 'echarts';
export default {
  name: 'drag',
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
      chart: null
    };
  },
  watch: {
  },
  computed: {
  },
  mounted() {
    let vm = this;
    vm.init();
  },
  beforeDestroy() {
    let vm = this;
    if (!vm.chart) {
      return false;
    }
    vm.chart.dispose();
    vm.chart = null;
  },
  methods: {
    init() {
      let vm = this;
      vm.initChart();
    },
    // echarts 配置数据初始化
    initChart() {
      let vm = this;
      vm.chart = echarts.init(document.getElementById('chart-line'));
      // 生成x坐标数据
      const xData = (function() {
        const data = [];
        for (let i = 1; i < 13; i++) {
          data.push(i + 'month');
        }
        return data;
      }());
      // echarts 配置
      vm.chart.setOption({
        backgroundColor: '#bcbfcc',
        title: {
          text: 'echarts使用样例',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['female', 'male', 'average']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        // dataZoom: [{
        //   show: true,
        //   height: 30,
        //   xAxisIndex: [
        //     0
        //   ],
        //   bottom: 30,
        //   start: 10,
        //   end: 80,
        //   handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        //   handleSize: '110%',
        //   handleStyle: {
        //     color: '#d3dee5'

        //   },
        //   textStyle: {
        //     color: '#fff' },
        //   borderColor: '#90979c'

        // }, {
        //   type: 'inside',
        //   show: true,
        //   height: 15,
        //   start: 1,
        //   end: 35
        // }],
        series: [{
          name: 'female',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : '';
                }
              }
            }
          },
          data: [
            709,
            1917,
            2455,
            2610,
            1719,
            1433,
            1544,
            3285,
            5208,
            3372,
            2484,
            4078
          ]
        },

        {
          name: 'male',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : '';
                }
              }
            }
          },
          data: [
            327,
            1776,
            507,
            1200,
            800,
            482,
            204,
            1390,
            1001,
            951,
            381,
            220
          ]
        }, {
          name: 'average',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : '';
                }
              }
            }
          },
          data: [
            1036,
            3693,
            2962,
            3810,
            2519,
            1915,
            1748,
            4675,
            6209,
            4323,
            2865,
            4298
          ]
        }
        ]
      });
    }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
