import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useWallect } from "@/hooks/useWallect";
import { reactive } from "vue";
const { setAccount, setChain } = useWallect();

export const walletconnect = reactive({
  connector: null,
});

/**
 * @description: getWallectConnect
 * @param {*}
 * @return {*}
 */
export async function getWallectConnect() {
  // bridge url
  const bridge = "https://bridge.walletconnect.org";

  // create new connector
  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

  walletconnect.connector = connector;
  // check if already connected
  if (!connector.connected) {
    // 连接到钱包
    await connector.createSession();
  }

  // subscribe to events
  await subscribeToEvents();
}

/**
* @description: 处理链接状态
* @param {*} payload
* @return {*}
*/
export async function onConnect(payload) {
  const { chainId, accounts } = payload.params[0];
  const address = accounts[0];
  window.$message?.success("WalletConnect successed!");
  setAccount(address);
  setChain(chainId);
}


const subscribeToEvents = () => {
  const { connector } = walletconnect;

  if (!connector) {
    return;
  }

  connector.on("session_update", async (error, payload) => {
    console.log(`wallect connector.on("session_update")`, payload);
    if (error)  throw error;
    const { chainId, accounts } = payload.params[0];
    onSessionUpdate(accounts, chainId);
  });

  // 监听钱包连接事件
  connector.on("connect", (error, payload) => {
    console.log(`wallect connector.on("connect")`);

    if (error) {
      throw error;
    }

    onConnect(payload);
  });

  connector.on("disconnect", (error, payload) => {
    console.log("%c%s", "color: #ffa640", payload);
    Message.warning("WalletConnect disconnect");

    if (error) {
      throw error;
    }

    onDisconnect();
  });

  if (connector.connected) {
    const { chainId, accounts } = connector;
    onSessionUpdate(accounts, chainId);
  }
  walletconnect.connector = connector;
};

/**
 * @description: 处理断开链接
 * @param {*}
 * @return {*}
 */

const onDisconnect = () => {
  if (walletconnect.connector) {
    walletconnect.connector.killSession();
    walletconnect.connector = null;
  }
};

const onSessionUpdate = async (accounts, chainId) => {
  const address = accounts[0];
  setAccount(address);
  setChain(chainId);
};
