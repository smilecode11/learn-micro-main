<template>
  <div class="main-container">
    <Header />
    <el-main>
      <Loading v-if="isLoading"/>
      <div id="micro-container" v-else>
        子应用内容
      </div>
    </el-main>
    <Footer />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";
export default defineComponent({
  name: "App",
  setup() {
    const isLoading = ref(true);

    setTimeout(() => (isLoading.value = false), 0);

    return {
      isLoading,
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
</style>
