<template>
    <div class="page">
      <NetworkList/>
      <router-link to="/monitor" class="monitor-link">
        进入监控面板
      </router-link>
    </div>
  </template>
  <script setup>
    import NetworkList from "./networkList.vue"
  
  </script>
  <style lang="less" scoped>
  .page {
    font-size: 20px;
    padding: 20vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .monitor-link {
    padding: 12px 24px;
    background-color: #409eff;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: #66b1ff;
    }
  }
  </style>
