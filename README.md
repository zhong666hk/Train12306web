# web_train 12306项目

## 1.Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## 2.手机+验证码的登录方式
```text
    注册：开始--》输入输入手机号--》后端校验--》是否已经注册--》没有注册--》保存否则就生成验证码
    --》校验短信频繁保存短信记录表--》对接短信通道--》前端倒计时--》结束
    登录：如果手机号已经存在--》校验短信验证码更新状态--》生成JWT/Token--》结束
```
* 引入Axios 封装axios
```js
import axios from 'axios'
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
```
* 封装请求方法
```js
import {request} from "@/config/Axios";
//每一个请求都被封装为一个实例
export function getCode(mobile){
    //http://localhost:8090/api/
    return request({
        url: '/member/sendCode',
        method: 'POST',
        data: {
            mobile: mobile,
        }
    })
}

export function loginReq(mobile,code){
    //http://localhost:8090/api/
    return request({
        url: '/member/login',
        method: 'POST',
        data: {
            mobile: mobile,
            code: code
        }
    })
}
```
* Login.vue中代码的逻辑
  * 先获取验证码
  * 填写验证码->登录
```js
const sendCode = ()=>{
    getCode(loginForm.mobile).then(res => {
        notification.success({description:'验证码为'+res.data})
        loginForm.code=res.data
    }).catch(err=>{
        console.log(err);
    })
}

const login = () => {
    loginReq(loginForm.mobile,loginForm.code).then(res=>{
        console.log(res)
        if (res.code === 200){
            notification.success({description:res.message})
            router.push('/main')
        }else {
            notification.error({description:res.message})
        }
    }).catch(err=>{
        console.log(err)
    })
};
```
## 3.组件的开发管理页面
* the-header 头部
* the-side 左部导航栏
* center 中间主要部分
