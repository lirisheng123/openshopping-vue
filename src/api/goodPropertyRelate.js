import request from '@/utils/request'
import prefixName from "./prefixName"

//商品服务

//查询googpropertyRelate
export function fetchList(id) {
  return request({
    url:prefixName.productService+'/goodsPropertyRelate/selectByGoodId/'+id,
    method:'get'
  })
}