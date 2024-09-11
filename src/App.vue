
<template>
  <n-config-provider
    :theme="local.theme"
    :theme-overrides="themeOverrides"
  >
    <n-notification-provider>
      <n-loading-bar-provider>
        <n-dialog-provider>
          <n-message-provider :max="1">
            <router-view />
             <n-global-style />
          </n-message-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
<script  setup>
import { useTheme } from "@/hooks/useTheme";
let { themeOverrides, local, initTheme } = useTheme();
initTheme()
</script>
<style lang="scss">
@import "./styles/index.scss";
</style>
