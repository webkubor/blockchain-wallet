<template>
  <div class="user-center">
    <n-space>
        <n-tag type="warning">当前连接账号:{{account}}</n-tag>
       <n-tag type="success">连接状态: {{wallect.isConnected ? "已连接": "未连接"}}</n-tag>
       <n-tag type="success">  {{ getNetwork ? getNetwork.name : "暂无网络连接" }}</n-tag>
    </n-space>
  
    <n-form ref="formRef" inline  size="large" style="margin-top: 30px;"  label-placement="left"
    label-width="auto">
      <n-form-item label="币种地址" path="address">
        <n-input autosize style="min-width: 250px" v-model:value="model.address" placeholder="输入币种地址" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="onSearch">
          查询地址
        </n-button>
      </n-form-item>
    </n-form>
    <div class="result">
        {{model.result}}

    </div>
  </div>

  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import { getContractInfo } from "@/utils/networks";
import {getMetamskConnect}  from "@/wallect/metamask"
import {useWallect} from "@/hooks/useWallect";

import {getBalanceOf, symbol} from "@/contract/erc20"

const {account, wallect, chain} = useWallect()
let formRef = ref(null);
const model = reactive({
  address: "0x29792d37915945987e9b83F7EA64FC924B527312",
  result:null
});

getMetamskConnect()
let getNetwork = computed(() => {
  if (chain?.id) {
    return getContractInfo(chain.id);
  }
  return null;
});
document.title ="Metamask"
function onSearch(e) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
    window.$message.loading("查询地址");
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
        let result  = await symbol(address, account.value)
        model.result =result 
        console.log(result, "fetchBalance");
    } catch (error) {
        console.log(error);
    }
}

async function fetchBalance(address) {
    try {
        let result  = await getBalanceOf(address, account.value)
        model.result =result 
        console.log(result, "fetchBalance");
    } catch (error) {
        console.log(error);
    }
}




</script>
<style lang="scss" scoped>
.user-center {
  height: 400px;
  width: 800px;
  margin: 10vw auto;
  padding: 20px;
  background: $card-color;
  border-radius: 12px;
}

.result {
    border: 3px dotted  #f5576c;
    width: 80%;
    margin: 0 auto ;
    height: 200px;
}
</style>
