import request from '@/utils/request'
import qs from "qs"
import prefixName from "./prefixName"

//订单服务

//生成退货单
export function generateOrderReturnApply (params) {
    return request({
      url:prefixName.orderService+'/orderReturnApply/create',
      method:'post',
      data: params
    })
} 

//根据订单id获取退货单
export function selectOrderReturnApply (orderId)  {
    return request({
      url:prefixName.orderService+'/orderReturnApply/selectOrder/'+orderId,
      method:'get'
    })
  }  