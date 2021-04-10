import request from '@/utils/request'
import qs from "qs"

//根据购物车id生成comfriedOrder
export function generateConfirmOrder (params) {
    return request({
      url:'/order/generateConfirmOrder',
      method:'get',
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    })
}   

//根据confiredOrder生成order
export function generateOrder (params) {
    return request({
      url:'/order/generateOrder',
      method:'post',
      data: params
    })
}   


//根据用户id获取订单
export function selectOrder (userId,params) {
  return request({
    url:'/order/list/'+userId,
    method:'get',
    params: params
  })
}  

//根据订单id获取订单
export function selectOrderById (id) {
  return request({
    url:'/order/select/'+id,
    method:'get'
  })
} 


//根据id更改用户订单的状态
export function updateOrderStatus (id,params) {
  return request({
    url:'/order/updateOrderStatus/'+id,
    method:'get',
    params: params
  })
}  



