<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="first"></el-tab-pane>
          <el-tab-pane label="访问量" name="second"></el-tab-pane>

        </el-tabs>
<!--right-->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setweek">本周</span>
          <span @click="setmonth">本月</span>
          <span @click="setyear">本年</span>

            <el-date-picker
              class="date"
              v-model="date"
              type="monthrange"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份" size='mini'
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
<!--            chart-->
            <div ref="charts" class="charts" style="width: 100%;height: 350px;"></div>

          </el-col>
          <el-col :span="6">
            <h3>门店{{title}}排名</h3>
            <ul>
              <li>
                <span class="rindex" >1</span>
                <span class="rcenter">KFC</span>
                <span class="rvalue">122000</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span class="rcenter">KFC</span>
                <span class="rvalue">122000</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span class="rcenter">KFC</span>
                <span class="rvalue">122000</span>
              </li>
              <li>
                <span class="rindex" style="background-color:#fff;color: black">4</span>
                <span class="rcenter">KFC</span>
                <span class="rvalue">122000</span>
              </li>
              <li>
                <span class="rindex" style="background-color:#fff;color: black">5</span>
                <span class="rcenter">KFC</span>
                <span class="rvalue">122000</span>
              </li>
              <li>
                <span class="rindex" style="background-color:#fff;color: black">6</span>
                <span class="rcenter">KFC</span>
                <span class="rvalue">122000</span>
              </li>
              <li>
                <span class="rindex" style="background-color:#fff;color: black">7</span>
                <span class="rcenter">KFC</span>
                <span class="rvalue">122000</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {mapState} from "vuex";
export default {
  name:"",
  data(){
    return {
      activeName:'first',

      charts:null,
      date:[]
    }
  },
  mounted() {
    let echarts = require('echarts')
    this.charts = echarts.init(this.$refs.charts)
    this.charts.setOption({
      title:{text:'销售额趋势'},
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
        axisTick:{
          alignWithLabel:true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130,120,200,100,70,190],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    })
  },
  computed:{
    title(){
      return this.activeName==='first'?'销售额':'访问量'
    },
   /* ...mapState({
      listState:state=>state.home.list
    })*/
  },
  watch:{
    title(){
        this.charts.setOption({
          title:{
            text:this.title
          },
       /*   xAxis:{
            data:this.title=='销售额'?this.listState.orderFullYearAxis:this.listState.userFullYear
          },
          series:[
            {
              data:this.title=='销售额'?this.listState.orderFullYear:this.listState.userFullYear,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]*/
        })
    },
   /* listState(){
      this.charts.setOption({
        title:{text:'销售额趋势'},
        xAxis: {
          type: 'category',
          data:this.listState.orderFullYearAxis,
          /!*
                  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
          *!/
          axisTick:{
            alignWithLabel:true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            /!*
                      data: [120, 200, 150, 80, 70, 110, 130,120,200,100,70,190],
            *!/
            data:this.listState.userFullYear,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    }*/
  },
  methods:{
    setDay(){
      let day = dayjs().format('YYYY-MM-DD')
      this.date = [day,day]
    },
    setweek(){
      let startweek = dayjs().day(1).format('YYYY-MM-DD')
      let endweek = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [startweek,endweek]
    },
    setmonth(){
      let startmonth = dayjs().startOf('month').format('YYYY-MM-DD')
      let endtmonth = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [startmonth,endtmonth]
    },
    setyear(){
      let startyear = dayjs().startOf('year').format('YYYY-MM-DD')
      let endtyear = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [startyear,endtyear]
    }
  }
}
</script>
<style scoped>
.clearfix{
  position: relative;
  display: flex;
  justify-content: space-between;
}
>>>.el-card__header{
  border-bottom: none!important;
}
.tab{
  width: 100%;
}
.right{
  position: absolute;
  right: 0;

}
.right span{
  margin: 0 8px;
}
.date{

}
ul{
  list-style: none;
  width: 100%;
  height: 350px;
  padding: 0;

}
ul li{
  height: 8%;
  margin: 6px 0;
  text-align: center;
}
.rindex{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: black;
  color: white;

  float: left;



}
.rvalue{
  float: right;
}

</style>
