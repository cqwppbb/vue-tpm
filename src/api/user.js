import request from '@/utils/request'

export const userLoginService = (data) => request.post('/login', data)
export const userLogoutService = () => request.get('user/logout')

export const userRegisterService = (data) => request.post('/user/register', data)
export const userChangePasswordService = (data) => request.post('/user/changepassword', data)



// 获取用户基本信息
export const userGetInfoService = () => request.get('/user/userinfo')
