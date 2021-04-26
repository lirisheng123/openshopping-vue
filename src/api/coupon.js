import request from '@/utils/request'
import prefixName from "./prefixName"

//订单服务

//根据userId来获取用户未使用,已使用,已过期的优惠卷
//0:未使用  1:已使用  2:已过期
export function fetchList(userId,params) {
    return request({
      url:prefixName.orderService+'/couponHistory/listHistory/'+userId,
      method:'get',
      params:params
    })
}


//查用用户可使用的优惠卷
export function fetchAvailabelList(userId,params) {
  return request({
    url:prefixName.orderService+'/couponHistory/getAvailableCoupon/'+userId,
    method:'get',
    params:params
  })
}


//领取优惠卷
export function getCoupon(userId,params) {
  return request({
    url:prefixName.orderService+'/couponHistory/add/'+userId,
    method:'get',
    params:params
  })
}


//分页查询商城所有没有过期的优惠劵
export function getAllShopCoupon(params) {
  return request({
    url:prefixName.orderService+'/coupon/list',
    method:'get',
    params:params
  })
}






