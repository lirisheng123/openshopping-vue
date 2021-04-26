import request from '@/utils/request'
import qs from "qs"
import prefixName from "./prefixName"

//根据购物车id生成comfriedOrder
export function generateConfirmOrderByCartIds (params) {
    return request({
      url:prefixName.orderService+'/order/generateConfirmOrderByCartIds',
      method:'get',
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    })
}   

//根据商品信息生成comfriedOrder
export function generateConfirmOrderByGoodProperty (data) {
  return request({
    url:prefixName.orderService+'/order/generateConfirmOrderByGoodProperty',
    method:'post',
    data: data
   
  })
}  


//根据confiredOrder生成order
export function generateOrder (params) {
    return request({
      url:prefixName.orderService+'/order/generateOrder',
      method:'post',
      data: params
    })
}   


//根据用户id获取订单
export function selectOrder (userId,params) {
  return request({
    url:prefixName.orderService+'/order/list/'+userId,
    method:'get',
    params: params
  })
}  

//根据订单id获取订单
export function selectOrderById (id) {
  return request({
    url:prefixName.orderService+'/order/select/'+id,
    method:'get'
  })
} 


//根据id更改用户订单的状态
export function updateOrderStatus (id,params) {
  return request({
    url:prefixName.orderService+'/order/updateOrderStatus/'+id,
    method:'get',
    params: params
  })
}  



