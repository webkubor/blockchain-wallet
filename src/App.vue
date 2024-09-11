
<template>
  <div>
    <router-view />
  </div>
</template>
<script  lang="ts" setup>
import {initModal} from "@/wallect/walletconnect";
initModal()
// initTheme()
</script>
<style lang="scss">
@import "./styles/index.scss";
</style>
