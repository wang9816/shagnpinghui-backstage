<template>
  <div>
    <el-table border style="width: 100%;" :data="records">
      <el-table-column label="序号" width="80" type="index"></el-table-column>
      <el-table-column label="名称" prop="skuName" width="width"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="width"></el-table-column>
      <el-table-column label="默认图片"  width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="重量(KG)" prop="weight" width="width"></el-table-column>
      <el-table-column label="价格(元)" prop="price" width="width"></el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row,$index}">
          <hint-button type="success" title="下架" icon="el-icon-sort-down" size="mini" v-if="row.isSale!==0" @click="cancelSale(row)"></hint-button>
          <hint-button type="success" title="上架" icon="el-icon-sort-up" size="mini" v-else @click="onSale(row)"></hint-button>
          <hint-button type="primary" title="编辑" icon="el-icon-edit" size="mini" @click="edit"></hint-button>
          <hint-button type="info" title="查看详情" icon="el-icon-info" size="mini" @click="showSkuInfo(row)"></hint-button>
          <hint-button type="danger" title="编辑" icon="el-icon-delete" size="mini"></hint-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50]"
      style="padding: 20px 0; text-align: center;"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getUpdateSkuPage"
      @size-change="changeSize">

    </el-pagination>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      size="50%">

      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfoList.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfoList.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfoList.price}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag style="margin:3px " type="success" v-for="item in skuInfoList.skuAttrValueList" :key="item.id">{{item.attrId}}-{{item.valueId}}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <div class="block">

            <el-carousel class="sku-carousel" trigger="click" height="400px">
              <el-carousel-item v-for="item in skuInfoList.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width: 400px;height: 400px;">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name:"",
  data(){
   return{
     page:1,
     total:0,
     limit:3,
     records:[],
     skuInfoList:[],
     drawer: false,
     direction: 'rtl',


   }

  },
  mounted() {
    this.getUpdateSkuPage()
  },
  methods:{
    changeSize(size) {
      this.limit = size
      this.getUpdateSkuPage(1)
    },
    async getUpdateSkuPage(pages=1){
      this.page = pages
      const res = await this.$API.sku.updateSkuPage(this.page,this.limit)
      if(res.code===200){
          this.total = res.data.total
          this.records = res.data.records
      }
    },
    async onSale(row){
        const res = await this.$API.sku.onSale(row.id)
      if(res.code===200){
        row.isSale = 1
        this.$message.success('上架成功')
      }
    },
    async cancelSale(row){
      const res = await this.$API.sku.cancelSale(row.id)
      if(res.code===200){
        row.isSale = 0
        this.$message.success('下架成功')
      }
    },
    edit(){
      this.$message.info('敬请期待!')
    },
    async showSkuInfo(row){
      const res = await this.$API.sku.getSkuById(row.id)
      if(res.code===200){
        this.skuInfoList = res.data
        this.drawer = true
      }
    }
  }


}

</script>

<style scoped>
.el-row .el-col-5{
  color: #e1a9a9;
  font-size: 18px;
  text-align: right;
}
.el-col{
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
>>>.el-carousel__button{
  width: 10px;
  height: 10px;
  background-color: #adabad;
  border-radius: 50%;
}
.sku-carousel{
  width: 400px;
}
</style>
