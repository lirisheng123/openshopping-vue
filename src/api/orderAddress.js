import request from '@/utils/request'
import qs from "qs"

//根据订单id获取订单地址
export function selectorderAddress (id)  {
    return request({
      url:'/orderAddress/select/'+id,
      method:'get'
    })
  }  