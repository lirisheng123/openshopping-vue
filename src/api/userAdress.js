import request from '@/utils/request'

//根据userId获取用户的地址
export function fetchList(userId) {
    return request({
      url:'/userAddress/list/'+userId,
      method:'get'
    })
}

//根据Id获取用户的地址
export function select(id) {
    return request({
      url:'/userAddress/select/'+id,
      method:'get'
    })
}


//根据地址di来修改地址
export function update(id,params) {
    return request({
      url:'/userAddress/update/'+id,
      method:'post',
      data:params
    })
}

//添加用户的地址
export function create(params) {
    return request({
      url:'/userAddress/add',
      method:'post',
      data: params
    })
}


//根据id删除用户的地址
export function deleteAdress (id) {
    return request({
      url:'/userAddress/delete/'+id,
      method:'get'
    })
}



export function  selectedConfired(id,params) {
    return request({
      url:'/userAddress/updateDefaultFlag/'+id,
      method:'get',
      params:params
    })
}

//选择默认的地址Id
export function  selectDefaultByUserId(userId) {
  return request({
    url:'/userAddress/selectDefault/'+userId,
    method:'get'
  })
}