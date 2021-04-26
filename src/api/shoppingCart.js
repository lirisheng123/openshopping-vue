import request from '@/utils/request'
import prefixName from "./prefixName"


//订单服务中接口


//获取用户的购物车清单
export function fetchShopList(userId) {
    return request({
      url:prefixName.orderService+'/shoppingCartItem/list/'+userId,
      method:'get'
    })
  }

//删除购物车商品
export function deleteShoppingCart(userId,params) {
    return request({
        url:prefixName.orderService+'/shoppingCartItem/delete/'+userId,
        method:'post',
        data:params
    })
}

//清空购物车
export function clearShopCart(userId) {
    return request({
        url:prefixName.orderService+'/shoppingCartItem/clear/'+userId,
        method:'get'
    })
}

//添加商品到购物车中
export function createShoppingCart(data) {
    return request({
        url:prefixName.orderService+'/shoppingCartItem/add',
        method:'post',
        data:data
    })
}

//修改购物中商品的数量
export function updateQuantity(id,params) {
    return request({
        url:prefixName.orderService+'/shoppingCartItem/update/quantity/'+id,
        method:'get',
        params:params
    })
}




// export function updateProductCate(id,data) {
//     return request({
//         url:'/goodsCategory/update/'+id,
//         method:'post',
//         data:data
//     })
// }