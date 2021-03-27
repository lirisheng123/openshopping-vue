import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/goodsCategory/list/'+parentId,
    method:'get',
    params:params
  })
}
export function deleteProductCate(id) {
  return request({
    url:'/goodsCategory/delete/'+id,
    method:'post'
  })
}

export function createProductCate(data) {
  return request({
    url:'/goodsCategory/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/goodsCategory/update/'+id,
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/goodsCategory/getItem/'+id,
    method:'get',
  })
}



export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

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

//删除某个分类的某个品牌
export function deleteCateBrand(id){
  return request({
    url:'/categoryGrand/delete/'+id,
    method:'get'
  })
}

//添加分类与品牌的关系
export function createCateGrand(data){
  return request({
    url:'/categoryGrand/create',
    method:'post',
    data:data
  })
}
