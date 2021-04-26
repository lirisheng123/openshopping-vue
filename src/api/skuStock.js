import request from '@/utils/request'
import prefixName from "./prefixName"

//商品服务

//查询googproperty
export function fetchList(id,params) {
  return request({
    url:prefixName.productService+'/goodsProperty/list/'+id,
    method:'get',
    params:params
  })
}

//更新
export function update(pid,data) {
  return request({
    url:prefixName.productService+'/goodsProperty/updateList',
    method:'post',
    data:data
  })
}
