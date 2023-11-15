<template>
  <a-layout-header class="header">
    <div class="logo"/>
    <div style="float: right;color: white;">
      <span v-if="JSON.stringify(member)==='{}'">
        <router-link to="/login">
          &nbsp; &nbsp;请登录
        </router-link>
      </span>
      <span v-else >
        您好:{{member.mobile}}&nbsp; &nbsp;
        <span @click="store.commit('clearMember')">
          <router-link to="/login">
          退出登录
        </router-link>
        </span>
      </span>
    </div>
    <a-menu
        v-model:selectedKeys="selectedKeys1"
        :style="{ lineHeight: '64px' }"
        mode="horizontal"
        theme="dark"
    >
      <a-menu-item key="/welcome">
        <router-link to="/welcome">
          <HomeOutlined />&nbsp;欢迎
        </router-link>
      </a-menu-item>
      <a-menu-item key="/passenger">
        <router-link to="/passenger">
          <UserOutlined />&nbsp;乘车人管理
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
import {defineComponent, ref, watch} from "vue";
import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: "the-header-view",
  computed: {
    store() {
      return store
    }
  },
  setup() {
    let member=store.state.member
    const selectedKeys1=ref([]);
    // 监听当前的path路劲的变化,变化了就更改值 v-model
    watch(()=>router.currentRoute.value.path,(newValue)=>{
      console.log('watch',newValue);
      selectedKeys1.value=[];
      selectedKeys1.value.push(newValue);
    },{immediate:true})

    return {
      selectedKeys1,
      member,
    };
  },
})
</script>
<style scoped>

</style>
