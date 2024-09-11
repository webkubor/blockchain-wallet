import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index"
import 'remixicon/fonts/remixicon.css'
const app = createApp(App);
app.use(router).mount('#app')
