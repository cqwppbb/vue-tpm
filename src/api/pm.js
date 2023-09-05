import request from '@/utils/request'

export const PmPushService = (data) => request.post('/pm/push', data)
export const PmDataService = (data) => request.post('/pm/data', data)
export const PmUpdateDataService = () => request.post('/pm/update')

export const PmConfirmService = (data) => request.post('/pm/confirm', data)
export const PmEditService = (data) => request.post('/pm/edit', data)
export const PmDeleteService = (data) => request.post('/pm/delete', data)
export const PmAddService = (data) => request.post('/pm/add', data)


export const EditPmService = (data) => request.put('/my/cate/info', data)
export const artDelChannelService = (id) => request.delete('/my/cate/del', {
    params: {id}
})

export const artGetListService = (params) => request.get('/my/article/list', {
    params
})

// 文章：添加文章
// 注意：data需要是一个formData格式的对象
export const artPublishService = (data) => request.post('/my/article/add', data)

// 文章：获取文章详情
export const artGetDetailService = (id) => request.get('/my/article/info', {
    params: {id}
})

// 文章：编辑文章接口
export const artEditService = (data) => request.put('/my/article/info', data)

// 文章：删除文章接口
export const artDelService = (id) => request.delete('/my/article/info', {params: {id}})
