<template>
  <div>
<el-card >
<div slot="header">
  <div class="search-header">
    <span>线上热门搜索</span>

    <el-dropdown>
  <span class="el-dropdown-link">
    <i class="el-icon-more"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
<div>
  <el-row :gutter="10">
    <el-col :span="12"><line-charts></line-charts></el-col>
    <el-col :span="12"><line-charts></line-charts></el-col>
  </el-row>
  <el-table border style="width: 100%;">
    <el-table-column label="排名"  width="80"></el-table-column>
    <el-table-column label="搜索关键字" width="width"></el-table-column>
    <el-table-column label="用户数" sortable width="width"></el-table-column>
    <el-table-column label="周涨幅" sortable width="width"></el-table-column>
  </el-table>
<!--分页-->
  <el-pagination class="pag"
    :page-size="20"
    :pager-count="11"
    layout="prev, pager, next"
    :total="100">
  </el-pagination>
</div>
</el-card>

  </div>
</template>

<script>
import LineCharts from "@/views/dashboard/Observe/Search/LineChart";
export default {
  name:"",
  components:{
    LineCharts
  }

}

</script>

<style scoped>
.search-header{
  display: flex;
  justify-content: space-between;
}
.pag{
  float: right;
}
</style>
