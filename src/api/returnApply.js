import request from '@/utils/request'
import qs from "qs"

//生成退货单
export function generateOrderReturnApply (params) {
    return request({
      url:'/orderReturnApply/create',
      method:'post',
      data: params
    })
} 

//根据订单id获取退货单
export function selectOrderReturnApply (orderId)  {
    return request({
      url:'/orderReturnApply/selectOrder/'+orderId,
      method:'get'
    })
  }  