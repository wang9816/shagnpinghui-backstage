<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">

         <Search></Search>

      </el-col>
      <el-col :span="12">

          <CategoryList></CategoryList>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import CategoryList from "@/views/dashboard/Observe/Category";
import Search from "@/views/dashboard/Observe/Search";

export default {
  name: "",
  components: {
    CategoryList,
    Search
  }

}

</script>

<style scoped>

</style>
