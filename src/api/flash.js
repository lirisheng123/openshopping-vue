import request from '@/utils/request'
import prefixName from "./prefixName"
import qs from "qs"

//分页获取秒杀单信息
export function fetchList(params) {
  return request({
    url:prefixName.activityService+'/flashPromotion/listAll',
    method:'get',
    params:params
  })
}

//更新状态
export function updateStatus(id,params) {
  return request({
    url:prefixName.activityService+'/flashPromotion/updateStatueById/'+id,
    method:'get',
    params:params
  })
}

//删除秒杀单
export function deleteFlash(params) {
  return request({
    url:prefixName.activityService+'/flashPromotion/delete/batch',
    method:'get',
    params:params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}

//创建秒杀单
export function createFlash(data) {
  return request({
    url:prefixName.activityService+'/flashPromotion/create',
    method:'post',
    data:data
  })
}

//更改秒杀单
export function updateFlash(id,data) {
  return request({
    url:prefixName.activityService+'/flashPromotion/update/'+id,
    method:'post',
    data:data
  })
}
//根据id获取秒杀单
export function selectById(id) {
  return request({
    url:prefixName.activityService+'/flashPromotion/select/'+id,
    method:'get'
   
  })
}


