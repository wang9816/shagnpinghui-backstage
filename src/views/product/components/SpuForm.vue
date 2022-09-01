<template>
  <div>
    <el-form :model="spuForm" label-width="100px">
      <el-form-item label="SPU名称" placeholder="SPU名称">
          <el-input v-model="spuForm.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
          <el-option
            v-for="item in trademarkListDome"
            :key="item.id"
            :label="item.tmName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述" placeholder="SPU描述">
        <el-input v-model="spuForm.description" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="http://gmall-h5-api.atguigu.cn/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageListDome"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
           :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性" >
        <el-select v-model="spuSaleAttrIdName" :placeholder="notSelectSpuAttrList.length>0 ? `还有${notSelectSpuAttrList.length}个未选择`:'没有了'">
          <el-option
            v-for="item in notSelectSpuAttrList"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`">
          </el-option>
        </el-select>
        <el-button :disabled="!spuSaleAttrIdName" type="primary" icon="el-icon-plus" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border style="margin: 20px auto;" :data="spuForm.spuSaleAttrList">
          <el-table-column label="序号" width="100" type="index"></el-table-column>
          <el-table-column label="属性名" width="150" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{row,$index}">
              <hint-button @click.prevent="spuForm.spuSaleAttrList.splice($index,1)" type="danger" title="删除" icon="el-icon-delete" size="mini"> </hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="$emit('update:visible',false)">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  name: "SpuForm",

  data() {
    return {

      spuImageListDome:[],
      trademarkListDome:[],
      saleAttrListDome:[],
      spuSaleAttrIdName:'',
      dialogImageUrl: '',
      dialogVisible: false,
      spuForm: {
          category3Id: 0,
          description: "",
          id:'',
          spuImageList: [
            {
              id: 0,
              imgName: "",
              imgUrl: "",
              spuId: ''
            }
          ],
          spuName: '',
          spuSaleAttrList: [
            {
              baseSaleAttrId: 0,
              id: 0,
              saleAttrName: "",
              spuId: 0,
              spuSaleAttrValueList: [
                {
                  baseSaleAttrId: 0,
                  id: 0,
                  isChecked: "",
                  saleAttrName: "",
                  saleAttrValueName: "",
                  spuId: 0
                }
              ]
            }
          ],
          tmId: ''
        }
    }
  },
  methods: {

    //send picture
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.spuImageListDome = fileList
    },
    handleSuccess(response, file, fileList){
      console.log('handleUploadSuccess', response, file, fileList)

      this.spuImageListDome = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initUpdateSpuFormData(spu){
      //spu详情 图片列表 品牌列表 销售属性数据
      this.category3Id = spu.category3Id
      let res = await this.$API.spu.getSpuById(spu.id)

      if(res.code===200){
        this.spuForm = res.data
      }
      const imgResult = await this.$API.sku.getSpuImageList(spu.id)
      if(imgResult.code===200){
        //照片墙代码要求:name,url
        let si = imgResult.data
        si.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageListDome = si

      }
      const trademarkRes = await this.$API.trademark.getTrademarkList()
      if(trademarkRes.code===200){
        this.trademarkListDome = trademarkRes.data
      }
      const baseSaleAttrRes = await this.$API.spu.getBaseSaleAttrList()
      if(baseSaleAttrRes.code===200){
          this.saleAttrListDome = baseSaleAttrRes.data
      }
    },
     async initAddSpuFormData(category3Id){
      //品牌列表  销售属性
      this.category3Id = category3Id
      const trademarkRes = await this.$API.trademark.getTrademarkList()
      if(trademarkRes.code===200){
        this.trademarkListDome = trademarkRes.data
      }
      const baseSaleAttrRes = await this.$API.spu.getBaseSaleAttrList()
      if(baseSaleAttrRes.code===200){
        this.saleAttrListDome = baseSaleAttrRes.data
      }

    },
    addSaleAttr(){
      let [baseSaleAttrId,saleAttrName] = this.spuSaleAttrIdName.split(':')
      let obj = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spuForm.spuSaleAttrList.push(obj)
      this.spuSaleAttrIdName = ''
    },
    showInput(row){
      this.$set(row,'inputVisible',true)
      this.$nextTick(() => {
          this.$refs.saveTagInput.focus()
      })
    },
    //lose focus
    handleInputConfirm(row){
      let saleAttrValueName = row.inputValue
      let baseSaleAttrId = row.baseSaleAttrId
      if(saleAttrValueName.trim()===''){
        row.inputValue=''
        return
      }
      let isRepeat = row.spuSaleAttrValueList.some(item=> item.saleAttrValueName===saleAttrValueName)
      if(isRepeat){
        this.$message.info('属性值不能重复')

      }

      let obj = {
        saleAttrValueName,
        baseSaleAttrId
      }

      row.spuSaleAttrValueList.push(obj)

      row.inputValue = ''
      row.inputVisible = false
    },
    async save(){
      //收集参数数据 整理参数 发送请求 成功
      let {spuForm,spuImageListDome,category3Id} = this
      spuForm.spuImageList = spuImageListDome.map((item) => {
          return {
            imgName:item.name,
            imgUrl:item.response ? item.response.data : item.imgUrl

          }
      })
      spuForm.category3Id = category3Id
      spuForm.spuSaleAttrList.forEach((item) => {
          delete item.inputVisible
          delete item.inputValue
      })
        try {
         if(spuForm.id){
             await this.$API.spu.updateSpuInfo(spuForm)
         }else {
           await this.$API.spu.saveSpuInfo(spuForm)
         }
         this.$message.success('成功')
          this.$emit('update:visible',false)
          this.$emit('successBack')
          this.resetData()

        }catch(error){
           this.$message.error('失败')
        }
    },
    resetData(){
      this.spuImageListDome=[]
      this.trademarkListDome=[]
      this.saleAttrListDome=[]
      this.spuSaleAttrIdName=''
      this.dialogImageUrl=''
      this.dialogVisible=false
      this.spuForm={
        category3Id: '',
          description: "",
          id: 0,
          spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: ''
          }
        ],
          spuName: '',
          spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0
              }
            ]
          }
        ],
          tmId: ''
      }
    }
  },
  computed:{
    notSelectSpuAttrList(){
      return  this.saleAttrListDome.filter(item=>{
        return  this.spuForm.spuSaleAttrList.every(items=>{
          return items.name!==item.saleAttrName
        })
      })

    }
  }


}

</script>
<!--
跟踪数据
-->
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
