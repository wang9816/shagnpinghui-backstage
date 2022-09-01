<template>
  <div class="charts" ref="charts" style="width: 100%;height: 100%;">

  </div>
</template>

<script>

export default {
  name:"",
  mounted() {
    let echarts = require('echarts')
    let lineCharts = echarts.init(this.$refs.charts)
    lineCharts.setOption({
      xAxis:{
        show:false,
        type:"category"

      },
      yAxis:{ show:false},
      series:[
        {
          type:'line',
          data:[10,22,10,8,22,7,30,10],
          itemStyle:{
            opacity:0
          },
          lineStyle:{
            color:'purple'
          },
          areaStyle:{
            color:{

          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'purple' // 0% 处的颜色
          }, {
            offset: 1, color: 'white' // 100% 处的颜色
          }],
          global: false // 缺省为 false

        }
          },
          smooth: true,  //true 为平滑曲线，false为直线
        }
      ],
      grid:{
        left:1,
        right:0,
        top:0,
        bottom:0
      }

    })
  }

}

</script>

<style scoped>

</style>
