
<template>
  <n-config-provider
    :theme="local.theme"
    :theme-overrides="themeOverrides"
  >
    <n-notification-provider>
      <n-loading-bar-provider>
        <n-dialog-provider>
          <n-message-provider :max="1">
             <n-global-style />
          </n-message-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
<script  lang="ts" setup>
import { useTheme } from "@/hooks/useTheme";
import {initModal} from "@/wallect/walletconnect";
let { themeOverrides, local, initTheme } = useTheme();
initModal()
initTheme()
</script>
<style lang="scss">
@import "./styles/index.scss";
</style>
