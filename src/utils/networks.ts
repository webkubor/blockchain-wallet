import _ from "lodash";

/**
 * @description:转化hash 16进制
 * @param {*} number
 * @return {*}
 */
export function transHash16(number) {
  number = number * 1;
  if (!_.isNumber(number)) {
    throw "args  is  not  a  number";
  }
  return "0x" + number.toString(16);
}

/**
 * @description: contract config
 * @param {*}
 * @return {*}
 */
export const contractMap = {
  1: {
    name: "以太坊 Ethereum 主网络",
    chainId: 1,
    gasToken: "ETH",
    scanURL: "https://etherscan.io",
    rpcUrl: "https://mainnet.infura.io/v3/",
    logo: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_ethereum.jpg&w=32&q=75",
    tokenStandard: "ERC20",
  },
  3: {
    name: "Ropsten",
    chainId: 3,
    scanURL: "https://ropsten.etherscan.io",
    rpcUrl:"https://rpc.ankr.com/eth_ropsten",
    gasToken: "ETH",
    tokenStandard: "ERC20",
    logo: "https://defipay-test.oss-cn-hangzhou.aliyuncs.com/defipay_v_1.0/e5859befc7d448248e21dfd59f75e335.jpg",
  },
  4: {
    name: "Rinkeby",
    chainId: 4,
    dexUrl: "https://app.uniswap.org/#",
    scanURL: "https://rinkeby.etherscan.io",
    rpcURL: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/",
    gasToken: "ETH",
    tokenStandard: "ERC20",
    infuraKey: "9aa3d95b3bc440fa88ea12eaa4456161",
    infuraName: "rinkeby",
    logo: "https://defipay-test.oss-cn-hangzhou.aliyuncs.com/defipay_v_1.0/e5859befc7d448248e21dfd59f75e335.jpg",
  },
  5: {
    name: "Goerli",
    chainId: 1,
    scanURL: "",
    gasToken: "ETH",
    tokenStandard: "ERC20",
  },
  42: {
    name: "Kovan",
    chainId: 1,
    scanURL: "",
    gasToken: "ETH",
    tokenStandard: "ERC20",
  },
  66: {
    name: "OEC",
    chainId: 66,
    scanURL: "",
    gasToken: "OKT",
    tokenStandard: "ORC20",
  },
  128: {
    name: "Huobi ECO Chain Mainnet",
    chainId: 128,
    logo: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_heco.jpg&w=32&q=75",
    scanURL: "https://hecoinfo.com",
    rpcURL: "https://http-mainnet.hecochain.com",
    gasToken: "HT",
    tokenStandard: "HRC20",
  },
  97: {
    name: "BSC-Test",
    chainId: 97,
    gasToken: "BNB",
    logo: "https://defipay-test.oss-cn-hangzhou.aliyuncs.com/defipay_v_1.0/0e65aef0b68a4990a6c92ca43f89d052.jpg",
    tokenStandard: "BEP20",
    rpcURL: "https://data-seed-prebsc-2-s2.binance.org:8545/",
    scanURL: "https://testnet.bscscan.com",
    multicall: "0xc8aeA8381c6679Ac49E7e7ff638aEe10c6Ff3122",
  },
  250: {
    name: "Fantom Opera",
    gasToken: "FTM",
    logo: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_fantom.jpg&w=32&q=75",
    chainId: 250,
    scanURL: "https://ftmscan.com",
    rpcUrl: "https://rpcapi.fantom.network"
  },
  56: {
    name: "Binance Smart Chain",
    gasToken: "BNB",
    tokenStandard: "BEP20",
    chainId: 56,
    scanURL: "http://testnet.bscscan.com",
    rpcURL: "https://bsc-dataseed.binance.org",
    logo: "https://defipay-test.oss-cn-hangzhou.aliyuncs.com/defipay_v_1.0/0e65aef0b68a4990a6c92ca43f89d052.jpg",
  },
  1284: {
    name: "Moonbeam",
    gasToken: "Moonbeam",
    logo: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_moonbeam.jpg&w=32&q=75",
    scanURL: "https://moonbeam.moonscan.io",
    rpcURL: "https://rpc.api.moonbeam.network",
    chainId: 1284,
  },
  42220: {
    name: "Celo Mainnet",
    gasToken: "CELO",
    logo: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_celo.jpg&w=32&q=75",
    scanURL: "https://explorer.celo.org",
    rpcURL: "https://forno.celo.org",
    chainId: 42220,
  },
};

/**
 * @description: 获取合约信息
 * @param {*} chainId
 * @return {*}
 */
export function getContractInfo(chainId) {
  return contractMap[chainId] || {};
}
