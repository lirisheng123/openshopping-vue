import request from '@/utils/request'
import prefixName from "./prefixName"

//用户接口服务

//根据userId获取用户的地址
export function fetchList(userId) {
    return request({
      url:prefixName.userService+'/userAddress/list/'+userId,
      method:'get'
    })
}

//根据Id获取用户的地址
export function select(id) {
    return request({
      url: prefixName.userService+'/userAddress/select/'+id,
      method:'get'
    })
}


//根据地址di来修改地址
export function update(id,params) {
    return request({
      url:prefixName.userService+'/userAddress/update/'+id,
      method:'post',
      data:params
    })
}

//添加用户的地址
export function create(params) {
    return request({
      url:prefixName.userService+'/userAddress/add',
      method:'post',
      data: params
    })
}


//根据id删除用户的地址
export function deleteAdress (id) {
    return request({
      url:prefixName.userService+'/userAddress/delete/'+id,
      method:'get'
    })
}



export function  selectedConfired(id,params) {
    return request({
      url:prefixName.userService+'/userAddress/updateDefaultFlag/'+id,
      method:'get',
      params:params
    })
}

//选择默认的地址Id
export function  selectDefaultByUserId(userId) {
  return request({
    url:prefixName.userService+'/userAddress/selectDefault/'+userId,
    method:'get'
  })
}