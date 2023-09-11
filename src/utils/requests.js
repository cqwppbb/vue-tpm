// requests.ts 文件中
// import { Message } from "element-ui";
/****   request.js   ****/
// 导入axios
import axios from "axios";
import {useUserStore} from '@/stores'
import {ElMessage} from 'element-plus'
// import router from '@/router'
// 使用element-ui Message做消息提醒
//1. 创建新的axios实例，
const baseURL = "http://10.64.36.17:8002/"
// const baseURL = "http://localhost:8000/"

const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL,
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 3 * 1000,
});
// 2.请求拦截器
service.interceptors.request.use(
    (config) => {
        //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
        // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
        // config.headers = {
        //   "Content-Type": "application/x-www-form-urlencoded", //配置请求头
        // };
        //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
        const token = useUserStore().token; //这里取token之前，你肯定需要先拿到token,存一下
        if (token) {
            //   config.params = { token: token }; //如果要求携带在参数中
            config.headers = {

                // 需要根据 DRF 提供的 JWT 认证来携带Token，前缀也可以是其它的

                Authorization: "JWT " + token,
            }; //如果要求携带在请求头中
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3.响应拦截器
service.interceptors.response.use(
    (response) => {
        //接收到响应数据并成功后的一些共有的处理，关闭loading等
        return response;
    },
    (error) => {
        /***** 接收到异常响应的处理开始 *****/
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            switch (error.response.status) {
                case 400:
                    ElMessage.error("错误请求")
                    // error.message = "错误请求";
                    break;
                case 401:
                    ElMessage.error("未授权，请重新登录")
                    // error.message = "未授权，请重新登录";
                    break;
                case 403:
                    ElMessage.error("拒绝访问")
                    // error.message = "拒绝访问";
                    break;
                case 404:
                    ElMessage.error("请求错误,未找到该资源")
                    // error.message = "请求错误,未找到该资源";
                    // window.location.href = "/NotFound";
                    break;
                case 405:
                    ElMessage.error("请求方法未允许")
                    error.message = "请求方法未允许";
                    break;
                case 408:
                    ElMessage.error("请求超时")
                    // error.message = "请求超时";
                    break;
                case 500:
                    ElMessage.error("服务器端出错")
                    // error.message = "服务器端出错";
                    break;
                case 501:
                    ElMessage.error("网络未实现")
                    // error.message = "网络未实现";
                    break;
                case 502:
                    ElMessage.error("网络错误")
                    // error.message = "网络错误";
                    break;
                case 503:
                    ElMessage.error("服务不可用")
                    // error.message = "服务不可用";
                    break;
                case 504:
                    ElMessage.error("网络超时")
                    // error.message = "网络超时";
                    break;
                case 505:
                    ElMessage.error("http版本不支持该请求")
                    // error.message = "http版本不支持该请求";
                    break;
                default:
                    ElMessage.error(`连接错误${error.response.status}`)
                // error.message = `连接错误${error.response.status}`;
            }
        } else {
            // 超时处理
            if (JSON.stringify(error).includes("timeout")) {
                console.log("服务器响应超时，请刷新当前页");
            }
            ElMessage.error("连接服务器失败")
            // error.message = "连接服务器失败!";
        }
        // 可以配合Element-plus来提示相关信息
        // ELMessage.error(error.message);
        /***** 处理结束 *****/
        //如果不需要错误处理，以上的处理过程都可省略
        // return Promise.resolve(error.response);
        console.log(error.message);
        return Promise.reject(error);
    }
);
//4.导入文件
export default service;
export {baseURL}
