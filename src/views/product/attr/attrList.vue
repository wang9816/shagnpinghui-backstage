<template>
  <div>
    <el-card>

      <CategorySelector123 @changeCategory="changeCategory" :isShowList="isShowList"></CategorySelector123>
    </el-card>
    <el-card style="margin-top: 20px;">
      <div v-show="isShowList">
        <el-button type="primary" icon="el-icon-plus"
                   @click="showAddaAttrItem"
                   :disabled="!!!category3Id"
        >
          添加属性
        </el-button>


        <el-table style="width: 100%;" border :data="attrList" >
          <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{row,$index}">
              <el-tag type="info" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="{row,$index}">
              <hint-button size="mini" type="primary" icon="el-icon-edit" title="修改"
                           @click="updateEditItem(row)"></hint-button>
              <el-popconfirm
                :title="`确定删除${row.attrName}吗`"
                @onConfirm="deleteAttrItem(row)"
              >
                <hint-button  size="mini" slot="reference" type="danger" icon="el-icon-delete" title="删除"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!!!isShowList">
        <el-form :model="attrForm" :inline="true">
          <el-form-item label="属性名">
            <el-input v-model="attrForm.attrName" label="请输入属性名" @blur="checkAttrName(attrForm.attrName)"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="!attrForm.attrName" type="primary" icon="el-icon-plus" @click="addAttrValue">添加属性值
        </el-button>
        <el-button @click="isShowList=true">取消</el-button>


        <el-table style="width: 100%; margin-top: 20px;margin-bottom: 20px;" border :data="attrForm.attrValueList">
          <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
          <el-table-column prop="valueName" label="属性值">
            <template slot-scope="{row,$index}">
              <el-input :ref="$index" size="mini" v-if="row.isEdit" placeholder="请输入属性值" v-model="row.valueName" @blur="toCheck(row)"
                        @keyup.enter.native="toCheck(row)"></el-input>
              <span v-if="!row.isEdit" style="display: inline-block;width: 100%;height: 100%;"
                    @click="toEdit(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="{row,$index}">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="attrForm.attrValueList.splice($index,1)"
              >
                <hint-button slot="reference" size="mini" type="danger" icon="el-icon-delete" title="删除"></hint-button>

              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAndSend" :disabled="attrForm.attrValueList.length===0">保存</el-button>
        <el-button @click="isShowList=true">取消</el-button>
      </div>


    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "",

  data() {
    return {

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
      }

    }
  },
  methods: {
    changeCategory({categoryId, level}) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.attrList = []
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.attrList = []
      } else {
        this.category3Id = categoryId
        this.getAttrList()
      }
    },
    async getAttrList() {
      let {category1Id, category2Id, category3Id} = this
      const res = await this.$API.attrs.getAListOfPlatformProperties123(category1Id, category2Id, category3Id)
      console.log(res);
      if (res.code === 200) {
        this.attrList = res.data
      }
    },


    showAddaAttrItem() {
      this.attrForm = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }

      this.isShowList = false
    },
    addAttrValue() {

      this.attrForm.attrValueList.push({
        attrId: this.attrForm.id,
        valueName: '',
        isEdit: true
      })
      this.$nextTick(() => {
          this.$refs[this.attrForm.attrValueList.length-1].focus()
      })
    },
    updateEditItem(row) {
      this.isShowList = false

      this.attrForm = cloneDeep(row)
      this.attrForm.attrValueList.forEach((item) => {
        this.$set(item, 'isEdit', false)
      })
    },
    toCheck(row) {
      let valueName = row.valueName
      if (!valueName.trim()) {
        row.valueName = ''
        this.$message.info('属性值不能为空')
        return
      }
      let isRepeat = this.attrForm.attrValueList.some((item) => {
        if (item !== row) {
          return item.valueName === valueName
        }
      })
      if (isRepeat) {
        this.$message.info('属性值不能重复')
        row.valueName = ''
        return
      }
      row.isEdit = false


    },
    checkAttrName(attr) {
      if (!attr.trim()) {
        attr = ''
        this.$message.info('属性名不能为空')
      }
    },
    toEdit(row, index){
      if(row.isEdit){
          row.isEdit = true
      }else {
        this.$set(row,'isEdit',true)
      }
      this.$nextTick(() => this.$refs[index].focus())
    },
    async saveAndSend(){
      //收集,整理参数
      let attr = this.attrForm
      attr.attrValueList = attr.attrValueList.filter((item) => {
          if(item.valueName!==''){
              delete item.isEdit
            return true
          }
      })
      if(attr.attrValueList.length===0){
          return
      }
      try {
        await this.$API.attrs.addOrEditPlatformProperty(attr)
        this.$message.success('保存成功')

        this.isShowList = true
        await this.getAttrList()
      }catch(error){
        /* this.$message.info('保存失败')*/
      }
    },
    async deleteAttrItem(row){
      try {
        await this.$API.attrs.deleteAPlatformPropertyBasedOnID(row.id)
        this.$message.success('删除成功')
        await this.getAttrList()
      }catch(error){
         this.$message.info('删除失败')
      }
    }
  }


}

</script>

<style scoped>

</style>
