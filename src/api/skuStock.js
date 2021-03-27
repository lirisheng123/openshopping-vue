import request from '@/utils/request'
//查询googproperty
export function fetchList(id,params) {
  return request({
    url:'/goodsProperty/list/'+id,
    method:'get',
    params:params
  })
}

//更新
export function update(pid,data) {
  return request({
    url:'/goodsProperty/updateList',
    method:'post',
    data:data
  })
}
