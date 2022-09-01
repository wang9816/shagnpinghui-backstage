<template>
  <div class="charts" ref="charts" style="width: 100%;height: 100%;">

  </div>
</template>

<script>

export default {
  name:"",
  mounted() {
    let echarts = require('echarts')
    let barCharts = echarts.init(this.$refs.charts)
    barCharts.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series:[
        {
          type:"bar",
          data:[10,22,10,8,22,7,30,10,11,2,33],
        }
      ],
      tooltip:{},
      grid:{
        left:0,
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
