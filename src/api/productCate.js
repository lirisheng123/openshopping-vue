import request from '@/utils/request'
export function fetchList(parentId,params) {
  
  //根据父类id来获取子类id
  return request({
    url:'/goodsCategory/list/'+parentId,
    method:'get',
    params:params
  })
}

//根据id获取分类
export function getProductCate(id) {
  return request({
    url:'/goodsCategory/getItem/'+id,
    method:'get'
  })
}

//获取所有的父类和对应的子类
export function fetchListWithChildren() {
  return request({
    url:'/goodsCategory/list/withChildren',
    method:'get'
  })
}


//查看该分类所有的品牌
export function fetchBrandListByCateId(id) {
  return request({
    url:'/categoryGrand/list/'+id,
    method:'get'
  })
}

//获取该分类的所有参数
export function fetchParamsByCateId(id) {
  return request({
    url:'/categoryGrand/list/'+id,
    method:'get'
  })
}


