import request from '@/utils/request'

//获取用户的购物车清单
export function fetchShopList(userId) {
    return request({
      url:'/shoppingCartItem/list/'+userId,
      method:'get'
    })
  }

//删除购物车商品
export function deleteShoppingCart(userId,params) {
    return request({
        url:'/shoppingCartItem/delete/'+userId,
        method:'get',
        params:params
    })
}

//清空购物车
export function clearShopCart(userId) {
    return request({
        url:'/shoppingCartItem/clear/'+userId,
        method:'get'
    })
}

//添加商品到购物车中
export function createShoppingCart(data) {
    return request({
        url:'/shoppingCartItem/add',
        method:'post',
        data:data
    })
}




// export function updateProductCate(id,data) {
//     return request({
//         url:'/goodsCategory/update/'+id,
//         method:'post',
//         data:data
//     })
// }