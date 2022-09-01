import Request from "@/utils/request";

export default {

// get /admin/product/baseSaleAttrList
// getBaseSaleAttrList
  getBaseSaleAttrList(){
    return Request('/admin/product/baseSaleAttrList')
  },
// delete /admin/product/deleteSpu/{spuId}
// deleteSpu
  deleteSpu(spuId){
    return Request.delete(`/admin/product/deleteSpu/${spuId}`)
  },
// get /admin/product/findSpuInfoByKeyword/{keyword}
// findSpuInfoByKeyword
  findSpuInfoByKeyword(keyword){
    return Request(`/admin/product/findSpuInfoByKeyword/${keyword}`)
  },
// get /admin/product/getSpuById/{spuId}
// 获取spu基本信息
  getSpuById(spuId){
    return Request(`/admin/product/getSpuById/${spuId}`)
  },
// post /admin/product/inner/findSpuInfoBySpuIdList
// findSpuInfoBySpuIdList
  findSpuInfoBySpuIdList(){
    return Request.post(`/admin/product/inner/findSpuInfoBySpuIdList`)
  },
// post /admin/product/saveSpuInfo
// saveSpuInfo
  saveSpuInfo(spuInfo){
    return Request.post(`/admin/product/saveSpuInfo`,spuInfo)
  },
// post /admin/product/updateSpuInfo
// 更改spu信息
  updateSpuInfo(spuInfo){
    return Request.post(`/admin/product/updateSpuInfo`,spuInfo)
  },
// get /admin/product/{page}/{limit}
  updateSpuPage(page,limit,category3Id){
    return Request({url: `/admin/product/${page}/${limit}`, params: {category3Id}})
  }







}
