import request from "@/utils/request";

export default {
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
// attrInfoList
 getAListOfPlatformProperties123(category1Id,category2Id,category3Id){
   return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
 },

// delete /admin/product/deleteAttr/{attrId}
// deleteAttr
  deleteAPlatformPropertyBasedOnID(attrId){
   return request.delete(`/admin/product/deleteAttr/${attrId}`)
  },


// post /admin/product/saveAttrInfo
// saveAttrInfo
  addOrEditPlatformProperty(attr){
   return request.post(`/admin/product/saveAttrInfo`,attr)
  }

}
