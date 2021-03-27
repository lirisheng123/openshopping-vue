import request from '@/utils/request'
//查询googpropertyRelate
export function fetchList(id) {
  return request({
    url:'/goodsPropertyRelate/selectByGoodId/'+id,
    method:'get'
  })
}