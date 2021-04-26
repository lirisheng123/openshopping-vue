import request from '@/utils/request'
import prefixName from "./prefixName"
import qs from "qs"

export function login(username,password) {
  let data={
    grant_type: 'password',
    client_id: 'client-app',
    client_secret: '123456',
    username,
    password
  }
  return request({
  url: '/auth/oauth/token',
    method: 'post',
    data: qs.stringify(data),
  
    //在浏览器中是以 formData方式发送数据,即进行url编码
    headers:{
      'Content-type': 'application/x-www-form-urlencoded'
    }

  })
 
}

export function getInfo() {
  return request({
    //url: prefixName.userService+ '/user/user/info',
  //  url: prefixName.userService+ 'admin/admin/user/info',
    url: prefixName.userService+ '/user/infoTest',
    method: 'get',
  })
}

// export function getInfo() {
//   return request({
//     url: '/admin/info',
//     method: 'get',
//   })
// }

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}
