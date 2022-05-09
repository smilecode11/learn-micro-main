<template>
  <div class="main-container">
    <Header v-show="headerStatus" />
    <el-main>
      <Loading v-show="isLoading" />
      <div id="micro-container" v-show="!isLoading">子应用内容</div>
    </el-main>
    <Footer v-show="footerStatus" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";
import { loading, footer, header } from "./store/index";
export default defineComponent({
  name: "App",
  setup() {
    return {
      isLoading: loading.loadingRef,
      headerStatus: header.headerStatus,
      footerStatus: footer.footerStatus,
    };
  },
  components: {
    Header,
    Footer,
    Loading,
  },
});
</script>

<style>
@import url("./assets/base.css");

.main-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container /deep/ .el-main {
  padding: 0;
}
</style>
