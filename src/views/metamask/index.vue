<template>
  <div class="user-center">
    <a-form :model="model" :style="{width:'600px'}" auto-label-width @submit="onSearch">
      <a-form-item label="当前网络" >
        {{ getNetwork ? getNetwork.name : "暂无网络连接" }}
      </a-form-item>
      <a-form-item label="连接状态" >
        {{ wallect.isConnected ? "已连接" : "未连接" }}
      </a-form-item>
      <a-form-item label="当前连接账号" path="address">
        <a-input autosize style="min-width: 250px" :value="account" placeholder="当前连接账号" />
      </a-form-item>
      <a-form-item label="币种地址" path="address">
        <a-input autosize style="min-width: 250px" v-model:value="model.address" placeholder="输入币种地址" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">查询地址</a-button>
      </a-form-item>
    </a-form>
    <div class="result">
      {{ model.result }}
    </div>
  </div>

  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { getContractInfo } from "@/utils/networks";
import { getMetamskConnect } from "@/wallect/metamask"
import { useWallect } from "@/hooks/useWallect";

import { getBalanceOf, symbol } from "@/contract/erc20"

const { account, wallect, chain } = useWallect()
const model = reactive({
  address: "0x29792d37915945987e9b83F7EA64FC924B527312",
  result: null
});

getMetamskConnect()
let getNetwork = computed(() => {
  if (chain?.id) {
    return getContractInfo(chain.id);
  }
  return null;
});
document.title = "Metamask"
function onSearch(e) {
  formRef.value?.validate((errors) => {
    if (!errors) {
      window.$message?.loading("查询地址");
      fetchBalance(model.address)
      fetchName(model.address)
    } else {
      console.log(errors);
      window.$message.error("Invalid");
    }
  });
}

async function fetchName(address) {
  try {
    let result = await symbol(address, account.value)
    model.result = result
    console.log(result, "fetchBalance");
  } catch (error) {
    console.log(error);
  }
}

async function fetchBalance(address) {
  try {
    let result = await getBalanceOf(address, account.value)
    model.result = result
    console.log(result, "fetchBalance");
  } catch (error) {
    console.log(error);
  }
}




</script>
<style lang="less" scoped>
.user-center {
  height: 400px;
  width: 800px;
  margin: 10vw auto;
  padding: 20px;
  border-radius: 12px;
}

.result {
  border: 1px solid #d5cece;
  width: 80%;
  margin: 0 auto;
  height: 200px;
}
</style>
