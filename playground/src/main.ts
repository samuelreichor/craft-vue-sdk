import { CraftSdk } from '@craft-vue-sdk';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(CraftSdk, { baseUrl: 'http://127.0.0.1:55003', debug: true, registerComponents: true })

app.mount('#app') 