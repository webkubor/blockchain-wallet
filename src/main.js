import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { startMonitoring } from './services/monitorService'

const app = createApp(App);
app.use(router).mount('#app')

// 启动 USDT 交易监控
startMonitoring()
