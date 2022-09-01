import request from "@/utils/request";
export default {
  getCategory1(){
    return request(`/admin/product/getCategory1`)
  },
  getCategory2(category1Id){
    return request(`/admin/product/getCategory2/`+category1Id)
  },
  getCategory3(category2Id){
    return request(`/admin/product/getCategory3/${category2Id}`)
  },
}
