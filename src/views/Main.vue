<template>
  <a-layout id="components-layout-demo-top-side-2">
    <the-header-view></the-header-view>
    <a-layout>
      <the-side-view></the-side-view>
      <a-layout style="padding: 0 24px 24px">

        <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, }"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import {defineComponent} from "vue";
import TheHeaderView from "@/components/the-header.vue";
import TheSideView from "@/components/the-side.vue";

export default defineComponent({
  components: {TheSideView, TheHeaderView},
  setup(){
    return{

    }
  },
})
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
#root,body,html {
  height: 100%;
}
.ant-layout {
  display: flex!important;
  width: 100%!important;
  min-height: 100%!important;
}
.container{
  height: 100%;
}
</style>
