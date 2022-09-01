<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">添加</el-button>

    <el-table

             :data="trademarkList"
              style="width: 100%; margin: 20px 0"
              border

    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
        align="center"

        >
      </el-table-column>
      <el-table-column
        property="date"
        label="品牌名称"
        prop="tmName"
        >
      </el-table-column>
      <el-table-column

        property="name"
        label="品牌LOGO"
        prop="logoUrl"
        >
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width: 60px;height: 60px;">
        </template>
      </el-table-column>
      <el-table-column
        property="address"
        label="操作"
        >
        <template slot-scope="{row,$index}">
          <el-button  @click="showEditDialog(row)" type="warning" icon="el-icon-edit" style="width: 80px;height: 40px;">编辑</el-button>
          <el-button  @click="deleteTradeItem(row)"  type="danger" icon="el-icon-delete" style="width: 80px;height: 40px;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


      <div class="block">
        <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes,total"
          :total="total">
        </el-pagination>
<!--
        add and edit dialog
-->
        <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
          <el-form :model="tmForm" style="width: 80%;" :rules="rules" ref="tmForm">
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">
              <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
              <el-upload
                class="avatar-uploader"
                action="http://gmall-h5-api.atguigu.cn/admin/product/fileUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              </el-form-item>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="okToModifyOrAdd">确 定</el-button>
          </div>
        </el-dialog>

      </div>
  </div>
</template>


<script>

export default {
  name:"",

  mounted() {
    this.getTradeMarkList()
  },
  methods: {
    handleSizeChange(val) {
        this.limit = val
      this.getTradeMarkList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getTradeMarkList()
    },
    async getTradeMarkList(){
         const res = await this.$API.trademark.getAPaginatedListOfBrands(this.page,this.limit)
          if(res.code===200){

            this.trademarkList = res.data.records
              this.total = res.data.total
          }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPGOrPNG = ['image/jpeg', 'image/png'].indexOf(file.type) >= 0
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGOrPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPGOrPNG && isLt2M;
    },
    showAddDialog(){
      this.dialogFormVisible = true

      this.tmForm.logoUrl=''
      this.tmForm.tmName=''
    },
    showEditDialog(trademarkList){


       this.tmForm={
        ...trademarkList
      }

      this.dialogFormVisible = true

    },
    okToModifyOrAdd(){
      //1,收集数据 2,整理参数 3,发送请求
      //整体校验
       this.$refs.tmForm.validate(async (valid) => {
        if (valid) {
          let trademark = this.tmForm
          console.log(trademark);
          let res
          if(trademark.id){
            res = await this.$API.trademark.updateTheBrand(trademark)
            console.log(trademark);
          }else {
            res = await this.$API.trademark.addABrand(trademark)
          }
          this.$message.success(res.message || '保存成功')
          this.dialogFormVisible=false

          await this.getTradeMarkList(trademark.id?this.page:1)
        } else {
          console.log('error submit!!');
          return false;
        }
      });



    },
    deleteTradeItem(row){
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$API.trademark.deleteTheBrandWithTheSpecifiedId(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'

          });
          await this.getTradeMarkList(this.trademarkList.length>1?this.page:this.page-1)
        }catch(error){
           alert(error.message || '删除失败')
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
  ,
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      page:1,
      limit:3,
      total:0,
      trademarkList:[],
      pagesize:3,
      dialogFormVisible:false,
      tmForm:{tmName:'',logoUrl:'',id:''},
      rules:{
        //表单验证规则对象:
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur'},
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change'}
          //自定义校验规则
        ],
        logoUrl: [
          { required: true, message: '请选择上传LOGO图片', trigger: 'change' }
        ],
      }

    };
  }

}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
