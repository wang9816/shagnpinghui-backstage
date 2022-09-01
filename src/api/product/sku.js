import Request from "@/utils/request";

export default {
  // get /admin/product/cancelSale/{skuId}
  cancelSale(skuId){
    return Request(`/admin/product/cancelSale/${skuId}`)
  },
  // delete /admin/product/deleteSku/{skuId}
  deleteSku(skuId){
    return Request.delete(`/admin/product/deleteSku/${skuId}`)
  },
  // get /admin/product/findBySpuId/{spuId}
  findBySpuId(skuId){
    return Request(`/admin/product/findBySpuId/${skuId}`)
  },
  // get /admin/product/getSkuById/{skuId}
  getSkuById(skuId){
    return Request(`/admin/product/getSkuById/${skuId}`)
  },
  // get /admin/product/inner/findSkuInfoByKeyword/{keyword}
  findSkuInfoByKeyword(keyword){
    return Request(`/admin/product/inner/findSkuInfoByKeyword/${keyword}`)
  },
  // post /admin/product/inner/findSkuInfoBySkuIdList
  findSkuInfoBySkuIdList(){
    return Request.post(`/admin/product/inner/findSkuInfoBySkuIdList`)
  },
  // get /admin/product/list/{page}/{limit}
  updateSkuPage(page,limit){
    return Request(`/admin/product/list/${page}/${limit}`)
  },
  // get /admin/product/onSale/{skuId}
  onSale(skuId){
    return Request(`/admin/product/onSale/${skuId}`)
  },
  // post /admin/product/saveSkuInfo
  saveSkuInfo(info){
    return Request.post(`/admin/product/saveSkuInfo`,info)
  },

// get /admin/product/spuImageList/{spuId}
   getSpuImageList(spuId){
    return Request.get(`/admin/product/spuImageList/${spuId}`)
   },

// get /admin/product/spuSaleAttrList/{spuId}
    getSpuSaleAttrList(spuId){
      return Request(`/admin/product/spuSaleAttrList/${spuId}`)
    },
// post /admin/product/updateSkuInfo
    updateSkuInfo(skuInfo){
      return Request.post(`/admin/product/updateSkuInfo`,skuInfo)
    }





}
