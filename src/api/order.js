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