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
        show:false,
        min:0,
        max:100
      },
      yAxis: {

        show:false,
        type: 'category',
      },
      series:[
        {
          type:"bar",
          data:[79],
          color:'#8bad61',
          barWidth:12,
          showBackground:true,
          backgroundStyle:{
            color:"#dcdcdc"
          },
          label:{
            show:true,
            formatter:'|',
            position:'right'
          }
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
