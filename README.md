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
## 4.单点登录的两种方式
### 4.1 token+redis的方式实现单点登录
* 1.校验用户名密码
* 2.每次登录都生成token每次都不一样
* 3.将token放入redis，以token为key，用户的信息为value
* 4.将token返回给前端
* 5.从header获取token
* 6.到redis中获取token的value
### 4.2 JWT单点登录的方式实现单点登录
* 1.校验用户名密码
* 2.每次都会生成token,每次也是都不一样
* 3.是根据自己的加密方式生成的token,token是有价值的
* 4.将token返回给前端
* 5.从header获取token
* 6.解密token校验用户信息  
**存在的问题**
```text
1.token被解密
    加盐值(密钥),每个项目的盐值不一样
2.token被拿到第三方使用
    限流  
```
* **加入vuex来作为全局变量**
```js
const routes = [
  {
    path: '/',
    name: 'login',
    component:()=>import('@/views/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component:()=>import('@/views/Main.vue'),
    meta: {
      loginRequire: true
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 路由登录拦截
router.beforeEach((to, from, next) => {
  // 要不要对meta.loginRequire属性做监控拦截
  if (to.matched.some(function (item) {
    console.log(item, "是否需要登录校验：", item.meta.loginRequire || false);
    return item.meta.loginRequire
  })) {
    const _member = store.state.member;
    console.log("页面登录校验开始：", _member);
    if (!_member.token) {
      console.log("用户未登录或登录超时！");
      notification.error({ description: "未登录或登录超时" });
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
```
**这里的路由拦截器就是当没有登录的时候，根据路劲来访问页面，实现一个页面的跳转到登录页面的功能**
