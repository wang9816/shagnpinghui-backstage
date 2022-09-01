<template>
  <div>
    <el-card>
      <CategorySelector123 @changeCategory="changeCategory" :isShowList="isShowList"></CategorySelector123>
    </el-card>
    <el-card>
      <div  v-show="!isShowSpuForm&&!isShowSkuForm">
        <el-button @click="addSpu" type="primary" icon="el-icon-plus">添加SPU</el-button>

        <el-table
          style="margin: 20px auto; width: 100%"
          border
          :data="spuList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width">
          </el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="{row,$index}">
              <hint-button  @click="addSku(row)" type="primary" icon="el-icon-plus" title="添加sku" size="mini"></hint-button>
              <hint-button  @click="editSpu(row)" type="warning" icon="el-icon-edit" title="编辑spu" size="mini"></hint-button>
              <hint-button  type="info" icon="el-icon-info" title="查看的SKU列表" size="mini" @click="handle(row)"></hint-button>
              <hint-button  type="danger" icon="el-icon-delete" title="删除spu" size="mini"></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>

      <sku-form v-show="isShowSkuForm" ref="sku"  :cisible.sync="isShowSkuForm" @success="isShowSkuForm=false "></sku-form>

      <spu-form v-show="isShowSpuForm" ref="spu" @successBack="successBack" :visible.sync="isShowSpuForm"></spu-form>
    </el-card>
    <el-dialog :title="`${spu.spuName}`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="tableList" border v-loading="loading">
        <el-table-column prop="skuName" label="品牌" width="150"></el-table-column>
        <el-table-column prop="price" label="价格(元)" width="200"></el-table-column>
        <el-table-column prop="weight" label="重量(KG)"></el-table-column>
        <el-table-column  label="默认图片">
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "@/views/product/components/SkuForm";
import SpuForm from "@/views/product/components/SpuForm";
export default {
  name:"",
  components:{
    SkuForm,
    SpuForm
  },
  data(){
    return {
      loading:true,
      tableList:[],
      spu:[],
      dialogTableVisible:false,
      spuList:[],
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowList: true,
      attrForm: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
        /* {
           "attrName": "string",
           "attrValueList": [
           {
             "attrId": 0,
             "id": 0,
             "valueName": "string"
           }
         ],
           "categoryId": 0,
           "categoryLevel": 0,
           "id": 0
         }*/
      },
      page:1,
      limit:3,

      total:0,
      isShowSpuForm:false,
      isShowSkuForm:false,

    }
  },
  methods:{
    close(done){
      this.loading = true
      this.tableList = []
      done()
    },
    handleSizeChange(val) {
      this.limit=val
      this.getSpuList()
    },
    handleCurrentChange(val) {
      this.page=val
      this.getSpuList()
    },
    changeCategory({categoryId, level}) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.spuList = []
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.spuList = []
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    async getSpuList(){

       let res = await this.$API.spu.updateSpuPage(this.page,this.limit,this.category3Id)
      console.dir("res"+res.data);
      if(res.code===200){
          this.spuList = res.data.records

        this.total = res.data.total
      }
    },
    addSpu(){
      this.isShowSpuForm = true
      this.$refs.spu.initAddSpuFormData(this.category3Id)//通信高级

    },
    addSku(row){
      this.isShowSkuForm = true
      row = {...row}
      row.category1Id = this.category1Id
      row.category2Id = this.category2Id
      this.$refs.sku.initAddSkuFormData(row)
      console.log(row);

    },
    editSpu(row){
      this.flag = row.id
      this.isShowSpuForm = true
      this.$refs.spu.initUpdateSpuFormData(row)

    },
    successBack(){
      if(this.flag){
          this.getSpuList(this.page)

      }else {
        this.getSpuList()
      }

      this.flag=null
    },
    async handle(row){
     /* this.loading = true
      this.tableList = []*/
      this.dialogTableVisible=true
      this.spu = row
      const res =  await this.$API.sku.findBySpuId(row.id)
      console.log(res);
      if(res.code===200){
          this.tableList = res.data
        this.loading = false
      }

    }

  }

}

</script>

<style scoped>

</style>
