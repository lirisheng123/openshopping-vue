import request from '@/utils/request'
import prefixName from "./prefixName"

//根据flashId获取secondProoery
export function fetchList(flashId) {
  return request({
    url:prefixName.activityService+'/secondProperty/selectByFlshId/'+flashId,
    method:'get'
  })
}

export function createFlashProductRelation(data) {
  return request({
    url:'/flashProductRelation/create',
    method:'post',
    data:data
  })
}
export function deleteFlashProductRelation(id) {
  return request({
    url:'/flashProductRelation/delete/'+id,
    method:'post'
  })
}

//批量更改secondPropery的属性
export function updateFlashProductRelation(data) {
  return request({
    url:prefixName.activityService+"/secondProperty/updateList",
    method:'post',
    data:data
  })
}
