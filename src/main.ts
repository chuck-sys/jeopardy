import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Database } from './database';
import { Config } from './config';
import { LocalStorageCompat } from './local-storage-compat';

import 'materialize-css/dist/css/materialize.min.css';
import './assets/main.css';

const config = new Config();
const db = new Database(config);
const dbCompat = new LocalStorageCompat(db, window.localStorage);

createApp(App)
  .use(router)
  .provide('config', config)
  .provide('database', db)
  .provide('databaseCompat', dbCompat)
  .mount('#app');
