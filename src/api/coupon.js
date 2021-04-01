import request from '@/utils/request'


//根据userId来获取用户未使用,已使用,已过期的优惠卷
//0:未使用  1:已使用  2:已过期
export function fetchList(userId,params) {
    return request({
      url:'/couponHistory/listHistory/'+userId,
      method:'get',
      params:params
    })
}


//查用用户可使用的优惠卷
export function fetchAvailabelList(userId,params) {
  return request({
    url:'/couponHistory/getAvailableCoupon/'+userId,
    method:'get',
    params:params
  })
}


//领取优惠卷
export function getCoupon(userId,params) {
  return request({
    url:'/couponHistory/add/'+userId,
    method:'post',
    data:params
  })
}





