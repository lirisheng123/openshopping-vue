import request from "../utils/request";
import prefixName from "./prefixName"

//用户服务接口


export function GetUserIndex() {
  return request({
    url: prefixName.userService+'/user/list',
    method: 'get',
  })
}

export function GetFavorite(data){
  return request({
    url: prefixName.userService+'/User/GetFavorite',
    method: 'post',
    params: { data }
  })
}

export function DelFavorite(id){
  return request({
    url: prefixName.userService+'/User/DelFavorite',
    method: 'get',
    params: { id:id }
  })
}

export function GetAddressList(){
  return request({
    url: prefixName.userService+'/User/GetAddressList',
    method: 'get',
  })
}

export function GetAddressById(id){
  return request({
    url: prefixName.userService+'/User/GetAddressById',
    method: 'get',
    params: { id }
  })
}

export function SaveAddress(data){
  return request({
    url: prefixName.userService+'/User/SaveAddress',
    method: 'post',
    params: { data }
  })
}
export function DelAddress(data){
  return request({
    url: prefixName.userService+'/User/DelAddress',
    method: 'post',
    params: { data }
  })
}


export function GetCoupon(data){
  return request({
    url: prefixName.userService+'/User/GetCoupon',
    method: 'Post',
    params: { data }
  })
}

export function ExchangeCoupon(code){
  return request({
    url: prefixName.userService+'/User/ExchangeCoupon',
    method: 'Post',
    params: { code:code }
  })
}


  