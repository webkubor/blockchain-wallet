
<template>
    <router-view />
</template>
<script  lang="ts" setup>
import {initModal} from "@/wallect/walletconnect";
initModal()
</script>
<style lang="less">
@import "./styles/index.less";
</style>
