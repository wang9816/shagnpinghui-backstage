<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="$ 1111000">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;89%</span>
              <svg t="1660182715342" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11054" width="16" height="16"><path d="M768.002 535.89H600.749l-0.909-322.563h-166.4v322.56l-167.253-0.455L517.181 858.39l250.821-322.5z" fill="#FD3333" p-id="11055"></path></svg>
              &nbsp;&nbsp;
              <span >日同比&nbsp&nbsp89%</span>
              <svg t="1660182655679" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10028" width="16" height="16"><path d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z" fill="#1296DB" p-id="10029"></path></svg>
            </template>
            <template slot="footer">
              <span>日销售额$ 560000</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="1111000">
            <template slot="charts">
              <line-charts></line-charts>
            </template>
            <template slot="footer">
              <span>日访问量&nbsp;560000</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="1111000">
            <template slot="charts">
              <bar-charts></bar-charts>
            </template>
            <template slot="footer">
              <span>转换率 50%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="79%">
            <template slot="charts">
              <progress-charts></progress-charts>
            </template>
            <template slot="footer">
              <span>周同比&nbsp;&nbsp;89%</span>
              <svg t="1660182715342" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11054" width="16" height="16"><path d="M768.002 535.89H600.749l-0.909-322.563h-166.4v322.56l-167.253-0.455L517.181 858.39l250.821-322.5z" fill="#FD3333" p-id="11055"></path></svg>
              &nbsp;&nbsp;
              <span >日同比&nbsp&nbsp89%</span>
              <svg t="1660182655679" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10028" width="16" height="16"><path d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z" fill="#1296DB" p-id="10029"></path></svg>
            </template>
          </Detail>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import Detail from "@/views/dashboard/Card/Detail"
import LineCharts from "@/views/dashboard/Card/Detail/LineCharts";
import BarCharts from "@/views/dashboard/Card/Detail/barCharts";
import ProgressCharts from "@/views/dashboard/Card/Detail/progressCharts";
export default {
  name: "",
  components: {
    Detail,
    LineCharts,
    BarCharts,
   ProgressCharts
  }
}

</script>

<style scoped>

</style>
