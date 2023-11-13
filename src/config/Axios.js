import axios from 'axios'
import store from "@/store";
export function request(config) {
    // 创建axios的实例
    const instance = axios.create({
        baseURL: 'http://localhost:8090/api/',
        timeout: 10000
    })
        // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        console.log('请求参数')
        console.log(config)
        const token=store.state.member.token;
        if (token){
            config.headers.token=token;
            console.log("请求的token为:",token)
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        console.log('返回结果')
        console.log(response)
        return response.data;
    }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    // 发送真正的网络请求
    return instance(config);
}
