import { createApp } from 'vue';
import { router } from './router';
import { store, key } from './store';
import naive from "naive-ui";
import App from './App.vue';

const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(naive);

app.mount('#app');
