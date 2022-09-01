<template>
  <div>

    <el-form :inline="true" :model="cForm" class="demo-form-inline" :disabled="!isShowList">

      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" placeholder="请选择" @change="changeList1">
          <el-option  :label="item1.name" :value="item1.id"
                      v-for="item1 in category1List"
                      :key="item1.id"
          ></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" placeholder="请选择" @change="changeList2">
          <el-option  :label="item2.name" :value="item2.id"
                      v-for="item2 in category2List"
                      :key="item2.id"
          ></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" placeholder="请选择" @change="changeList3">
          <el-option  :label="item3.name" :value="item3.id"
                      v-for="item3 in category3List"
                      :key="item3.id"
          ></el-option>

        </el-select>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

export default {
  name:"CategorySelector123",
  props:['isShowList'],
  data(){
    return {
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:''
      },
      category1List:[],
      category2List:[],
      category3List:[]
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods:{
    async getCategory1List(){
     try {
       const res =await this.$API.category.getCategory1()

       if(res.code===200){
         this.category1List = res.data
       }
     }catch(error){
        alert(error.message)
     }
    },
    async changeList1(category1Id){
      this.cForm.category2Id=''
      this.cForm.category3Id=''
      this.category2List=[]
      this.category3List=[]
      this.$emit('changeCategory',{categoryId:category1Id,level:1})
      const res = await this.$API.category.getCategory2(category1Id)
      console.log(res);
      if(res.code===200){
        this.category2List = res.data
      }
    },
    async changeList2(category2Id){
      this.cForm.category3Id=''
      this.category3List=[]
      this.$emit('changeCategory', {categoryId:category2Id,level:2})
      const res = await this.$API.category.getCategory3(category2Id)

      if(res.code===200){
        this.category3List = res.data
      }
    },
    changeList3(category3Id){
      this.$emit('changeCategory',{categoryId:category3Id,level:3})
    }

  }


}

</script>

<style scoped>

</style>
