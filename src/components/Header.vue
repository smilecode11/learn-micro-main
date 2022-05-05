<template>
  <el-header class="header">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in NAV_LIST"
        :key="index"
        :index="String(index)"
        >{{ item.name }}</el-menu-item
      >
    </el-menu>
  </el-header>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NAV_LIST } from "../const/nav";
export default defineComponent({
  name: "HeaderContainer",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const activeIndex = ref("0");

    const handleSelect = (index) => {
      if (index === activeIndex.value) return;
      router.push(NAV_LIST[Number(index)].url);
    };

    //  侦听路由改变, 初始化当前选择路由
    watch(
      route,
      (val) => {
        const currRouteIndex =
          NAV_LIST.findIndex((nav) => nav.url === val.fullPath) || 0;
        activeIndex.value = String(currRouteIndex);
      },
      {
        deep: true,
      }
    );

    return {
      NAV_LIST,
      activeIndex,
      handleSelect,
    };
  },
});
</script>

<style scoped>
.header {
  padding: 0;
}
</style>
