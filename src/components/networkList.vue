<template>
  <n-card title="区块链网络" hoverable v-if="getNetwork">
    <n-grid x-gap="12" y-gap="12" :cols="3">
      <n-gi>
        <n-space vertical>
        网络:
        <div>
          {{ getNetwork ? getNetwork.name : "暂无网络连接" }}
        </div>
          </n-space>
      </n-gi>
      <n-gi>
        <n-space vertical>
          logo
          <n-avatar round :size="30" :src="getNetwork?.logo" />
        </n-space>
      </n-gi>
      <n-gi>
        <n-space vertical>
          区块链浏览器
          <div>
            {{ getNetwork?.scanURL }}
          </div>
        </n-space>
      </n-gi>
      <n-gi>
        <n-space vertical>
          RPC
          <div>
            {{ getNetwork?.rpcUrl }}
          </div>
        </n-space>
      </n-gi>
      <n-gi>
        <n-space vertical>
          chainID
          <div>
          {{ chain?.id }}
          </div>
        </n-space>
      </n-gi>
    </n-grid>
  </n-card>

  <n-card title="钱包测试" :bordered="false">
    <n-list style="width: 100vw" bordered>
      <template #footer> 区块链钱包测试 </template>
      <n-list-item v-for="(item ,index) in walletList" :index="index">
        <template #prefix>
          <div class="title">{{item.title}}</div>
        </template>
        <template #suffix>
          <div class="content">
            <div class="account">
              当前连接账号：
              <div type="warning">
                {{item.account}}
              </div>
            </div>

            <div class="status">
              <span
                class="dot"
                :class="{ success: item.status }"
              ></span>
              {{ item.status ? "已连接" : "未连接" }}
            </div>
            <div class="actions">
              <button
                class="wallet-btn"
                strong
                :loading="item.loading"
                round
                @click="handleConnect(item.title)"
              >
                <template #icon>
                  <img
                  v-if="item.title === 'metamask'"
                    class="metamask-icon"
                    src="@/assets/wallect/metamask.png"
                    alt="metamask"
                  />
                  <img
                  v-else
                    class="metamask-icon"
                    src="@/assets/wallect/wallectconnect.png"
                    alt="wallectconnect"
                  />
                </template>
               {{item.title}}
              </button>
              <button
                strong
                secondary
                type="primary"
                @click="$router.push(item.infoUrl)"
                >进入功能API</button
              >
            </div>
          </div>
        </template>
      </n-list-item>
    </n-list>
  </n-card>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useWallect } from "@/hooks/useWallect";
import { getMetamskConnect } from "@/wallect/metamask";
// import { getWallectConnect } from "@/wallect/walletconnect.js";
import { getContractInfo } from "@/utils/networks";
// import { providers } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWeb3Modal } from '@web3modal/ethers/vue'
  // 4. Use modal composable
  const modal = useWeb3Modal()
const { chain, account, wallect ,setType} = useWallect();

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
<style lang="scss" scoped>
.network-title {
  font-weight: 600;
  font-size: 18px;
}

.title {
  width: 200px;
  font-weight: 600;
  font-size: 20px;
}
.content {
  width: 80vw;
  padding: 10px 0;
  align-items: center;
  display: flex;
  .account {
    flex: 1;
  }
  .status {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #666666;
      margin: 0 5px;
      display: block;
    }
    .success {
      background: #73d13d;
    }
  }
  .actions {
    flex: 1;
    display: flex;
    justify-content: space-between;
    .metamask-icon {
      height: 20px;
    }
    button {
      margin: 0 10px;
    }
  }
}
</style>
