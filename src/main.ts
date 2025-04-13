import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import VXETable from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'element-plus/dist/index.css'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table/lib/style.css'

import '@/style/index.scss'

import App from './App.vue'
import router from './router'
const app = createApp(App)
VXETable.use(VXETablePluginElement)
app.use(createPinia())
app.use(router)
app.use(VXETable)
app.use(ElementPlus)

app.mount('#app')
