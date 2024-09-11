import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '03f322eee16407763efee683e68781c4'
// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create your application's metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://webkubor.github.io/shares/#/home', // url must match your domain & subdomain
  icons: ['https://webkubor.github.io/picx-images-hosting/webkubor/w-1.8ad7lgwvso.webp']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
//   rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a AppKit instance




export function initModal() {
    const modal = createWeb3Modal({
        ethersConfig,
        chains: [mainnet],
        projectId,
        enableAnalytics: true // Optional - defaults to your Cloud configuration  
      })
      
      return modal
} 