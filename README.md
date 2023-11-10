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
