import { computed, reactive, ref } from "vue";
const chain = reactive({});
const account = ref("");

const wallect = reactive({
    isConnected: computed(() => {
      return chain.id && account.value ? true : false;
    }),
    type: "",
    defaultChainId: 97
  });

export function useWallect() {
      /**
   * @description: set accouny global
   * @param {*} val
   * @return {*}
   */
  function setAccount(val) {
    account.value = val ? val : "";
    console.log(account.value, "账户详情");
  }



  function setType(val) {
    wallect.type = val
  }

  /**
   * @description: setchain
   * @param {*} val
   * @return {*}
   */

  function setChain(val) {
    Object.assign(chain, val);
    console.log(chain, "setChain finfished");
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
  