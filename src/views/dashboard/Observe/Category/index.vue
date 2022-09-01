<template>
  <div>
    <el-card>
      <div slot="header">
        <div class="category-header">
          <span>销售额类别占比</span>
          <div>
            <el-radio-group v-model="categoryValue" size="small">
              <el-radio-button label="全部渠道"></el-radio-button>
              <el-radio-button label="线上"></el-radio-button>
              <el-radio-button label="门店"></el-radio-button>

            </el-radio-group>
          </div>

        </div>
      </div>
      <div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>



export default {
  name: "",
  data() {
    return {
      categoryValue: ''
    }
  },
  mounted() {
    let echarts = require('echarts')
    let pieCharts = echarts.init(this.$refs.charts)
    pieCharts.setOption({
      title:{
        text:'视频',
        subtext:'1120',
        left:'center',
        top:'center'
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        bottom: 150,
        top: 20,
        right: 0,
        left: 50,
        height: 300
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },

          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    pieCharts.on('mouseover',(params) =>{
      // series name 为 'uuu' 的系列中的图形元素被 'mouseover' 时，此方法被回调。
      console.log(params);
      const {name,value} = params.data
      pieCharts.setOption({
        title:{
          text:name,
          subtext:value
        },
      })
    });
  }
}
//事件


</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.charts{
  width: 100%;
  height: 200px;

}
>>>.el-card__header{
  padding: 10px;
}
</style>
