import request from '@/utils/requests'

export const PmPushService = (data) => request.get('/pm/pmpush/', {params: data})
export const PmPushUpdateService = (data) => request.put('/pm/pmpush/' + data.id + '/', data)
export const PmFinishRecordService = (data) => request.get('/pm/pmfinishrecord/', {params: data})
export const PmFininshRecordCreateService = (data) => request.post('/pm/pmfinishrecord/', data)
export const PmDataService = (data) => request.get('/pm/pmdata/', {params: data})
export const PmEditService = (data) => request.put('/pm/pmdata/edit/', data)
export const PmDeleteService = (data) => request.delete('/pm/pmdata/' + data.id + '/')
export const PmAddService = (data) => request.post('/pm/pmdata/add/', data)
export const PmModifyRecordService = (data) => request.get('/pm/pmmodifyrecord/', {params: data})
export const PmModifyRecordPostService = (data) => request.post('/pm/pmmodifyrecord/add/', data)




