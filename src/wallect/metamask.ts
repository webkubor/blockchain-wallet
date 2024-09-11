/*
 * @Date: 2021-10-27 10:09:47
 * @LastEditTime: 2023-06-27 16:17:53
 * metamsk config
 */

import { transHash16 } from "@/utils/networks";
import { useWallect } from "@/hooks/useWallect";
import _ from "lodash";

const { setAccount, setChain, account } = useWallect();

const nativeMetamaskMap = [
  {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
  {
    chainId: "0x3",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
  },
  {
    chainId: "0x4",
    chainName: "Ropsten Testnet Network",
    nativeCurrency: {
      name: "Ropsten",
      symbol: "ROP",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.infura.io/v3/"],
    blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
  },
  {
    chainId: "0x80",
    chainName: "huobi Network",
    nativeCurrency: {
      name: "HT",
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: ["https://http-mainnet-node.huobichain.com"],
    blockExplorerUrls: ["https://hecoinfo.com"],
  },
  {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
  {
    chainId: "0x61",
    chainName: "BSC-Test-Network",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s2.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  {
    chainId: "0x539",
    chainName: "Local-Test-Network",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
  {
    chainId: "0xa86a",
    chainName: "Avalanche C-Chain",
    nativeCurrency: {
      name: "Avax",
      symbol: "avax",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc/"],
    blockExplorerUrls: ["https://snowtrace.io/"],
  },
];

/**
 * @description: switch or add rpcNetwork
 * @param {*} id chan_id（10）
 * @return {*}
 */
export async function switchNetwork(id) {
  if (id * 1 === 0) {
    window.$message?.info("chainId is 0");
    return;
  }
  let hashId = transHash16(id);
  let findChain = nativeMetamaskMap.find((v) => v.chainId === hashId);
  if (!findChain) {
    window.$message?.warning("The current website does not support the chainId:" + id)
    return;
  }
  if (id * 1 < 10) {
    await switchToEthereum(hashId);
  } else {
    await switchToOtherNetwork(findChain);
  }
}

function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    _listeningMetamsk();
    getChainId(); 
    console.log("moblie Ethereum successfully detected!");
  } else {
    delete localStorage.webkubor_metamask;
    setAccount(null);
    window.$message?.info("No metamsk wallet installation detected");
  }
}

export async function getMetamskConnect() {
  if (account.value ) {
    window.$message?.warning(`${account.value} 账号已连接`)
    return true
  }
   if (!window.ethereum) return false

    // PC端移动端
    window.provider = window.ethereum;
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      getChainId(); //获取chanid参数
      _listeningMetamsk();
    } catch (error) {
      console.log(error, "getMetamskConnect");
      window.$message?.warning(
        "Please authorize to access tour account on Metamsk"
      );
    }
 
  // 由于平台限制，移动提供程序可能要到页面生命周期的后期才会被注入
  window.addEventListener("ethereum#initialized", handleEthereum, {
    once: true,
  });
  setTimeout(handleEthereum, 3000); // 3 seconds
}

/**
 * @description: 获取chainid
 * @param {*}
 * @return {*}
 */
async function getChainId() {
  const { ethereum } = window;
  try {
    const chainId = await ethereum.request({
      method: "eth_chainId",
    });
    handleNewChain(chainId);
  } catch (err) {
    console.error(err);
  }
}

/**
 * @description:handleNewChain
 * @param {*} id
 * @return {*}
 */
async function handleNewChain(id) {
  let newId = Number(id).toString(10);
  window.$message?.success("网络登录成功")
  setChain({id: newId});
}

/**
 * @description: Switch to the primary network (may be deprecated in the future)
 * @param {*}
 * @return {*}
 */
async function switchToEthereum(id) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: id,
        },
      ],
    });
  } catch (error) {
    console.log(error, "wallet_switchEthereumChain");
  } finally {
  }
}

/**
 * @description: Switch to the rest of the network (mainly used)
 * @param {*} findChain
 * @return {*}
 */
async function switchToOtherNetwork(findChain) {
  const data = [];
  data.push(findChain);
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: data, // [{XXXXX}]  is Array
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
}


/**
 * @description: handelConnectInfo
 * @param {*} info
 * @return {*}
 */
function handelConnectInfo(info) {
  console.log(info, "handelConnectInfo");
}

/**
 * @description: handleDisConnect
 * @param {*} disconnect
 * @return {*}
 */
function handleDisConnect(disconnect) {
  console.log(disconnect, "handleDisConnect");
}

/**
 * @description: handleNewAccount
 * @param {*} account
 * @return {*}
 */
function handleNewAccount(account) {
  console.log(account[0], "账户已更新");
  setAccount(account[0]);
}

/**
 * @description: handelNewMessage
 * @param {*} msg
 * @return {*}
 */
function handelNewMessage(msg) {
  console.log(msg, "handelNewMessage");
}

/**
 * @description: monitor metamsk
 * @param {*}
 * @return {*}
 */
function _listeningMetamsk() {
  const { ethereum } = window;

  ethereum.on("chainChanged", handleNewChain);

  ethereum.on("accountsChanged", handleNewAccount);

  ethereum.on("message", handelNewMessage);

  ethereum.on("connect", _.throttle(handelConnectInfo, 1000));

  ethereum.on("disconnect", _.throttle(handleDisConnect, 1000));
}
