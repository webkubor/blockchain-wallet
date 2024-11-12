# blockchain-wallet

一个区块链钱包项目，可能用于管理和操作加密货币资产



## 登录
https://cloud.walletconnect.com/sign-in


## github pages 部署

修改 vite 配置:https://webkubor.github.io/blockchain-wallet/#/home
```
base: "/blockchain-wallet/",  //github 仓库名
 publicDir: "/blockchain-wallet/",  //github 仓库名
```

## 使用 netlify-cli 进行本地部署:
当你使用 netlify-cli（ntl 命令）进行本地部署时，netlify.toml 文件是必需的，它包含了部署和构建过程中的一些必要配置

```
npm install -g netlify-cli
ntl init
```

```netlify.toml 文件
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```