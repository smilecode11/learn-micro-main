<template>
  <div class="loading-container">
    <el-icon class="is-loading">
      <loading />
    </el-icon>
  </div>
</template>

<script>
import { Loading } from "@element-plus/icons-vue";
export default {
  name: "LoadingContainer",
  components: {
    Loading,
  },
};
</script>

<style scoped>
.loading-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.is-loading{
    font-size: 32px;
}
</style>
