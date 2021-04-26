import request from '@/utils/request'
import prefixName from "./prefixName"



//多条件查询  elasticsearch
export function fetchProductList(data) {
  return request({
    url:prefixName.searchService+'/esProduct/search',
    method:'post',
    data:data
  })
}

//根据关键字来聚合filter选项
export function aggregationByKeyword(params) {
    return request({
      url:prefixName.searchService+'/esProduct/search/relate',
      method:'get',
      params:params
    })
  }


