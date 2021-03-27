import request from '@/utils/request'
//查看某个分类的参数
export function fetchList(cid,params) {
  return request({
    url:'/categoryParam/list/'+cid,
    method:'get',
    params:params
  })
}

//删除分类的某个参数
export function deleteProductParam(id) {
  return request({
    url:'/categoryParam/deleteItem/'+id,
    method:'get'
  })
}

//添加分类的参数
export function createProductParam(data) {
  return request({
    url:'/categoryParam/create',
    method:'post',
    data:data
  })
}
