import request from '@/utils/request'
import prefixName from "./prefixName"



//获取基于用户推荐的商品
export function fetchList(userId,params) {
  return request({
    url:prefixName.recommendService+'/recommend/getRecommendGoodInfo/'+userId,
    method:'get',
    params:params
  })
}