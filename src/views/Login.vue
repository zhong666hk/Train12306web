<template>
  <div class="container" >
    <a-row>
      <a-col :span="8" :offset="8" class="loginMain">
        <h1 style="text-align: center">&nbsp;仔仔棒12306售票系统</h1>
        <a-form
            :model="loginForm"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            autocomplete="off"
        >
          <a-form-item
              label="Mobile"
              name="mobile"
              :rules="[{ required: true, message: '请输入手机号!' }]"
          >
            <a-input v-model:value="loginForm.mobile" placeholder="手机号"/>
          </a-form-item>

          <a-form-item
              label="Code"
              name="code"
              :rules="[{ required: true, message: '请输入验证码!' }]"
          >
            <a-input v-model:value="loginForm.code">
              <template #addonAfter>
                <a @click="sendCode">获取验证码</a>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 6, span: 12 }">
            <a-button @click="login" type="primary"  html-type="submit" style="width: 100%">登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>

    </a-row>
  </div>

</template>
<script>
import { defineComponent, reactive } from 'vue';
import {getCode, loginReq} from "@/API";
import {notification} from "ant-design-vue";
/**
 * useRouter --全局路由的管理--》路由的管理者
 * useRoute --当前路由  -->获取当前路由的信息
 */
import {useRouter} from "vue-router";
import store from "@/store";
export default defineComponent({
  name: "login-view",
  setup() {
    const router=useRouter()

    const loginForm = reactive({
      mobile: '16607211504',
      code: '',
    });

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
          store.commit("setMember",{token:res.data.token,mobile:loginForm.mobile})
          router.push('/welcome')
        }else {
          notification.error({description:res.message})
        }
      }).catch(err=>{
        console.log(err)
      })
    };

    return {
      loginForm,
      sendCode,
      login
    };
  },
});
</script>
<style scoped>
 .loginMain{
   margin-top: 10%;
   background: linear-gradient(to right, rgb(140, 203, 233) 10%, rgba(27, 201, 201, 0.8) 40%, rgba(26, 154, 224, 0.1) 70%);
   opacity: 0.7;
 }
</style>
