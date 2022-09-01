<template>
  <div>
    <el-table

      lazy
      :data="category1"
      :load="loadList"
      :row-key="getRowKey"
      :tree-props="{children:'children',hasChildren:'hasChildren'}"
      :row-class-name="tableRowClassName"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="分类ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="width"
         sortable>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        width="width">
        <template slot="header">
          <el-input placeholder="按Enter键添加一级分类"></el-input>
        </template>

        <el-button type="primary" icon="el-icon-plus" style="width: 60px;height: 40px;"></el-button>
        <el-button type="primary" icon="el-icon-edit" style="width: 60px;height: 40px;"></el-button>
        <el-button type="danger"icon="el-icon-delete" style="width: 60px;height: 40px;"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name:"Category",
  data(){
    return {
      category1:[]
    }
  },
  mounted() {
    this.getCategoryList1()
  },
  methods:{
    async getCategoryList1(){
      const res = await this.$API.category.getCategory1()
      if(res.code===200){
          const category1 = res.data
        category1.forEach(item=>{
          item.hasChildren = true
          item.level = 1
        })
        this.category1 = category1
      }else {
        return Promise.reject(new Error('failed'))
      }
    },
    async getCategoryList2(row){
      const res = await this.$API.category.getCategory2(row.id)
      if(res.code===200){
        const category2 = res.data
        if(category2 && category2.length>0){
           category2.forEach((item) => {
             item.hasChildren = true
             item.level = 2
           })
          return category2
        }
      }else {
        row.hasChildren = false
        return []
      }
    },
    async getCategoryList3(row){
      const res = await this.$API.category.getCategory3(row.id)
      if(res.code===200){
        const category3 = res.data
        if(category3 && category3.length>0){
          category3.forEach((item) => {
            item.level = 3
          })
          return category3
        }else {
          row.hasChildren = false
          return []
        }
      }else {

        return []
      }
    },
    getRowKey(row){
      return row.level + '-'+ row.id
    },
    tableRowClassName({row, rowIndex}){
      if(row.level===2){
          return 'level2-row'
      }else if(row.level===3){
        console.log(111);
        return 'level3-row'
      }
    },
    async loadList(row,treeNode,resolve){
      if(row.level===1){
          const category2 = await this.getCategoryList2(row)
        resolve(category2)
      }else if(row.level===2){
          const category3 = await this.getCategoryList3(row)
        resolve(category3)
      }
    }
  }

}

</script>

<style>
.el-table .level2-row {
  background: #d9fadc;
}
.level3-row{
  background: #e7f8e9 !important;
}
</style>
