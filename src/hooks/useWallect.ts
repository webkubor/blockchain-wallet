import { computed, reactive, ref } from "vue";

// 定义 Chain 类型
interface Chain {
  id?: number;
  name?: string;
  [key: string]: any;
}

// 定义钱包类型，只支持 Metamask 和 WalletConnect
type WalletType = "metamask" | "walletconnect";

// 创建响应式数据
const chain = reactive<Chain>({});
const account = ref<string>("");

const wallect = reactive({
  isConnected: computed(() => {
    return chain.id && account.value ? true : false;
  }),
  type: "" as WalletType | "",  // 类型设定
  defaultChainId: 97
});

export function useWallect() {
  /**
   * @description: 设置全局账户
   * @param {string} val
   * @return {void}
   */
  function setAccount(val: string | null): void {
    account.value = val || "";
    console.log(account.value, "账户详情");
  }

  /**
   * @description: 设置钱包类型
   * @param {WalletType} val
   * @return {void}
   */
  function setType(val: WalletType): void {
    wallect.type = val;
  }

  /**
   * @description: 设置链信息
   * @param {Chain} val
   * @return {void}
   */
  function setChain(val: Partial<Chain>): void { // Partial 允许部分属性更新
    Object.assign(chain, val);
    console.log(chain, "setChain finished");
  }

  return {
    wallect,
    account,
    setType,
    setChain,
    setAccount,
    chain
  };
}
