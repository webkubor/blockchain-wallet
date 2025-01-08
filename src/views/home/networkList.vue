<template>
  <a-space direction="vertical" fill style="width: 80vw;">
      <a-descriptions :data="getWallect" bordered />
    <a-card title="钱包测试">
      <a-list :gridProps="{ gutter: 0, span: 12 }" :bordered="false">
        <a-list-item v-for="(item, index) in walletList" :index="index">
          <a-space direction="vertical" fill>
            <img v-if="item.title === 'metamask'" class="metamask-icon" src="@/assets/wallect/metamask.png"
              alt="metamask" />
            <img v-else class="metamask-icon" src="@/assets/wallect/wallectconnect.png" alt="wallectconnect" />
            <div class="title">
              <a-tag v-if="item.status" color="green">已连接</a-tag>
              <a-tag v-else color="red">未连接</a-tag>
            </div>
            <a-space fill>
              <a-button type="primary" @click="handleConnect(item.title)">
                connect
              </a-button>
              <a-button type="primary" @click="$router.push(item.infoUrl)">function </a-button>
            </a-space>
          </a-space>
        </a-list-item>

      </a-list>

    </a-card>
  </a-space>

</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useWallect } from "@/hooks/useWallect";
import { getMetamskConnect } from "@/wallect/metamask";
import { getContractInfo } from "@/utils/networks";
import { useWeb3Modal } from '@web3modal/ethers/vue'
const modal = useWeb3Modal()
const { chain, account, wallect, setType } = useWallect();

const getWallect = computed(() => {
  console.log(`output->getNetwork.value`, getNetwork.value, wallect)
  return [{
    label: '网络',
    value: getNetwork.value ? getNetwork.value.name : "暂无网络连接",
  }, {
    label: '区块链浏览器',
    value: getNetwork.value?.scanURL,
  }, {
    label: 'rpcUrl',
    value: getNetwork.value?.rpcUrl
  }, {
    label: 'chainId',
    value: chain?.id,
  }, {
    label: '账户',
    value: account?.value,
  }];

})


let getNetwork = computed(() => {
  if (chain?.id) {
    return getContractInfo(chain.id);
  }
  return null;
});


const walletList = ref([
  {
    title: 'metamask',
    account: '',
    loading: false,
    status: false,
    infoUrl: '/metamask'
  },
  {
    title: 'wallectconnect',
    account: '',
    loading: false,
    status: false,
    infoUrl: '/wallectconnect'
  }
])



async function handleConnect(title) {
  setType(title)
  let targetWallet = walletList.value.find(item => item.title === title)
  targetWallet.status = true
  targetWallet.loading = true
  if (title === 'metamask') {
    getMetamskConnect()
  } else {
    modal.open({ view: 'Networks' })
  }
}


</script>
<style lang="less" scoped>
.metamask-icon {
  height: 50px;
  background: rgb(224, 211, 207);
  padding: 10px;
  border-radius: 50%;
}
</style>