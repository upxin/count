import { createApp } from 'vue';
import { createPinia } from 'pinia';
// resolveComponent必须提前手动导入该组件，在拖拽动态生成组件时比较好处理
import { NButton, NInput, create } from 'naive-ui';
import App from './App.vue';
import router from './router';

// import '@unocss/reset/normalize.css';
import './assets/main.css';
import 'virtual:uno.css';

const naive = create({
  components: [NButton, NInput],
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);
app.mount('#app');
