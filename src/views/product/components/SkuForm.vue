<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SPU名称">
        <el-input v-model="skuForm.skuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuForm.price" placeholder="SPU价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(kg)">
        <el-input v-model="skuForm.weight" placeholder="SPU重量" type="number"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuForm.skuDesc" placeholder="SPU规格描述" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item :label="item.attrName" v-for="item in attrList" :key="item.id">
            <el-select v-model="item.attrIdValueId" placeholder="请选择">
              <el-option :value="`${item.id}:${item2.id}`" v-for="item2 in item.attrValueList" :key="item2.id"
                         :label="item2.valueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item v-for="item in spuSaleAttrList" :key="item.id" :label="item.saleAttrName">
            <el-select value="value" placeholder="请选择" v-model="item.saleAttrValueId">
              <el-option :value="item2.id" v-for="item2 in item.spuSaleAttrValueList" :key="item2.id"
                         :label="item2.saleAttrValueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border
                  ref="multipleTable"
                  :data="spuImageList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="60">
          </el-table-column>
          <el-table-column
            label="图片"
            width="width">
            <template slot-scope="{row,$index}"><img :src="row.imgUrl" alt="" style="width: 80px;height: 80px;">
            </template>
          </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称"
            width="width">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              <el-button v-if="row.isDefault==='0'" type="primary" @click="setDefault(row)">设为默认</el-button>
              <el-tag v-else type="success">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="$emit('update:cisible',false)">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  name: "SkuForm",
  data() {
    return {

      checkedImgList: [],

      multipleSelection: "",
      skuForm: {
        // 下面3个数据从父组件传入收集
        category3Id: null, // 3级分类ID
        spuId: null, // SPU的id
        tmId: null, // 品牌ID

        // 下面4个通过v-model收集
        skuName: null, // sku的名称
        skuDesc: null, // sku的描述
        price: null, // sku的价格
        weight: null, // sku的重量

        skuDefaultImg: null, // sku的默认图片
        skuAttrValueList: [], // sku的属性值列表
        skuSaleAttrValueList: [], // sku属性属性值列表
        skuImageList: [], // 选择的spu图片列表
      },
      spu: {},
      attrList: [],
      spuSaleAttrList: [],
      spuImageList: []
    }
  },
  methods: {
    resetData() {

      this.checkedImgList = []

      this.multipleSelection = ''
      this.skuForm = {
        category3Id: '',
        spuId: '',
        tmId: '',

        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [

        ],
        skuDefaultImg: '',

        skuImageList: [

        ],
        skuName: '',
        skuSaleAttrValueList: [

        ]


      }
      this.spu = {}
      this.attrList = []
      this.spuSaleAttrList = []
      this.spuImageList = []
    },
    handleSelectionChange(val) {
      this.checkedImgList = val;//element自带
    },
    async initAddSkuFormData(row) {

      //Request URL: http://localhost:9528/dev-api/admin/product/attrInfoList/2/13/61
      this.spu = row
      const {category1Id, category2Id, category3Id, id} = this.spu
      console.log(this.spu);
      const promise1 = this.$API.attrs.getAListOfPlatformProperties123(category1Id, category2Id, category3Id)
      //Request URL: http://localhost:9528/dev-api/admin/product/spuSaleAttrList/1873
      const promise2 = this.$API.sku.getSpuSaleAttrList(id)

      //Request URL: http://localhost:9528/dev-api/admin/product/spuImageList/1873
      const promise3 = this.$API.sku.getSpuImageList(id)

      const res = await Promise.all([promise1, promise2, promise3])
      this.attrList = res[0].data
      this.spuSaleAttrList = res[1].data
      let spuImgList = res[2].data
      spuImgList.forEach((item) => {
        item.isDefault = '0'
      })//拦截,添加标识符
      this.spuImageList = spuImgList
      this.spuImageList = res[2].data
      this.skuForm.category3Id = row.category3Id
      this.skuForm.spuId = row.id
      this.skuForm.tmId = row.tmId
    },
    //设为默认按钮,绑定数据
    setDefault(row) {
      this.spuImageList.forEach(item => item.isDefault = '0')
      row.isDefault = '1'//排他
      this.skuForm.skuDefaultImg = row.imgUrl//最终收集
    },
    async save() {

      const {skuForm, attrList, spuSaleAttrList, checkedImgList} = this
      //attr
      attrList.forEach(item => {
        if (item.attrIdValueId) {
          const [attrId, valueId] = item.attrIdValueId.split(':')
          skuForm.skuAttrValueList.push({
            attrId,
            valueId
          })
        }
      })
      //saleAttr
      skuForm.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, next) => {
        if (next.saleAttrValueId) {
          prev.push({saleAttrValueId: next.saleAttrValueId})
        }
        return prev
      }, [])
      //img
      skuForm.skuImageList = checkedImgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          spuImgId: item.id,
          isDefault: item.isDefault
        }
      })
      if(skuForm.id){
        await this.$API.sku.updateSkuInfo(skuForm)
      }else {
        await this.$API.sku.saveSkuInfo(skuForm)
      }
      this.$message.success('保存SKU成功')
      this.resetData()
      this.$emit('success')
    }
  }
}

</script>

<style scoped>

</style>
