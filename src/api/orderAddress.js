import request from '@/utils/request'
import qs from "qs"
import prefixName from "./prefixName"

//订单服务

//根据订单id获取订单地址
export function selectorderAddress (id)  {
    return request({
      url:prefixName.orderService+'/orderAddress/select/'+id,
      method:'get'
    })
  }  