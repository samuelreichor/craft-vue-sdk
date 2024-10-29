import { CraftSdk } from '@craft-vue-sdk';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(CraftSdk, { baseUrl: 'https://backend-craftcms.ddev.site', debug: true, registerComponents: true })

app.mount('#app') 