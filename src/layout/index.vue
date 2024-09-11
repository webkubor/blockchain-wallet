<template>
   <router-view > </router-view>
</template>
<script  setup>
import {
  useMessage,
  useNotification,
  useLoadingBar,
  useDialog,
} from "naive-ui";
window.$message = useMessage();
window.$notification = useNotification();
window.$loadingBar = useLoadingBar();
window.$dialog = useDialog();

</script>