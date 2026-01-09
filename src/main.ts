import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Database } from './database';
import { Config } from './config';

import 'materialize-css/dist/css/materialize.min.css';
import './assets/main.css';

const config = new Config();

createApp(App)
  .use(router)
  .provide('config', config)
  .provide('database', () => new Database(config))
  .mount('#app');
