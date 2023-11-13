<template>
  <a-layout-header class="header">
    <div class="logo"/>
    <div style="float: right;color: white;">
      <span v-if="JSON.stringify(member)==='{}'">
        <router-link to="/">
          &nbsp; &nbsp;请登录
        </router-link>
      </span>
      <span v-else>
        您好:{{member.mobile}}&nbsp; &nbsp;
        <router-link to="/">
          退出登录
        </router-link>
      </span>
    </div>
    <a-menu
        v-model:selectedKeys="selectedKeys1"
        :style="{ lineHeight: '64px' }"
        mode="horizontal"
        theme="dark"
    >
      <a-menu-item key="1">nav 1</a-menu-item>
      <a-menu-item key="2">nav 2</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
import {defineComponent, ref} from "vue";
import store from "@/store";

export default defineComponent({
  name: "the-header-view",
  computed: {
  },
  setup() {
    let member=store.state.member
    return {
      selectedKeys1: ref(['2']),
      member,
    };
  },
})
</script>
<style scoped>

</style>
