import request from "@/utils/request";

export default {
  /*
    获取品牌分页列表
      GET /admin/product/baseTrademark/{page}/{limit}
    获取所有品牌列表
      GET /admin/product/baseTrademark/getTrademarkList
    */
  getAPaginatedListOfBrands(page,limit){
      return request(`/admin/product/baseTrademark/${page}/${limit}`)
  },
  /*
  删除指定id的品牌
    DELETE /admin/product/baseTrademark/remove/{id}
  */
  deleteTheBrandWithTheSpecifiedId(id){
    return request.delete(`/admin/product/baseTrademark/remove/${id}`)
  },
  /*
添加品牌
  POST /admin/product/baseTrademark/save
  trademark: 没有id的品牌对象
*/
  addABrand(trademark){
    return request.post(`/admin/product/baseTrademark/save`,trademark)
  },
  /*
  更新品牌
  PUT /admin/product/baseTrademark/update
  trademark: 有id的品牌对象
  */
  updateTheBrand(trademark){
    return request.put(`/admin/product/baseTrademark/update`,trademark)
  },

  /*
  *
  * */

  getTrademarkList(){
    return request(`/admin/product/baseTrademark/getTrademarkList`)
  }


}
